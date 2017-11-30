import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Intern } from '../../model/intern';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-intern-description',
  templateUrl: './intern-description.component.html',
  styleUrls: ['./intern-description.component.css']
})
export class InternDescriptionComponent implements OnInit {
  private intern: Intern;
  private internDescription: ElementRef;

  constructor(private descriptionModal: NgbModal) { }

  ngOnInit() {
  }

  public descriptionInternModal(intern: Intern) {
    this.intern = intern;
    this.descriptionModal.open(this.internDescription).result.then((result: boolean) => {
    }, (reason) => {
    });
  }

  @ViewChild('internDescription')
  public set setInternDescription(internDescription: ElementRef) {
    this.internDescription = internDescription;
  }

  public getIntern(): Intern {
    return this.intern;
  }

}
