import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { 
    path: '', 
    component: NavigationComponent 
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
