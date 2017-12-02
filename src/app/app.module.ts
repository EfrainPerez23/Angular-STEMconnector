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
import { InitiativesComponent } from './initiatives/initiatives.component';
import { SpeakersComponent } from './speakers/speakers.component';
import { EventsComponent } from './events/events.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { HttpModule } from '@angular/http';
import { DateFormatPipe } from './events/pipe/date-format.pipe';
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
import { ActivityDeleteComponent } from './activities/list-activities/activity-delete/activity-delete.component';
import { ActivityAddUpdateComponent } from './activities/list-activities/activity-add-update/activity-add-update.component';
import { ActivityFilterPipe } from './activities/pipe/activity-filter.pipe';
import { ListInitiativesComponent } from './initiatives/list-initiatives/list-initiatives.component';
import { SearchInitiativeComponent } from './initiatives/search-initiative/search-initiative.component';
import { InitiativesFilterPipe } from './initiatives/pipe/initiatives-filter.pipe';
import { FilterPipe } from './events/pipe/filter.pipe';
import { InitiativeDescriptionComponent } from './initiatives/list-initiatives/initiative-description/initiative-description.component';
import { InitiativeDeleteComponent } from './initiatives/list-initiatives/initiative-delete/initiative-delete.component';
import { InitiativeAddUpdateComponent } from './initiatives/list-initiatives/initiative-add-update/initiative-add-update.component';
import { ListEventsComponent } from './events/list-events/list-events.component';
import { SearchEventComponent } from './events/search-event/search-event.component';
import { DescriptionEventComponent } from './events/list-events/description-event/description-event.component';
import { DeleteEventComponent } from './events/list-events/delete-event/delete-event.component';
import { AddUpdateEventComponent } from './events/list-events/add-update-event/add-update-event.component';
import { InternsComponent } from './interns/interns.component';
import { SearchInternComponent } from './interns/search-intern/search-intern.component';
import { InternComponent } from './interns/intern/intern.component';
import { InternFilterPipe } from './interns/pipe/intern-filter.pipe';
import { InternRequestService } from './shared/service/request/intern-request.service';
import { InternDescriptionComponent } from './interns/intern/intern-description/intern-description.component';
import { InternDeleteComponent } from './interns/intern/intern-delete/intern-delete.component';
import { InternAddUpdateComponent } from './interns/intern/intern-add-update/intern-add-update.component';
import { AddEventsComponent } from './speakers/speaker/add-events/add-events.component';
import { EventsFilterPipe } from './speakers/pipe/events-filter.pipe';
import { EventsSpeakerComponent } from './speakers/speaker/events-speaker/events-speaker.component';
import { EventComponent } from './speakers/speaker/events-speaker/event/event.component';
import { DeleteEventsComponent } from './speakers/speaker/delete-events/delete-events.component';
import { DeleteEventsFilterPipe } from './speakers/pipe/delete-events-filter.pipe';




@NgModule({
  declarations: [
    AppComponent,
    InitiativesComponent,
    SpeakersComponent,
    EventsComponent,
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
    ActivityDeleteComponent,
    ActivityAddUpdateComponent,
    ActivityFilterPipe,
    ListInitiativesComponent,
    SearchInitiativeComponent,
    InitiativesFilterPipe,
    InitiativeDescriptionComponent,
    InitiativeDeleteComponent,
    InitiativeAddUpdateComponent,
    ListEventsComponent,
    SearchEventComponent,
    DescriptionEventComponent,
    DeleteEventComponent,
    AddUpdateEventComponent,
    InternsComponent,
    SearchInternComponent,
    InternComponent,
    InternFilterPipe,
    InternDescriptionComponent,
    InternDeleteComponent,
    InternAddUpdateComponent,
    AddEventsComponent,
    EventsFilterPipe,
    EventsSpeakerComponent,
    EventComponent,
    DeleteEventsComponent,
    DeleteEventsFilterPipe
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
    ActivityRequestService,
    InternRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
