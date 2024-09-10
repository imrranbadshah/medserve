import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-browse-candidates',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './browse-candidates.component.html',
    styleUrl: './browse-candidates.component.scss'
})
export class BrowseCandidatesComponent {}