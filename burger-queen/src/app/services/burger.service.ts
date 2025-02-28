import { Injectable, signal } from '@angular/core';
import burgerList  from '../services/burger.json';

@Injectable({
  providedIn: 'root'
})
export class BurgerService {

  burgerList = signal(burgerList.burgers);
  
}
