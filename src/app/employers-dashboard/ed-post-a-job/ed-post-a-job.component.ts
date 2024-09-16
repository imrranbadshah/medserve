import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { HelpersService } from '../../services/helpers/helpers.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, debounceTime, distinctUntilChanged, tap, switchMap, map, catchError, of } from 'rxjs';

@Component({
    selector: 'app-ed-post-a-job',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, TranslateModule, NgbTypeaheadModule,],
    templateUrl: './ed-post-a-job.component.html',
    styleUrl: './ed-post-a-job.component.scss'
})
export class EdPostAJobComponent implements OnInit {
    @ViewChild('instance', { static: true }) instance!: NgbTypeahead;
    searching = false;
    searchFailed = false;
    jobPostFormGroup!: FormGroup;
    jobTypes = [
        {
            "id": 1,
            "jobType": "Software Engineer"
        },
        {
            "id": 2,
            "jobType": "Data Scientist"
        },
        {
            "id": 3,
            "jobType": "UI/UX Designer"
        },
        {
            "id": 4,
            "jobType": "Product Manager"
        },
        {
            "id": 5,
            "jobType": "Marketing Manager"
        },
        {
            "id": 6,
            "jobType": "Sales Representative"
        },
        {
            "id": 7,
            "jobType": "Customer Support"
        },
        {
            "id": 8,
            "jobType": "Accountant"
        },
        {
            "id": 9,
            "jobType": "HR Manager"
        },
        {
            "id": 10,
            "jobType": "Project Manager"
        }
    ]
    experienceList = [
        {
            "id": 1,
            "jobYears": "0-2 years"
        },
        {
            "id": 2,
            "jobYears": "2-5 years"
        },
        {
            "id": 3,
            "jobYears": "5-10 years"
        },
        {
            "id": 4,
            "jobYears": "10+ years"
        }
    ]
    countryMaster: any;
    constructor(private fb: FormBuilder, private helper: HelpersService, private api: ApiService) {
        this.jobPostFormGroup = this.fb.group(
            {
                jobTitle: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
                speciality: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
                jobType: ['', [Validators.required]],
                location: ['', [Validators.required]],
                experiencePreferred: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
                employer: ['', [Validators.required]],
                jobDescription: ['', [Validators.required]],
            }
        )
    }

    ngOnInit(): void {
        this.getCountryMaster();
    }

    /**
     * @author Imran A
     * @description used to get the formcontrol for validations
     * @param controlName 
     * @returns 
     */
    getControl(controlName: string) {
        return this.jobPostFormGroup.get(controlName) as FormControl;
    }

    /**
      * @description used to call api for country list
      */
    getCountryMaster() {
        this.api.getCountryMaster().subscribe((resp: any) => {
            this.countryMaster = resp.data.countryList;
        })
    }

    /**
   * @description used to search for cities
   */
    searchLocation = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(() => (this.searching = true)),
            switchMap(term => this.getLocations(term)),
            tap(() => (this.searching = false)),
            map((resp: any) => {
                return resp.map((city: any) => city.title);
            })
        );


    /**
     * @description API call to get cities based on user input and filter list based on type 1
     */
    getLocations(searchTerm: string): Observable<any[]> {
        console.log("searchTerm", searchTerm);
        if (searchTerm.length < 2) {
            return new Observable(observer => observer.next([])); // Return empty array if the input is too short
        }
        const temp = {
            startPage: 1,
            limit: 1000,
            search: searchTerm,
            lastTimeStamp: null
        };

        return this.api.getCities(temp).pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => {
                this.searchFailed = true;
                return of([]);
            }),
            map((resp: any) => {
                let title = resp.data.list?.filter((city: any) => city.type === 1);
                return title;
            })
        );
    }

    /**
      * @description used to city selections
      */
    onLocationSelect(title: any) {
        console.log("onCitySelect", title);
        const selectedCity = title.item;
        if (selectedCity) {
            let place = selectedCity.split(",");
            this.jobPostFormGroup.get('country')?.setValue(place[place.length - 1]);
            setTimeout(() => this.jobPostFormGroup.get('stateCity')?.setValue(`${place[0]},${place[1]}`));
        }
    }

    /**
    * @description Used to submit the form
    */
    onSubmit() {
        console.log(this.jobPostFormGroup.value);
    }
}