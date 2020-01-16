import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import {AdviseService} from '../../../common/services/AdviseService';
import {FormsModule} from '@angular/forms';

/**
 * 意见与建议
 */
@Component({
  selector: 'app-advise',
  templateUrl: './advise.component.html',
  styleUrls: ['./advise.component.css']
})
export class AdviseComponent implements OnInit {

  item = {
    adviseDetail: ''
  };

  constructor(private adviseService: AdviseService) {
  }


  ngOnInit() {
  }

  advise() {
    this.adviseService.saveAdvise(this.item).subscribe(res => {
      console.log('res:', res);
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule
  ],
  providers: [AdviseService],
  exports: [AdviseComponent],
  declarations: [
    AdviseComponent
  ]
})
export class AdviseModule {
}
