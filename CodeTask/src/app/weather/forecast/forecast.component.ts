import { Component, OnInit, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss'
})
export class ForecastComponent implements OnInit {
  selectedCity: any;
  forecast: any[] = [];
  service = inject(TaskService);


  ngOnInit() {
    this.service.selectedCity$.subscribe(city => {
      console.log(city)
      if (city) {
        this.selectedCity = city;
        this.loadForecast(city.name);
      }
      else this.selectedCity = null;
    });
  }

  loadForecast(cityName: string) {
    this.service.getForecast(cityName).subscribe((res: any) => {
      const dailyData = this.groupForecastByDay(res.list);
      this.forecast = dailyData.slice(0, 5); 
    });
  }

  refreshForecast() {
    if (this.selectedCity) {
      this.service.getWeatherByCity(this.selectedCity.name).subscribe(data => {
        this.selectedCity = data;
        this.service.selectCity(data);
      });
      this.loadForecast(this.selectedCity.name);
    }
  }

  groupForecastByDay(list: any[]): any[] {
    const grouped: any = {};
    for (let item of list) {
      const date = item.dt_txt.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = {
          date: new Date(date),
          temp: Math.round(item.main.temp),
          icon: item.weather[0].icon,
          iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        };
      }
    }
    console.log(grouped)
    return Object.values(grouped);
  }
}