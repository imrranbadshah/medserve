import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BackToTopComponent } from '../common/back-to-top/back-to-top.component';
import { FooterComponent } from '../common/footer/footer.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { TopHeaderComponent } from '../common/top-header/top-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    TopHeaderComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    BackToTopComponent
  ],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.scss'
})
export class HomeDashboardComponent {

}
