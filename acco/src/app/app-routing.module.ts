import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ExcelcreateComponent } from './excelcreate/excelcreate.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { FacitiliesComponent } from './component/facitilies/facitilies.component';
import { HeaderComponent } from './admincomponent/header/header.component';
import { BookingComponent } from './admincomponent/booking/booking.component';
import { RoleComponent } from './admincomponent/role/role.component';
import { RoomtypeComponent } from './component/roomtype/roomtype.component';
import { FooditemComponent } from './component/fooditem/fooditem.component';
import { PlacetovisitComponent } from './admincomponent/placetovisit/placetovisit.component';
import { TariffComponent } from './component/tariff/tariff.component';
import { BookingsummaryComponent } from './component/bookingsummary/bookingsummary.component';
import { StepperComponent } from './component/stepper/stepper.component';
import { AdminComponent } from './admincomponent/admin/admin.component';
import { FrontdeskComponent } from './admincomponent/frontdesk/frontdesk.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'excelcreate',component:ExcelcreateComponent},
  {path:'home',component:HomeComponent},  
  {path:'signup',component:SignupComponent},
  {path:'facitilies',component:FacitiliesComponent},
  {path:'header',component:HeaderComponent},
  {path:'booking',component:BookingComponent},  
  {path:'fooditem',component:FooditemComponent},  
  {path:'role',component:RoleComponent},
  {path:'roomtype',component:RoomtypeComponent},
  {path:'placetovisit',component:PlacetovisitComponent},
  {path:'bookingsummary',component:BookingsummaryComponent},
  {path:'stepper',component:StepperComponent},
  {path:'admin',component:AdminComponent},
  {path:'frontdesk',component:FrontdeskComponent},



  {path:'tariff',component:TariffComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
