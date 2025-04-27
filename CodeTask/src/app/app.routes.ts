import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
  { path: 'counter', component: CounterComponent },
  { path: 'vatavaran', component: WeatherComponent },
  { path: '', redirectTo: 'vatavaran', pathMatch: 'full' },
];
