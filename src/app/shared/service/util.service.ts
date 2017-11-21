import { Injectable } from '@angular/core';

declare var $: any;
export class UtilService {

  constructor() { }

  public showNotification(type: string, message: string, title: string, icon: string) {
    $.notify({
        icon: icon,
        message: `<b>${title}</b> <br> ${message}.`
    }, {
        type: type,
        timer: 1000,
        placement: {
            from: 'top',
            align: 'right'
        }
    });
}

}
