import { Component, OnInit } from '@angular/core';
import { Speaker } from './model/speaker.model';
import { SpeakerRequestService } from '../shared/service/request/speaker-request.service';
import { SpeakerService } from './service/speaker.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'speakers.component.html',
    styleUrls: [],
    providers: [SpeakerService]
})

export class SpeakersComponent implements OnInit {
    private speakers: Speaker[];
    private filterSpeaker = '';
    private filterPreference: number;

    constructor(private requestService: SpeakerRequestService, private statusSpeaker: SpeakerService) {
        this.statusSpeaker.getStatusDeleted().subscribe((speakerSlice: {id: number, status: boolean} ) => {
            console.log(4);
            if (speakerSlice.status) {
                console.log(5);
                this.speakers.splice(speakerSlice.id, 1)
            }
        });
    }
    ngOnInit() {
        this.reloadSpeakers();
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
