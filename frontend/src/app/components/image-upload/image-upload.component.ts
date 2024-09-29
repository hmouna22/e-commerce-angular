import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  template: `
    <input type="file" (change)="onFileSelected($event)">
    <button (click)="onUpload()">Upload</button>
  `
})
export class ImageUploadComponent {
  selectedFile: any;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post<any>('http://localhost:3000/upload', uploadData)
      .subscribe(
        (response) => {
          console.log('Image uploaded:', response.url);
          // Handle the uploaded image URL as needed
        },
        (error) => {
          console.error('Failed to upload image:', error);
          // Handle the error as needed
        }
      );
  }
}
