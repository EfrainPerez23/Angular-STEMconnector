import { Routes } from '@angular/router';

import { InitiativesComponent } from './initiatives/initiatives.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { EventComponent } from './events/event.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ActivitiesComponent } from './activities/activities.component';

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
        component: EventComponent
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
    }
]
