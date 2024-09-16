import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant-details',
  standalone: true,
  imports: [],
  templateUrl: './applicant-details.component.html',
  styleUrl: './applicant-details.component.scss'
})
export class ApplicantDetailsComponent implements OnInit {
  selectionList: any;
  constructor(public params: ActivatedRoute) {

    this.params.queryParams.subscribe((resp: any) => {
      console.log(resp);
      this.selectionList = JSON.parse(resp.data);
    })
  }
  ngOnInit(): void {

  }
}
