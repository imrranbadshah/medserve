import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HelpersService } from '../../services/helpers/helpers.service';

@Component({
    selector: 'app-top-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './top-header.component.html',
    styleUrl: './top-header.component.scss'
})
export class TopHeaderComponent {
    isLogged!: boolean;
    userObject: any;
    isUserDropdownMenus: boolean = false;
    userDropdownOptions: any = [
        {
            id: 1,
            name: "Edit Profile",
            routerLink: "/candidates-dashboard/my-profile"
        },
        {
            id: 100,
            name: "Logout",
            routerLink: "/"
        },
    ]
    helper = inject(HelpersService);

    ngOnInit(): void {
        this.helper.getUserDetails().subscribe((resp: any) => {
            this.isLogged = false;
            if (resp && Object.keys(resp).length > 0) {
                this.isLogged = true;
                this.userObject = resp;
            }
        })
    }

    userDropdownToggleClass() {
        this.isUserDropdownMenus = !this.isUserDropdownMenus;
    }
}