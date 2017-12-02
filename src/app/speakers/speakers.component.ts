import { Component, OnInit } from '@angular/core';
import { Speaker } from './model/speaker.model';
import { SpeakerRequestService } from '../shared/service/request/speaker-request.service';
import { SpeakerService } from './service/speaker.service';
import { EventRequestService } from '../shared/service/request/event-request.service';

@Component({
    selector: 'app-speakers',
    moduleId: module.id,
    templateUrl: 'speakers.component.html',
    styleUrls: [],
    providers: [SpeakerService]
})

export class SpeakersComponent implements OnInit {
    private speakers: Speaker[];
    private filterSpeaker = '';
    private filterPreference: number;

    constructor(private requestService: SpeakerRequestService, private statusSpeaker: SpeakerService,
                private speakersEvent: EventRequestService) {
        this.createdOrUpdateSpeaker();
        this.deleteSpeaker();
        this.eventFromSpeakers();
        this.reloadSpeakersEvents();

    }
    ngOnInit() {
        this.reloadSpeakers();
    }

    private deleteSpeaker() {
        this.statusSpeaker.getStatusDeleted().subscribe((speakerSlice: {id: number, status: boolean} ) => {
            if (speakerSlice.status) {
                this.speakers.splice(speakerSlice.id, 1);
            }
        });
    }

    private reloadSpeakersEvents() {
        this.statusSpeaker.getReloadSpeakers().subscribe((reload: boolean) => {
            if (reload) {
                this.reloadSpeakers();
            }
        });
    }

    private eventFromSpeakers() {
        this.statusSpeaker.getSpeakersEvent().subscribe((id: number) => {
            if (id !== -1) {
                this.eventsSpeakers(id);
            }else {
                this.reloadSpeakers();
            }
        });
    }

    private eventsSpeakers(id: number) {
        this.speakers = [];
        this.speakersEvent.getSpeakersFromEvent(id).subscribe((speakersResponse: any) => {
            speakersResponse.data.forEach(speaker => {
                this.speakers.push(new Speaker(speaker.idSpeaker, speaker.name, speaker.title, speaker.bio, speaker.imageUrl));
              }, (error) => {
              });
        });
    }


    private createdOrUpdateSpeaker() {
        this.statusSpeaker.getStatusCreatedOrUpdated().subscribe((addUpdate: boolean) => {
            if (addUpdate) {
                this.reloadSpeakers();
            }
        });
    }


    private reloadSpeakers() {
        this.speakers = [];
        this.requestService.getSpeakers().subscribe((speakersResponse: any) => {
            speakersResponse.data.forEach(speaker => {
                this.speakers.push(new Speaker(speaker.idSpeaker, speaker.name, speaker.title, speaker.bio, speaker.imageUrl));
              }, (error) => {
              });
        });
    }

    public getSpeakers(): Speaker[] {
        return this.speakers;
    }

    public setFilterSpeaker(filterSpeaker: string) {
        this.filterSpeaker = filterSpeaker;
    }

    public getFilterSpeaker(): string {
        return this.filterSpeaker;
    }

    public setFilterPreference(filterPreference: number) {
        this.filterPreference = filterPreference;
    }

    public getFilterPreference(): number {
        return this.filterPreference;
    }
}
