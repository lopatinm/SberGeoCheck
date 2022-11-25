import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { QuestService } from '../quest.service';

export interface PeriodicElement {
  title: string;
  id: number;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss']
})

export class QuestComponent {
  displayedColumns: string[] = ['id', 'title', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable) table: MatTable<PeriodicElement> | undefined;
  
  constructor(private questService: QuestService,
    private router: Router){
    this.dataSource = [];
    this.questService.getQuest().subscribe(result => {
      localStorage.setItem("quests", JSON.stringify(result));
      result.forEach((el: { id: any; category_id: any, latitude: any, longitude: any, user_id: any, title: any, info: any, about: any, img: any, level: any, timek: any, datestart: any, dateend: any, rating: any, comments: any, price: any}) => {
        let mark = {id: el.id, title: el.title};
        this.dataSource.push(mark);
      });
      this.table?.renderRows();
    });
  }

  editQuest(id: any){
    localStorage.setItem("questsid", id);
    this.router.navigate(['/quest/edit']);
  }
}
