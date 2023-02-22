import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { CountryDetailsComponent } from './country-details/country-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
 
];

@NgModule({
    declarations: [AppComponent,
        HomeComponent,
        CountryDetailsComponent, 
      ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        CommonModule,
        HttpClientModule,]
       
})
export class AppModule {}


