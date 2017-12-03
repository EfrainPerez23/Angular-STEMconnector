import { Component, OnInit } from '@angular/core';

declare var $: any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'initiatives', title: 'Initiatives',  icon: 'ti-panel', class: '' },
    { path: 'events', title: 'Events',  icon: 'ti-view-list-alt', class: '' },
    { path: 'eventPhones', title: 'Event Phones',  icon: 'ti-agenda', class: '' },
    { path: 'speakers', title: 'Speakers',  icon: 'ti-user', class: '' },
    { path: 'activities', title: 'Activities',  icon: 'ti-harddrives', class: '' },
    { path: 'activityPoints', title: 'Activity Points',  icon: 'ti-menu-alt', class: '' },
    { path: 'interns', title: 'Interns',  icon: 'ti-headphone-alt', class: '' },
    { path: 'companies', title: 'Companies',  icon: 'ti-bag', class: '' },
    { path: 'icons', title: 'Icons',  icon: 'ti-pencil-alt2', class: '' },
    { path: 'maps', title: 'Maps',  icon: 'ti-map', class: '' },
    { path: 'notifications', title: 'Notifications',  icon: 'ti-bell', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

}
