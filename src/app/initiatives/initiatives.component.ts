import { Component, OnInit } from '@angular/core';
import { InitiativeService } from './service/initiative.service';


@Component({
    selector: 'app-initiatives',
    moduleId: module.id,
    templateUrl: './initiatives.component.html',
    providers: [InitiativeService]
})

// Efrain Perez
// efrain.abperez23@gmail.com
// LinkedIn: https://www.linkedin.com/in/efra%C3%ADn-p%C3%A9rez-824bbb148/

export class InitiativesComponent implements OnInit {

    constructor() {}

    ngOnInit() {
    }
}

