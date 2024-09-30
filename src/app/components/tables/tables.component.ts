import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from './configs';
import { API, APIDefinition, TableModule } from 'ngx-easy-table';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    TableModule,
  ],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss'
})
export class TablesComponent implements OnInit {
  @Input('columns') columns!: Columns[];
  @Input('data') data!: any[];
  public configuration!: Config;
  @ViewChild('table') table!: APIDefinition;
  // public columns!: Columns[];
  // public data: any[] = [];

  ngOnInit(): void {
    // this.columns = [
    //   { key: 'level', title: 'Level' },
    //   { key: 'age', title: 'Age' },
    //   { key: 'company', title: 'Company' },
    //   { key: 'name', title: 'Name' },
    //   { key: 'isActive', title: 'STATUS' },
    // ];
    // this.data = [
    //   {
    //     "level": "Junior",
    //     "age": 25,
    //     "company": "Acme Corporation",
    //     "name": "Alice Smith",
    //     "isActive": true
    //   },
    //   {
    //     "level": "Senior",
    //     "age": 32,
    //     "company": "Tech Solutions",
    //     "name": "Bob Johnson",
    //     "isActive": false
    //   },
    //   {
    //     "level": "Manager",
    //     "age": 40,
    //     "company": "Global Enterprises",
    //     "name": "Carol Lee",
    //     "isActive": true
    //   }
    // ];

  }

  onChange(event: Event): void {
    this.table.apiEvent({
      type: API.onGlobalSearch,
      value: (event.target as HTMLInputElement).value,
    });
  }

}
