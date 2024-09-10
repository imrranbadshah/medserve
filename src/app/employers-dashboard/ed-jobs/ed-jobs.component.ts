import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ed-jobs',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './ed-jobs.component.html',
    styleUrl: './ed-jobs.component.scss'
})
export class EdJobsComponent {}