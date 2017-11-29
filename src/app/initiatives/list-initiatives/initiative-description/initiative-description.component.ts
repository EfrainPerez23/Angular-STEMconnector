import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { InitiativeModel } from '../../model/initiative.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-initiative-description',
  templateUrl: './initiative-description.component.html',
  styleUrls: ['./initiative-description.component.css']
})
export class InitiativeDescriptionComponent implements OnInit {
  private descriptionModal: ElementRef;
  private initiative: InitiativeModel;

  constructor(private modalDescriptionInitiative: NgbModal) { }

  ngOnInit() {
  }

  @ViewChild('initiativeDescription')
  public set setDescriptionModal(descriptionModal: ElementRef) {
    this.descriptionModal = descriptionModal;
  }

  public getInitiative(): InitiativeModel {
    return this.initiative;
  }

  public descriptionModalActivity(initiative: InitiativeModel) {
    this.initiative = initiative;
    this.modalDescriptionInitiative.open(this.descriptionModal).result.then((result: boolean) => {
    }, (reason) => {});
  }

}
