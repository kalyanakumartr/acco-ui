import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ExcelcreateComponent } from './excelcreate/excelcreate.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { FacitiliesComponent } from './component/facitilies/facitilies.component';
import { HeaderComponent } from './admincomponent/header/header.component';
import { BookingComponent } from './admincomponent/booking/booking.component';
import { RollComponent } from './admincomponent/roll/roll.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'excelcreate',component:ExcelcreateComponent},
  {path:'home',component:HomeComponent},  
  {path:'signup',component:SignupComponent},
  {path:'facitilies',component:FacitiliesComponent},
  {path:'header',component:HeaderComponent},
  {path:'booking',component:BookingComponent},
  {path:'roll',component:RollComponent},
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
