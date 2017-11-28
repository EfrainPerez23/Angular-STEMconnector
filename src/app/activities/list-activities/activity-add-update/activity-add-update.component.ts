import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activity-add-update',
  templateUrl: './activity-add-update.component.html',
  styleUrls: ['./activity-add-update.component.css']
})
export class ActivityAddUpdateComponent implements OnInit {
  private id: number;
  private addUpdateModalActivity: ElementRef;
  private titleModal: string;
  private messageModal: string;
  private form: NgForm;

  constructor(private modalAddUpdateService: NgbModal,  private util: UtilService) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.id === -1) {
      this.titleModal = 'Creating';
      this.messageModal = 'Create Activity'
      this.addActivity(this.form.value);
    }else {
      this.titleModal = 'Updating';
      this.messageModal = 'Update Activity'
      this.updateActivity(this.form.value);
    }
  }

  public addUpdateActivity(id: number) {
      this.id = id;
      this.modalAddUpdateService.open(this.addUpdateModalActivity).result.then((result: boolean) => {
      }, (reason) => {
      });
  }

  @ViewChild('addUpdateActivity')
  public set setAddUpdateModal(addUpdateModalActivity: ElementRef) {
    this.addUpdateModalActivity = addUpdateModalActivity;
  }

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

  private addActivity(activityData) {
    console.log('Creating');
    console.log(activityData);
  }

  private updateActivity(speakerData) {
    console.log('Updating');
    console.log(speakerData);
  }

}
