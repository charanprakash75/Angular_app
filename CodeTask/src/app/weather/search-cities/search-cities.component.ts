import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-cities',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-cities.component.html',
  styleUrl: './search-cities.component.scss'
})
export class SearchCitiesComponent {
  cityName = '';
  recentCities: any[] = [];
  errorMessage = '';
  service = inject(TaskService);

  addCity() {
    if (!this.cityName.trim()) return;

    this.service.getWeatherByCity(this.cityName.trim()).subscribe({
      next: data => {
        this.errorMessage = '';
        if (this.recentCities.find(c => c.name === data.name)) return;

        this.recentCities.unshift(data);
        if (this.recentCities.length > 8) this.recentCities.pop();
        this.cityName = '';
      },
      error: () => {
        this.errorMessage = 'Invalid city name';
      }
    });
  }

  refreshCity(city: any) {
    this.service.getWeatherByCity(city.name).subscribe(data => {
      Object.assign(city, data);
    });
  }

  removeCity(city: any) {
    this.recentCities = this.recentCities.filter(c => c.name !== city.name);
    this.service.selectedCity$.subscribe(selected => {
      if (selected?.name === city.name) {
        this.service.selectCity(null);
      }
    }).unsubscribe();
  }

  clearCities() {
    this.recentCities = [];
    this.service.selectCity(null);
  }

  selectCity(city: any) {
    this.service.selectCity(city);
  }
}
