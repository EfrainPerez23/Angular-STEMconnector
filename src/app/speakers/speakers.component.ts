import { Component, OnInit } from '@angular/core';
import { Speaker } from './model/speaker.model';
import { SpeakerRequestService } from '../shared/service/request/speaker-request.service';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'speakers.component.html',
    styleUrls: []
})

export class SpeakersComponent implements OnInit {
    private speakers: Speaker[];

    constructor(private requestService: SpeakerRequestService) {}
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
}
