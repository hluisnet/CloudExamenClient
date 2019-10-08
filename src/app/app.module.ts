import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DashboardModule } from './dashboard/dashboard.module';
import { ProductModule } from './product/product.module';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { MatPaginatorModule, MatButtonModule } from '@angular/material';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppToolbarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    ProductModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,     
    MatCheckboxModule,MatButtonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MatToolbarModule,
    AppToolbarComponent,
    MatIconModule,MatButtonModule
     
    
  ]
})
export class AppModule { }
