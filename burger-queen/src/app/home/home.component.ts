import { Component, OnInit, inject } from '@angular/core';
import { BurgerService } from '../services/burger.service';
import { FormsModule } from '@angular/forms';

import { Burger } from '../services/burger.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  service = inject(BurgerService);
  router = inject(Router);
  searchQuery = '';
  burgerList: Burger[] = [];
  list: any[] = [];

  ngOnInit(): void {
    this.list = this.service.burgerList();
    this.burgerList = this.list;
    console.log(this.burgerList)
  }

  filterBurgers(event: any) {
    this.burgerList = this.list.filter(item => item.name.toUpperCase().indexOf(event.toUpperCase()) > -1);
  }

  decreaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    this.burgerList.map(res => {
      if (res.id == id) res.quantity--;
    })
  }
  increaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    this.burgerList.map(res => {
      if (res.id == id) res.quantity++;
    })
  }

  navigateToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

}
