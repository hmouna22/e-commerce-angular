import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService }  from 'src/app/services/product';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  @Input() data: any;

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  categories: { category_id: number; category_name: string }[] = [
    { category_id: 3, category_name: 'Tech' },
    { category_id: 4, category_name: 'Clothing' },
    { category_id: 5, category_name: 'Home and Kitchen' },
  ];
  selectedCategory: number | null = null;
  filteredProducts: Product[] = [];
  filter: 'all' | 'Tech' | 'Home and Kitchen' | 'Clothing' = 'all';
  searchQuery: string = '';

  filterProducts() {
    if (this.filter === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product) => {
        const categoryName = this.getCategoryName(product.category_id);
        return categoryName === this.filter;
      });
    }
  }

  searchProducts() {
    if (!this.searchQuery) {
      this.filteredProducts =
        this.filter === 'all'
          ? this.products
          : this.products.filter((product) => {
              const categoryName = this.getCategoryName(product.category_id);
              return categoryName === this.filter;
            });
    } else {
      this.filteredProducts = this.products.filter((product) => {
        const categoryName = this.getCategoryName(product.category_id);
        return (
          (this.filter === 'all' || categoryName === this.filter) &&
          product.product_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      });
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(
      (category) => category.category_id === categoryId
    );
    return category ? category.category_name : '';
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.products;
      this.filteredProducts = this.products;
      console.log(data);
    });
  }
}
