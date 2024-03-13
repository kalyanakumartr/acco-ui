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

import { TariffComponent } from './component/tariff/tariff.component';
import { BookingsummaryComponent } from './component/bookingsummary/bookingsummary.component';
import { StepperComponent } from './component/stepper/stepper.component';
import { AdminComponent } from './admincomponent/admin/admin.component';
import { FrontdeskComponent } from './admincomponent/frontdesk/frontdesk.component';
import { UserdetailsComponent } from './component/userdetails/userdetails.component';
import { MybookingsComponent } from './component/mybookings/mybookings.component';
import { ProfiledetailsComponent } from './component/profiledetails/profiledetails.component';
import { ChangepasswordComponent } from './component/changepassword/changepassword.component';
import { CancelbookingComponent } from './component/cancelbooking/cancelbooking.component';
import { WalkingcurrentComponent } from './admincomponent/walkingcurrent/walkingcurrent.component';
import { WalkingfutureComponent } from './admincomponent/walkingfuture/walkingfuture.component';
import { FrontdeskselectroomsComponent } from './admincomponent/frontdeskselectrooms/frontdeskselectrooms.component';
import { RoomlogicComponent } from './component/roomlogic/roomlogic.component';
import { RoomfromwalkinComponent } from './admincomponent/roomfromwalkin/roomfromwalkin.component';
import { BookingdetailsComponent } from './component/bookingdetails/bookingdetails.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { ForgotpasswordotpComponent } from './component/forgotpasswordotp/forgotpasswordotp.component';
import { ForgotpasswordformComponent } from './component/forgotpasswordform/forgotpasswordform.component';
import { ForgotpasswordstepperComponent } from './component/forgotpasswordstepper/forgotpasswordstepper.component';
import { UpdateproofComponent } from './admincomponent/updateproof/updateproof.component';
import { RoomfromwalkinfutureComponent } from './admincomponent/roomfromwalkinfuture/roomfromwalkinfuture.component';
import { CanceledbookingfoeComponent } from './admincomponent/canceledbookingfoe/canceledbookingfoe.component';
import { PlacetovisitComponent } from './component/placetovisit/placetovisit.component';
import { ManageflatsComponent } from './admincomponent/manageflats/manageflats.component';
// import { CanceledbookingfoeComponent } from './admincomponent/canceledbookingfoe/canceledbookingfoe.component';
// import { PlacetovisitComponent } from './component/placetovisit/placetovisit.component';


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
 
  {path:'bookingsummary',component:BookingsummaryComponent},
  {path:'stepper',component:StepperComponent},
  {path:'admin',component:AdminComponent},
  {path:'frontdesk',component:FrontdeskComponent},
  {path:'tariff',component:TariffComponent},
  {path:'userdetails',component:UserdetailsComponent},
  {path:'mybookings',component:MybookingsComponent},
  {path:'profiledetails',component:ProfiledetailsComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'cancelbooking',component:CancelbookingComponent},
  {path:'walkingcurrent',component:WalkingcurrentComponent},
  {path:'walkingfuture',component:WalkingfutureComponent},
  {path:'selectrooms',component:FrontdeskselectroomsComponent},
  {path:'roomlogic',component:RoomlogicComponent},
  {path:'roomfromwalkin',component:RoomfromwalkinComponent},
  {path:'bookingdetails',component:BookingdetailsComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'forgotpassword',component:ForgotpasswordstepperComponent},
  {path:'forgotpasswordotp',component:ForgotpasswordotpComponent},
  {path:'forgotpasswordform',component:ForgotpasswordformComponent},
  {path:'updateproof',component:UpdateproofComponent},
  {path:'roomfromwalkinfuture',component:RoomfromwalkinfutureComponent},
   {path:'canceledbookingfoe',component:CanceledbookingfoeComponent},
   {path:'placetovisit',component:PlacetovisitComponent},
   {path:'manageflats',component:ManageflatsComponent},



  


  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
