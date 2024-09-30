import { Component, OnInit } from '@angular/core';
import { OverviewCardsComponent } from '../../components/overview-cards/overview-cards.component';
import { CommonModule } from '@angular/common';

import { ConfigService } from '../../components/tables/configs';
import { TablesComponent } from '../../components/tables/tables.component';
@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    OverviewCardsComponent,
    CommonModule,
    TablesComponent
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  // public configuration!: Config;
  // public columns!: Columns[];
  public data: any[] = [];
  overviewCounts = [
    {
      title: "My Pending Task",
      count: "01",
      img: "img/pending.png"
    },
    {
      title: "My Submited Request",
      count: "10",
      img: "img/submitd.png"
    },
    {
      title: "My Draft Request",
      count: "22",
      img: "img/draft.png"
    },
  ]
  overviewColors = [
    {
      title: "Pending on applicants",
      color: "#ecba1b",
    },
    {
      title: "Closed",
      color: "#94c854",
    },
    {
      title: "Rejected",
      color: "#f86900",
    },
    {
      title: "Draft",
      color: "#a3b4c1",
    },
    {
      title: "Pending on DHCA team",
      color: "#5483c2",
    },
  ]
  columns!: any[];

  constructor() {

  }

  ngOnInit(): void {
    this.columns = [
      { key: 'level', title: 'Level' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.data = [
      {
        "level": "Junior",
        "age": 25,
        "company": "Acme Corporation",
        "name": "Alice Smith",
        "isActive": true
      },
      {
        "level": "Senior",
        "age": 32,
        "company": "Tech Solutions",
        "name": "Bob Johnson",
        "isActive": false
      },
      {
        "level": "Manager",
        "age": 40,
        "company": "Global Enterprises",
        "name": "Carol Lee",
        "isActive": true
      }
    ];

  }
}
