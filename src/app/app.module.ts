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
    SpeakerComponent
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
    SpeakerRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
