import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cd-dashboard',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './cd-dashboard.component.html',
    styleUrl: './cd-dashboard.component.scss'
})
export class CdDashboardComponent {}