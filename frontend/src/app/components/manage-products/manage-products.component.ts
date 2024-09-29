import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { CategoriesService } from '../../services/categories.service'
import { Category } from '../../category'

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})

export class ManageProductsComponent implements OnInit {
  products: any;
  categories: Category[] = [];
  showAddProduct = false;
  showEditProduct = false;
  data: any;

  constructor(private dataService: ProductsService, private compData: CategoriesService) { }

  ngOnInit() {
    this.dataService.getProducts().subscribe(
      (response) => {
        this.products = response.products;
        console.log(response.products);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    
    this.compData.getCategories().subscribe(
      (response) => {
        this.categories = response.categories;
        console.log(response.categories);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getCategoryName(id: number): string {
    let temp = this.categories.filter(category => category.category_id === id)
    return temp[0].category_name;
  }

  deleteProduct(id: number) {
    this.dataService.deleteProduct(id).subscribe(
      () => {
        // Product deleted successfully, refresh the products list
        this.dataService.getProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  updateProductStock(id: number, stock: string) {
    this.dataService.updateProductStock(id, Number(stock)).subscribe(
      () => {
        // Product stock updated successfully, refresh the products list
        this.dataService.getProducts();
        this.showEditProduct = false;
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }

  showUnshowAdd() {
    if (!this.showAddProduct) {
      this.showAddProduct = true;
    }
    else {
      this.showAddProduct = false;
    }
  }

  showEdit() {
    if (!this.showEditProduct) {
      this.showEditProduct = true;
    }
  }

  unshowEdit() {
    if (this.showEditProduct) {
      this.showEditProduct = false;
    }
  }
}
