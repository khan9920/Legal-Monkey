import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { HeaderComponent } from './landingpage/header/header.component';
import { ExamplesComponent } from './landingpage/examples/examples.component';
import { TextEditorComponent } from './landingpage/text-editor/text-editor.component';
import { TextProcessedComponent } from './landingpage/text-processed/text-processed.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    HeaderComponent,
    ExamplesComponent,
    TextEditorComponent,
    TextProcessedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
