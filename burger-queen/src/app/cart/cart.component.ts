import { Component, OnInit, inject } from '@angular/core';
import { BurgerService } from '../services/burger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  service = inject(BurgerService);
  router = inject(Router);

  subTotal: number = 0;
  discount: number = 0;
  total: number = 0;

  ngOnInit(): void {
    this.totalCalculation();
  }
  updateQuantity(id: number, action: number) {
    this.service.burgerList().map(res => {
      if (res.id == id && action == 1) res.quantity += 1;
      else if (res.id == id && action == -1) res.quantity -= 1;
    })
    this.totalCalculation();
  }
  removeItem(id: number) {
    this.service.burgerList().map(res => {
      if (res.id == id) res.quantity = 0;
    })
    this.totalCalculation();
  }

  totalCalculation() {
    this.subTotal = this.service.burgerList().reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.discount = Number((this.subTotal * 0.1).toFixed(2));
    this.total = this.subTotal - this.discount;
  }
  buyNow() {
    console.log('burger Cart List', this.service.burgerList());
    console.log('total Price', this.total);
  }
  
}