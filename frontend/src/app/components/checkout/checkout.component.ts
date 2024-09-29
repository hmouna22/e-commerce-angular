import { Component } from '@angular/core';
type Item = {
  id: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
};

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  [key: string]: string;
};
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  items: Item[] = [
    // Initialize with your items data
  ];

  personalInfo: PersonalInfo = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: ''
  };

  formErrors: Partial<PersonalInfo> = {};
  formSubmitted = false;

  // getTotalPrice(): number {
  //   return this.items.reduce((acc, item) => acc + item.price, 0);
  // }

  validateForm(values: PersonalInfo): Partial<PersonalInfo> {
    const errors: Partial<PersonalInfo> = {};
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'zip_code', 'country'];
    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = 'This field is required';
      }
    });
    return errors;
  }

  handleInputChange(event: Event, name: string): void {
    const { value } = event.target as HTMLInputElement;
    this.personalInfo = {
      ...this.personalInfo,
      [name]: value
    };
  }

  handleSubmit(): void {
    const errors = this.validateForm(this.personalInfo);
    this.formErrors = errors;
    if (Object.keys(errors).length === 0) {
      // Process payment and shipping information
      // Display confirmation message
      this.formSubmitted = true;
    }
  }
}
