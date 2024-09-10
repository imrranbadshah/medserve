import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ed-dashboard',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './ed-dashboard.component.html',
    styleUrl: './ed-dashboard.component.scss'
})
export class EdDashboardComponent {}