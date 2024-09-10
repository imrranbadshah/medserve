import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-ask-questions',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './ask-questions.component.html',
    styleUrl: './ask-questions.component.scss'
})
export class AskQuestionsComponent {}