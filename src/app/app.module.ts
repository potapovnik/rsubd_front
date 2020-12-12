import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
    MatExpansionModule,
  MatOptionModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { NameStageComponent } from './name-stage/name-stage.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DivisionComponent } from './division/division.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeStageComponent } from './employee-stage/employee-stage.component';
import { StageComponent } from './stage/stage.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    NameStageComponent,
    DivisionComponent,
    EmployeeComponent,
    EmployeeStageComponent,
    StageComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
