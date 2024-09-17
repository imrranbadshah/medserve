import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'app-ed-saved-candidates',
    standalone: true,
    imports: [RouterLink, NgbAccordionModule, DatePipe],
    templateUrl: './ed-saved-candidates.component.html',
    styleUrl: './ed-saved-candidates.component.scss'
})
export class EdSavedCandidatesComponent {
    items = [
        {
            "id": 1,
            "date": "2023-11-08T14:37:58.538Z",
            "candidatesCount": 2,
            "candidateDetails": [
                {
                    "id": 1,
                    "name": "Olivia Brown",
                    "jobTitle": "RN-Pediatric Care",
                    "experience": 3,
                    "skills": ["Pediatrics", "Child Development", "Neonatal Care"],
                    "location": "Los Angeles",
                    "isSelected": false
                },
                {
                    "id": 2,
                    "name": "Test Candidate",
                    "jobTitle": "Software Engineer",
                    "experience": 5,
                    "skills": ["Programming", "Problem Solving", "Software Development"],
                    "location": "San Francisco",
                    "isSelected": false
                }
            ]
        }

    ]
}