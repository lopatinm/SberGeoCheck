import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
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
  displayedColumns: string[] = ['id', 'title'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable) table: MatTable<PeriodicElement> | undefined;
  
  constructor(private questService: QuestService){
    this.dataSource = [];
    this.questService.getQuest().subscribe(result => {
      result.forEach((el: { id: any; title: any;}) => {
        let mark = {id: el.id, title: el.title};
        this.dataSource.push(mark);
      });
      this.table?.renderRows();
    });
  }
}
