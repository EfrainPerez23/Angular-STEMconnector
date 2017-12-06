import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { UtilService } from './shared/service/util.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private loggedIn = false;

  constructor(private AuthService: AuthService, private router: Router, private util: UtilService) {
    this.AuthService.getLogStatus().subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.router.navigate(['/initiatives']);
        this.util.showNotification('success', 'You have Logged In Correct', 'Success!', 'ti-check-box');
      }
    });
  }

  public getLoggedIn(): boolean {
    return this.loggedIn;
  }


}
