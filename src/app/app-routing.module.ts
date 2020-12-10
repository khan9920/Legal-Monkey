import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversionsComponent } from './components/conversions/conversions.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'conversions/recent', component: ConversionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
