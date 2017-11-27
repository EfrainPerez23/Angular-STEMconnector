import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';
import { FormsModule } from '@angular/forms';
import { InitiativeComponent } from './initiative/initiative.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { EventComponent } from './event/event.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { HttpModule } from '@angular/http';
import { DateFormatPipe } from './event/pipe/date-format.pipe';
import { FilterPipe } from './shared/pipe/filter.pipe';
import { NgbModal, NgbModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalStack } from '@ng-bootstrap/ng-bootstrap/modal/modal-stack';
import { InitiativeRequestService } from './shared/service/request/initiative-request.service';
import { EventRequestService } from './shared/service/request/event-request.service';
import { UtilService } from './shared/service/util.service';
import { SpeakerComponent } from './speakers/speaker/speaker.component';
import { SpeakerRequestService } from './shared/service/request/speaker-request.service';
import { SearchSpeakerComponent } from './speakers/search-speaker/search-speaker.component';
import { FilterSpeakerPipe } from './speakers/pipe/filter-speaker.pipe';
import { DeleteModalComponent } from './speakers/speaker/delete-modal/delete-modal.component';
import { BioModalComponent } from './speakers/speaker/bio-modal/bio-modal.component';
import {UpdateAddModelComponent} from './speakers/speaker/update-add-model/update-add-model.component';
import { ActivitiesComponent } from './activities/activities.component';
import { SearchActivityComponent } from './activities/search-activity/search-activity.component';
import { ListActivitiesComponent } from './activities/list-activities/list-activities.component';
import { ActivityRequestService } from './shared/service/request/activity-request.service';
import { ActivityDescriptionComponent } from './activities/list-activities/activity-description/activity-description.component';




@NgModule({
  declarations: [
    AppComponent,
    InitiativeComponent,
    SpeakersComponent,
    EventComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    DateFormatPipe,
    FilterPipe,
    SpeakerComponent,
    SearchSpeakerComponent,
    FilterSpeakerPipe,
    DeleteModalComponent,
    BioModalComponent,
    UpdateAddModelComponent,
    ActivitiesComponent,
    SearchActivityComponent,
    ListActivitiesComponent,
    ActivityDescriptionComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    HttpModule,
    NgbModule.forRoot(),
    FormsModule,
    FixedPluginModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'})

  ],
  providers: [
    UtilService,
    EventRequestService,
    NgbModal, NgbModalStack,
    InitiativeRequestService,
    SpeakerRequestService,
    ActivityRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
