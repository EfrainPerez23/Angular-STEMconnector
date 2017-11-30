import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../../shared/service/util.service';
import { InternRequestService } from '../../../shared/service/request/intern-request.service';
import { InternService } from '../../service/intern.service';
import { Intern } from '../../model/intern';

@Component({
  selector: 'app-intern-add-update',
  templateUrl: './intern-add-update.component.html',
  styleUrls: ['./intern-add-update.component.css']
})
export class InternAddUpdateComponent implements OnInit {
  private add: boolean;
  private addUpdateIntern: ElementRef;
  private titleModal: string;
  private messageModal: string;
  private form: NgForm;
  private intern: Intern;

  constructor(private modalAddUpdateService: NgbModal, private util: UtilService,
    private internRequestService: InternRequestService, private internService: InternService) { }

  ngOnInit() {
    if (this.add) {
      this.titleModal = 'Create';
      this.messageModal = 'Creating Intern';
    }else {
      this.titleModal = 'Update';
      this.messageModal = 'Updating Intern';
    }
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    if (this.add) {
      this.addIntern(this.form.value.internData);
    }else {
      this.updateIntern(this.form.value.internData);
    }
  }

  @ViewChild('addUpdateIntern')
  public set setAddUpdateIntern(addUpdateIntern: ElementRef) {
    this.addUpdateIntern = addUpdateIntern;
  }

  public updateModalIntern(intern: Intern) {
    this.intern = intern;
    this.modalAddUpdateService.open(this.addUpdateIntern).result.then((result: boolean) => {
    }, (reason) => {
    });
  }

  @Input('add')
  public set setAdd(add: boolean) {
    this.add = add;
  }

  public getTitleModal(): string {
    return this.titleModal;
  }

  public getMessageModal(): string {
    return this.messageModal;
  }

  private addIntern(intern) {
    this.internRequestService.createIntern(intern).subscribe((internCreated: any) => {
      console.log(internCreated);
      if (internCreated.success) {
        this.util.showNotification('success', 'You added a new Intern!', 'Success!', 'ti-pencil-alt');
        this.internService.getStatusCreatedOrUpdate().emit(internCreated.success);
      }else {
        this.util.showNotification('danger', internCreated.message, 'Error!', 'ti-face-sad');
      }
    });
  }

  private updateIntern(intern) {
    this.internRequestService.updateIntern(this.intern.getIdIntern(), intern).subscribe((speakerCreated: any) => {
      if (speakerCreated.status) {
        this.util.showNotification('success', 'You Updated an Intern!', 'Success!', 'ti-pencil-alt');
        this.internService.getStatusCreatedOrUpdate().emit(speakerCreated.status);
      }else {
        this.util.showNotification('danger', speakerCreated.message, 'Error!', 'ti-face-sad');
      }
    });
  }

}
