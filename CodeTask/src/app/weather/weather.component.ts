import { Component } from '@angular/core';
import { SearchCitiesComponent } from "./search-cities/search-cities.component";
import { ForecastComponent } from './forecast/forecast.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [SearchCitiesComponent, ForecastComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

}
