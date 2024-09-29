import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
  categories: any = [];
  products: Product[] = [];
  showAddCategory = false;
  category_name: string = "";
  description: string = "";

  constructor(private dataService: CategoriesService, private compData: ProductsService) { }

  ngOnInit() {
    this.dataService.getCategories().subscribe(
      (response) => {
        this.categories = response.categories
        console.log(response.categories)
      },
      (error) => {
        console.error('Error fetching data:', error)
      }
    );

    this.compData.getProducts().subscribe(
      (response) => {
        this.products = response.products
        console.log(response.products)
      },
      (error) => {
        console.error('Error fetching data:', error)
      }
    );
  }

  canDelete(id: number): boolean {
    let temp = this.products.filter(item => item.category_id === id)
    if(temp.length!==0){
      return false
    }
    else{
      return true
    }
  }

  deleteCategory(id: number) {
    if(this.canDelete(id)===true){
      this.dataService.deleteCategory(id).subscribe(
        () => {
          // Category deleted successfully, refresh the categories list
          this.dataService.getCategories()
        },
        (error) => {
          console.error('Error deleting category:', error)
        }
      );
    }
    else{
      alert("category cannot be deleted, it contains products in the stock")
    }
  }

  showUnshowAdd() {
    if (!this.showAddCategory) {
      this.showAddCategory = true
    }
    else {
      this.showAddCategory = false
    }
  }

}
