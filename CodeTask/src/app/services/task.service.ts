import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http = inject(HttpClient);

  counter = signal(0);
  private apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  private selectedCitySource = new BehaviorSubject<any>(null);
  selectedCity$ = this.selectedCitySource.asObservable();

  selectCity(city: any) {
    this.selectedCitySource.next(city);
  }

  getWeatherByCity(city: string) {
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    ).pipe(
      map(res => ({
        name: res.name,
        temp: Math.round(res.main.temp),
        icon: res.weather[0].icon,
        iconUrl: `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
      }))
    );
  }

  getForecast(city: string) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    );
  }

}
