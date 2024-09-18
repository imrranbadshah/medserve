import { Component, inject, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApplicantCardComponent } from '../../components/applicant-card/applicant-card.component';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { FormsModule } from '@angular/forms';
import { HelpersService } from '../../services/helpers/helpers.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { EventEmitter } from 'stream';

@Component({
    selector: 'app-ed-applicants',
    standalone: true,
    imports: [RouterLink, FormsModule, ApplicantCardComponent, FilterPipe],
    templateUrl: './ed-applicants.component.html',
    styleUrl: './ed-applicants.component.scss'
})
export class EdApplicantsComponent implements OnInit {
    applicantData = [
        {
            "id": 1,
            "name": "Greta Hewitt",
            "jobTitle": "RN-Geriatric Care",
            "experience": 5,
            "skills": ["Gerontology", "Geriatric Nursing", "Chronic Disease Management"],
            "location": "New York City",
            "isSelected": false
        },
        {
            "id": 2,
            "name": "Olivia Brown",
            "jobTitle": "RN-Pediatric Care",
            "experience": 3,
            "skills": ["Pediatrics", "Child Development", "Neonatal Care"],
            "location": "Los Angeles",
            "isSelected": false
        },
        {
            "id": 3,
            "name": "Sophia Davis",
            "jobTitle": "Emergency Room Nurse",
            "experience": 8,
            "skills": ["Emergency Medicine", "Trauma Care", "Critical Care"],
            "location": "Chicago",
            "isSelected": false
        },
        {
            "id": 4,
            "name": "Rina Sharma",
            "jobTitle": "RN-Oncology",
            "experience": 7,
            "skills": ["Oncology", "Chemotherapy", "Radiation Therapy"],
            "location": "Houston",
            "isSelected": false
        },
        {
            "id": 5,
            "name": "Priya Mehta",
            "jobTitle": "RN-Mental Health",
            "experience": 6,
            "skills": ["Mental Health Nursing", "Counseling", "Crisis Intervention"],
            "location": "Dallas",
            "isSelected": false
        },
        {
            "id": 6,
            "name": "Yasmin Khalil",
            "jobTitle": "RN-Emergency & Trauma",
            "experience": 4,
            "skills": ["Emergency Medicine", "Trauma Care", "Acute Care"],
            "location": "Phoenix",
            "isSelected": false
        },
        {
            "id": 7,
            "name": "Aisha Patel",
            "jobTitle": "RN-Home Health",
            "experience": 9,
            "skills": ["Home Health Care", "Wound Care", "Medication Management"],
            "location": "San Antonio",
            "isSelected": false
        },
        {
            "id": 8,
            "name": "Ben Ali",
            "jobTitle": "RN-Intensive Care",
            "experience": 10,
            "skills": ["Critical Care Nursing", "Ventilator Management", "Hemodynamics"],
            "location": "San Diego",
            "isSelected": false
        }
    ]
    candidateSelected: any = [];
    searchText: any;
    constructor(private router: Router, private helper: HelpersService) {

    }
    ngOnInit(): void {
        this.helper.getSearchApplicantText().subscribe((resp: string) => this.searchText = resp);
    }


    /**
     * @description used to add and remove candidates on clikc
     */
    selectedCandidate(selectedCandidate: any) {
        const index = this.candidateSelected.findIndex((candidate: any) => candidate.id === selectedCandidate.id);;
        if (index === -1) {
            this.candidateSelected.push(selectedCandidate);
        } else {
            this.candidateSelected.splice(index, 1);
        }
        console.log(this.candidateSelected);
        this.helper.passData({ data: this.candidateSelected, fromPage: "cadidatesSelections" });
    }

    clearSelectionList() {
        this.applicantData.map((item: any) => item.isSelected = false);
        this.candidateSelected = [];
    }

    checkoutOutCandidates() {
        this.router.navigate(["/employers-dashboard/applicants-details"], { queryParams: { data: JSON.stringify(this.candidateSelected) } });
    }


}