import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MainpageComponent} from "./mainpage/mainpage.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainpageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
