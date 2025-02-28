import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'burger-queen';
  router = inject(Router);
  currentPage = '';
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url == '/' ? '🍔 Burger Queen' : (event.url == '/cart' ? 'Cart' : 'Product Details');
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
  goForward() {
    this.router.navigate(['/cart'])
  }
}
