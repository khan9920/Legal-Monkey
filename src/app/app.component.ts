import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.autoAuth();

    const navEndEvents = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )

    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-193482270-1', {
        'page_path': event.urlAfterRedirects
      });
    });
  }
}