import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from '../../services/helpers/helpers.service';

@Component({
  selector: 'app-applicant-details',
  standalone: true,
  imports: [],
  templateUrl: './applicant-details.component.html',
  styleUrl: './applicant-details.component.scss'
})
export class ApplicantDetailsComponent implements OnInit {
  selectionList: any;
  constructor(public params: ActivatedRoute, public router: Router, private helper: HelpersService) {

    this.params.queryParams.subscribe((resp: any) => {
      console.log(resp);
      this.selectionList = JSON.parse(resp.data);
    })
  }
  ngOnInit(): void {
  }

  back() {
    this.router.navigate(["/employers-dashboard/applicants"]);
  }

  confirmSelections() {
    console.log("confirm")
    this.helper.show("Success", "Candidates Hiring Process successfull", "success");
    setTimeout(() => {
      this.back();
    }, 3000);
  }
}
