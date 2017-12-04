import { Routes } from '@angular/router';

import { InitiativesComponent } from './initiatives/initiatives.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { EventsComponent } from './events/events.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ActivitiesComponent } from './activities/activities.component';
import { InternsComponent } from './interns/interns.component';
import { EventPhonesComponent } from './event-phones/event-phones.component';
import { ActivitiesPointsComponent } from './activities-points/activities-points.component';
import { CompaniesComponent } from './companies/companies.component';
import { ContactsComponent } from './contacts/contacts.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'initiatives',
        pathMatch: 'full',
    },
    {
        path: 'initiatives',
        component: InitiativesComponent
    },
    {
        path: 'speakers',
        component: SpeakersComponent
    },
    {
        path: 'activities',
        component: ActivitiesComponent
    },
    {
        path: 'events',
        component: EventsComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    },
    {
        path: 'interns',
        component: InternsComponent
    },
    {
        path: 'eventPhones',
        component: EventPhonesComponent
    },
    {
        path: 'activityPoints',
        component: ActivitiesPointsComponent
    },
    {
        path: 'companies',
        component: CompaniesComponent
    },
    {
        path: 'contacts',
        component: ContactsComponent
    }
]
