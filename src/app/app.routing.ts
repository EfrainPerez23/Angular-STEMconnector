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
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';

export const AppRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardService],
        redirectTo: 'initiatives',
        pathMatch: 'full',
    },
    {
        path: 'initiatives',
        canActivate: [AuthGuardService],
        component: InitiativesComponent,
        pathMatch: 'full'
    },
    {
        path: 'speakers',
        canActivate: [AuthGuardService],
        component: SpeakersComponent
    },
    {
        path: 'activities',
        canActivate: [AuthGuardService],
        component: ActivitiesComponent
    },
    {
        path: 'events',
        canActivate: [AuthGuardService],
        component: EventsComponent
    },
    {
        path: 'notifications',
        canActivate: [AuthGuardService],
        component: NotificationsComponent
    },
    {
        path: 'interns',
        canActivate: [AuthGuardService],
        component: InternsComponent
    },
    {
        path: 'eventPhones',
        canActivate: [AuthGuardService],
        component: EventPhonesComponent
    },
    {
        path: 'activityPoints',
        canActivate: [AuthGuardService],
        component: ActivitiesPointsComponent
    },
    {
        path: 'companies',
        canActivate: [AuthGuardService],
        component: CompaniesComponent
    },
    {
        path: 'contacts',
        canActivate: [AuthGuardService],
        component: ContactsComponent
    }
    ,
    {
        path: 'login',
        component: LoginComponent
    }
]
