import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BurgerService } from '../services/burger.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  service = inject(BurgerService);
  router = inject(Router);
  
  productData!: any;
  relatedProducts: any[] = [];
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id')); 
      this.productData = this.service.burgerList().find(item => item.id === id);
    this.relatedProducts = this.service.burgerList().filter(item => item.id !== id);
    });
    
  }

  decreaseQuantity(id: number, event: Event){
    event.stopPropagation();
    this.service.burgerList().map(res => {
      if(res.id == id) res.quantity--;
    })
  }
  increaseQuantity(id: number, event: Event){
    event.stopPropagation();
    this.service.burgerList().map(res => {
      if(res.id == id) res.quantity++;
    })
  }
  navigateToProduct(id: number){
    this.router.navigate(['/product', id]);

  }
  
}
