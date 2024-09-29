import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service'
import { Category } from 'src/app/category';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  constructor(private dataService: CategoriesService) { }

  addCategory(category_name:string, description:string) {
    const data: Category = {
      category_id:0,
      category_name:category_name,
      description:description
    }

    this.dataService.addCategory(data).subscribe(
      response => {
        console.log('Category added successfully');
        // Perform any additional actions here
      },
      error => {
        console.error('Error adding category:', error);
        // Handle the error here
      }
    );
  }

}
