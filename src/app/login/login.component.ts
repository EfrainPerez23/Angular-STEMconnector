import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { UtilService } from '../shared/service/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private form: NgForm;

  constructor(private authService: AuthService, private util: UtilService) { }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {
    this.form = form;
    this.authService.checkAdmin(this.form.value.loginData).subscribe((exist) => {
      if (exist) {
        this.authService.logIn();
        this.authService.getLogStatus().emit(exist);
      }else {
        this.util.showNotification('danger', 'Enter a correct email and password', 'Warning!', 'ti-alert');
      }
    });
  }

}
