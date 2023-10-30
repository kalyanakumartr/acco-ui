import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { ExcelcreateComponent } from './excelcreate/excelcreate.component';
import { SignupComponent } from './component/signup/signup.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { FacitiliesComponent } from './component/facitilies/facitilies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './admincomponent/header/header.component';
import { BookingComponent } from './admincomponent/booking/booking.component';
import { DatePipe } from '@angular/common';
import{MatTableModule} from '@angular/material/table';
import{MatPaginatorModule} from '@angular/material/paginator';
import{MatInputModule} from '@angular/material/input';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{MatSortModule} from '@angular/material/sort';
import { RoleComponent } from './admincomponent/role/role.component';
import { RoomtypeComponent } from './component/roomtype/roomtype.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ExcelcreateComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    FacitiliesComponent,
    HeaderComponent,
    BookingComponent,
   
    RoleComponent,
         RoomtypeComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    AppRoutingModule,

    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
   
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


