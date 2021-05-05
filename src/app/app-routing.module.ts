import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { ConversionsComponent } from './components/conversions/conversions.component';
import { DocumentConversionComponent } from './components/landingpage/document-conversion/document-conversion.component';
import { EditorComponent } from './components/landingpage/editor/editor.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TncComponent } from './components/tnc/tnc.component';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'documents', component: DocumentConversionComponent },
  { path: 'extracts', component: ConversionsComponent },
  { path: 'account', component: AccountComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'terms-conditions', component: TncComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
