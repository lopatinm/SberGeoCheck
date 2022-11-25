import { Component } from '@angular/core';
import { Quest } from 'src/app/models/quest';
import { QuestService } from '../quest.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent {

  quests: Quest[] | undefined;

  constructor(private questService: QuestService){
    this.questService.getQuests().subscribe(result => {
      this.quests = result;
    });
  }
}
