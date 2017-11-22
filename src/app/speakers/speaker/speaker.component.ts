import { Component, OnInit, Input } from '@angular/core';
import { Speaker } from '../model/speaker.model';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {
  private speaker: Speaker;

  constructor() { }

  ngOnInit() {
  }

  @Input('speakerInput')
  public set setSpeaker(speaker: Speaker) {
    this.speaker = speaker;
  }

  public getSpeaker(): Speaker {
    return this.speaker;
  }

}
