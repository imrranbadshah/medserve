import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HelpersService } from '../../services/helpers/helpers.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';

@Component({
    selector: 'app-cd-my-profile',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './cd-my-profile.component.html',
    styleUrl: './cd-my-profile.component.scss'
})
export class CdMyProfileComponent implements OnInit {
    editProfileForm!: FormGroup;
    profilePic: string = "img/dashbboard/user-big.jpg";
    constructor(private fb: FormBuilder, public helper: HelpersService, private api: ApiService) {
        this.editProfileForm = this.fb.group(
            {
                firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
                lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
                gender: ['', [Validators.required]],
                dateOfBirth: ['', [Validators.required]],
                spouseName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
                countryCode: ['', [Validators.required]],
                phoneNumber: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$')]],
                address: ['', [Validators.required]],
                country: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]],
                stateCity: ['', [Validators.required]],
                webURL: [''],

            }
        )

    }

    ngOnInit(): void {
        this.helper.getUserDetails().subscribe((resp: any) => {
            if (resp && Object.keys(resp)) {
                this.profilePic = resp.photoUrl;
                this.editProfileForm.patchValue({
                    firstName: resp.firstName,
                    lastName: resp.lastName,
                    email: resp.email
                })
            }
        })
    }

    handleError() {
        this.profilePic = this.helper.getDummyImage();
    }

    onSubmit() {
        console.log("this.editProfileForm", this.editProfileForm);
    }
}