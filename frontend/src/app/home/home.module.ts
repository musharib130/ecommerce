import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LottieModule } from 'ngx-lottie';

import { HomeRoutingModule } from './home-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { IconsModule } from '../utilities/icons/icons.module';
import { NgxAosModule } from '../utilities/ngx-aos/ngx-aos.module';
import { TimePickerComponent } from '../utilities/time-picker/time-picker.component';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    LottieModule,
    IconsModule,
    NgxAosModule,
    TimePickerComponent,
    HomeRoutingModule
  ]
})
export class HomeModule { }
