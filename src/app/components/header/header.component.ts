import { AuthService } from "src/app/services/auth.service";
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }
}
