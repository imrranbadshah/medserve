import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-top-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './top-header.component.html',
    styleUrl: './top-header.component.scss'
})
export class TopHeaderComponent {}