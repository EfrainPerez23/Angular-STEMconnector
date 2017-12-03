import { Component, OnInit } from '@angular/core';
import { CompanyService } from './service/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [CompanyService]
})
export class CompaniesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
