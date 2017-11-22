import { Pipe, PipeTransform } from '@angular/core';
import { Speaker } from '../model/speaker.model';

@Pipe({
  name: 'filterSpeaker',
  pure: false
})
export class FilterSpeakerPipe implements PipeTransform {

  transform(speakers: Speaker[], filterString: string, filterPreference: number): Speaker[] {
    if (speakers.length === 0 || filterString === '') {
      return speakers;
    }
    const speakersFiltered: Speaker[] = [];
    switch (filterPreference) {
      case 0:
        for (const speaker of speakers) {
          if (speaker.getName().toLowerCase().includes(filterString.toLowerCase())) {
            speakersFiltered.push(speaker);
          }
        }
          break;
      case 1:
        for (const speaker of speakers) {
          if (speaker.getTitle().toLowerCase().includes(filterString.toLowerCase())) {
            speakersFiltered.push(speaker);
          }
        }
        break;
      default:
      for (const speaker of speakers) {
        if (speaker.getBio().toLowerCase().includes(filterString.toLowerCase())) {
          speakersFiltered.push(speaker);
        }
      }
      break;
  }
    return speakersFiltered;
  }

}
