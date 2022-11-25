import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Quest } from 'src/app/models/quest';
import { QuestService } from '../quest.service';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})
export class QuestComponent {

  quests: Quest[] | undefined;

  constructor(private questService: QuestService,
    private appService: AppService,
    private router: Router){
       this.questService.getQuests().subscribe(result => {
      this.quests = result;
    });
  }

  addQuestreq(id: any){
    this.questService.addQuestreq(id).subscribe(result => {
      this.appService.loader.emit(false);
        this.router.navigate(['/profile']);
    });
  }
}
