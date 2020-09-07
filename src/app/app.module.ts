import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NouisliderModule} from 'ng2-nouislider';

import {AppRoutingModule} from './app-routing.module'
import { AppComponent } from './app.component';
import { CreateThingComponent } from './create-thing/create-thing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatedAppComponent } from './created-app/created-app.component';
import { SliderModule } from '@syncfusion/ej2-angular-inputs';
import { DecimalPipe } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { AllocateThingComponent } from './allocate-thing/allocate-thing.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { HttpClientModule } from '@angular/common/http';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { GraphsComponent } from './graphs/graphs.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
 
  declarations: [
    AppComponent,
    CreateThingComponent,
    CreatedAppComponent,
    AllocateThingComponent,
    GenerateReportComponent,
    GraphsComponent
  
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    DropDownListModule,
    NouisliderModule,
    Ng5SliderModule,
    BrowserModule,
    SliderModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
