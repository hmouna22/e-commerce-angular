import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  editText:boolean=false
  userName: string | null = localStorage.getItem('username');
  updateProfile: boolean = true;
  customerInfos: {
    user_name: string|null; email: string|null; phone: string|null;
    address: string|null;city: string|null;
    country: string|null;created_at: string|null;
    state: string|null;updated_at: string|null;zip_code: string|null;
  } = {
    user_name: '',email: '',phone: '',
    address: '',city: '',country: '',created_at: '',
    state: '',updated_at: '',zip_code: '',
  };
  id: string | null = localStorage.getItem('id');
  
  constructor(private router:Router) {}
  
  seeInfo() {
    this.updateProfile = !this.updateProfile;
  }
  showOrders = false;

showUnshowOrders() {
    if(!this.showOrders){
      this.showOrders = true;
    }
    else{
      this.showOrders = false;
    }
  }
  
  goToStore(){
  this.router.navigate(['/products'])
  }
  goToOrders(){
    this.router.navigate(['/orders'])
    }
  
  getUserInfo() {
    axios.get(`http://localhost:3000/api/users/${this.id}`).then((res) => {
      console.log(res.data);
      this.customerInfos.email = res.data.email
      this.customerInfos.user_name = res.data.user_name
      this.customerInfos.address = res.data.address
      this.customerInfos.city = res.data.city
      this.customerInfos.phone = res.data.phone
      this.customerInfos.state = res.data.state
      this.customerInfos.country = res.data.country
      this.customerInfos.zip_code = res.data.zip_code
      this.customerInfos.created_at = res.data.created_at
      this.customerInfos.updated_at = res.data.updated_at
    });
    this.updateProfile = !this.updateProfile;
  }
  toggleText(){
    this.editText=!this.editText
  }
 
  updateField(value: string|null, fieldName: string){

    switch (fieldName) {
      case 'userName':this.customerInfos.user_name = value; break;
      case 'email':this.customerInfos.email = value; break;
      case 'address':this.customerInfos.address = value; break;
      case 'phone':this.customerInfos.phone = value; break; 
      case 'city':this.customerInfos.city = value; break;
      case 'zip':this.customerInfos.zip_code = value; break;
      case 'country':this.customerInfos.country = value; break;
  }
  
}

saveNewInfos(){
  console.log(this.customerInfos)
  alert("are you sure to save these changes")
  axios.put(`http://localhost:3000/api/users/${this.id}`,this.customerInfos).then(res=>{
    console.log(res.data)
  })
  
}
}
