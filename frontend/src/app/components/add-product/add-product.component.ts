import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/interfaces/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
// import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  products: Product[] = [];

  formData: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private dataService: ProductsService
  ) {
    this.formData = this.formBuilder.group({
      product_name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      image: ['', Validators.required],
      category_id: [0, Validators.required],
    });
  }

  submitForm() {
    console.log(this.formData); // You can access the captured data here
    // Further processing or sending the data to a server can be done here
  }

  selectedFile!: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile) {
      const imagePath = this.selectedFile.name;
      console.log(imagePath);
      // You can now use the 'imagePath' to send to the backend or perform further processing
    }
    this.uploadImage();
  }

  newProduct(
    product_name: string,
    description: string,
    price: string,
    stock: string,
    category_id: string
  ) {
    let product = {
      product_name: product_name,
      description: description,
      price: Number(price),
      stock: Number(stock),
      category_id: Number(category_id),
    };
    localStorage.setItem('newProduct', JSON.stringify(product));
  }
  uploadImage(): any {
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    const backendEndpoint = 'http://localhost:3000/api';
    this.httpClient.post<any>(`${backendEndpoint}/upload`, formData).subscribe(
      (response) => {
        console.log('Image uploaded successfully', response.imageUrl);
        const newProduct = JSON.parse(localStorage.getItem('newProduct')!);
        const productToAdd = { ...newProduct, image: response.imageUrl };
        console.log(productToAdd);
        this.dataService.addProduct(productToAdd).subscribe(
          (response) => {
            console.log('Product added successfully');
            // Perform any additional actions here
          },
          (error) => {
            console.error('Error adding product:', error);
            // Handle the error here
          }
        );
        // Process the response from the backend if needed
      },
      (error) => {
        console.error('Error uploading image:', error);
        // Handle the error if needed
      }
    );
  }
}
