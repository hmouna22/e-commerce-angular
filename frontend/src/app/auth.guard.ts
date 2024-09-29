import { Injectable,inject } from '@angular/core';
import {  Router } from '@angular/router';

export const authGuard = () => {
  
  const router = inject(Router)

  if (localStorage.getItem('role')==='admin') {
    return true
  }

  return router.navigate(['/login'])
}
