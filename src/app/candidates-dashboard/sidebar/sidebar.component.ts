import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HelpersService } from '../../services/helpers/helpers.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
    helper = inject(HelpersService);
    name!: string;
    profilePic: string = "img/dashbboard/user-big.jpg";
    ngOnInit(): void {
        this.helper.getUserDetails().subscribe((resp: any) => {
            if (resp && Object.keys(resp)) {
                this.name = resp.name;
                this.profilePic = resp.photoUrl;
            }
        })
    }

    handleError() {
        this.profilePic = this.helper.getDummyImage();
    }
}