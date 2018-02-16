import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CalendarModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

import { CountryServiceService } from './country.service';
import { CustomServiceService } from './custom-service.service';
import { UserService } from './user.service';
import {WinnerService} from './winners.service';
import { AuthguardGuard } from './authguard.guard';

import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { DetailsComponentComponent } from './details-component/details-component.component';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { DescriptionComponentComponent } from './description-component/description-component.component';
import { CustomComp1Component } from './custom-comp1/custom-comp1.component';

//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';
import { CreateComponentComponent } from './create-component/create-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path:'', 
    redirectTo: 'login',
   pathMatch: 'full' },
  { path:'login', 
  component:LoginComponentComponent},
  { path:'home', 
   canActivate:[AuthguardGuard],
   canActivateChild:[AuthguardGuard],
  component:HomeComponentComponent,
  children:[
      { path:'', redirectTo: 'dashboard', pathMatch: 'full' },
      { path:'dashboard', component: DashboardComponentComponent},
      { path:'details', component: CustomComp1Component},
      { path:'create', component: CreateComponentComponent},
      { path:'description/:id', component: DescriptionComponentComponent}
  ]},
  { path:'**', component:ErrorComponentComponent},

 ];
 

@NgModule({
  declarations: [
    AppComponent,
    CustomComp1Component,
    LoginComponentComponent,
    HomeComponentComponent,
    DashboardComponentComponent,
    DetailsComponentComponent,
    ErrorComponentComponent,
    DescriptionComponentComponent,
    CreateComponentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    CalendarModule,
    ButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
   // InMemoryWebApiModule.forRoot(InMemoryDataService),
  ],
  providers: [CustomServiceService,CountryServiceService,UserService,WinnerService,AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
