import { Component } from '@angular/core';
import { Questreq } from 'src/app/models/questreq';
import { Questreqs } from 'src/app/models/questreqs';
import { QuestService } from '../quest.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent {
  questreq: Questreq[] | undefined;
  
  constructor(private questService: QuestService){
    this.questService.getQuestreq().subscribe((result)=>{
      this.questreq = result;
    });
  }

  deleteQuestreq(id: any){
    this.questService.deleteQuestreq(id).subscribe((result)=>{
      this.questService.getQuestreq().subscribe((result)=>{
        this.questreq = result;
      });
    });
  }

  editQuestreq(questreq: any){
    questreq.status = 1;
    this.questService.editQuestreq(questreq).subscribe((result)=>{
      this.questService.getQuestreq().subscribe((result)=>{
        this.questreq = result;
      });
    });
  }
}
