import { Component, OnInit, Input } from '@angular/core';
import { InternService } from '../service/intern.service';
import { Intern } from '../model/intern';

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.css']
})
export class InternComponent implements OnInit {
  private intern: Intern;
  private index: number;

  constructor() {
  }

  ngOnInit() {
  }

  @Input('internElement')
  public set setIntern(intern: Intern) {
    this.intern = intern;
  }

  @Input('indexIntern')
  public set setIndex(index: number) {
    this.index = index;
  }

  public getIntern(): Intern {
    return this.intern;
  }

  public getIndex(): number {
    return this.index;
  }
}
