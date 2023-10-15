import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'firebase-fileupload';
  file: any;
  url: any;
  files: any[] = [];
  filePath: any = '';

  constructor(private fireStorage: AngularFireStorage) {}

  async onFileUpload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const path = `yt/${file.name}`;
      const upload = await this.fireStorage.upload(path, file);
      this.url = await upload.ref.getDownloadURL();
      console.log(this.url);

      this.getAllFiles(); // Refresh the file list
    }
  }

  async onDeleteFile() {
    // Replace 'yt/yourFileName' with the path of the file you want to delete.
    const filePath = `yt/${this.filePath}`;
    // Delete the file
    try {
      await this.fireStorage.storage.ref().child(filePath).delete();
      console.log('File deleted successfully');
      this.filePath = '';
      this.getAllFiles(); // Refresh the file list
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async getAllFiles() {
    this.files = []; // Clear the files array before fetching the list of files
    const listRef = this.fireStorage.storage.ref().child('yt');
    listRef
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          this.files.push(itemRef.name);
        });
      })
      .catch((error) => {
        console.error('Error getting list of files:', error);
      });
  }

  ngOnInit() {
    // this.getAllFiles(); // Fetch the initial list of files
    this.files = []; // Clear the files array before fetching the list of files
    const listRef = this.fireStorage.storage.ref().child('yt');
    listRef
      .listAll()
      .then((res) => {
        res.items.forEach((itemRef) => {
          this.files.push(itemRef.name);
        });
      })
      .catch((error) => {
        console.error('Error getting list of files:', error);
      });
  }
}
