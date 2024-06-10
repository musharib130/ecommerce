import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAosDirective } from './ngx-aos.directive';



@NgModule({
  declarations: [
    NgxAosDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxAosDirective
  ]
})
export class NgxAosModule { }
