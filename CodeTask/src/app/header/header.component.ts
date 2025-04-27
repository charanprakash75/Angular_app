import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  service = inject(TaskService);
}
