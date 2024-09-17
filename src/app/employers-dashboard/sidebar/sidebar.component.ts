import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HelpersService } from '../../services/helpers/helpers.service';
import { passDataType } from '../../models/toast-models';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
    candidateSelected: any = [];

    constructor(private helper: HelpersService, public router: Router) { }

    ngOnInit(): void {
        this.helper.getPassedData().subscribe((resp: passDataType) => {
            console.log("Side barresp", resp)
            if (resp && resp.type == "cadidatesSelections") {
                this.candidateSelected = resp.data;
            }
        })
    }

    checkoutOutCandidates() {
        this.router.navigate(["/employers-dashboard/applicants-details"], { queryParams: { data: JSON.stringify(this.candidateSelected) } });
    }

}