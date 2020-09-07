import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateThingComponent } from './create-thing/create-thing.component';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { CreatedAppComponent } from './created-app/created-app.component';
import { AllocateThingComponent } from './allocate-thing/allocate-thing.component';
import { AuthGuard } from '../app/auth.guard';
import { GenerateReportComponent } from './generate-report/generate-report.component';
import { GraphsComponent } from './graphs/graphs.component';



const routes: Routes = [ 
    { path: 'home', component: CreateThingComponent},
    { path: 'createdApp', component: CreatedAppComponent},
    { path: 'allocate', component: AllocateThingComponent, canActivate:[AuthGuard]},
    { path: 'report', component: GenerateReportComponent},
    { path: 'graphs', component: GraphsComponent},
    { path: '', component: CreateThingComponent},
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
