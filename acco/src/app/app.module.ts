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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './admincomponent/header/header.component';
import { BookingComponent } from './admincomponent/booking/booking.component';
import { DatePipe } from '@angular/common';
import{MatTableModule} from '@angular/material/table';
import{MatPaginatorModule} from '@angular/material/paginator';
import{MatInputModule} from '@angular/material/input';
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { RoleComponent } from './admincomponent/role/role.component';
import { RoomtypeComponent } from './component/roomtype/roomtype.component';
import { FooditemComponent } from './component/fooditem/fooditem.component';
import { PlacetovisitComponent } from './admincomponent/placetovisit/placetovisit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetdetailsInterceptor } from './services/getdetails.interceptor';
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
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FrontdeskselectroomsComponent } from './admincomponent/frontdeskselectrooms/frontdeskselectrooms.component';
import { RoomlogicComponent } from './component/roomlogic/roomlogic.component';
import { RoomfromwalkinComponent } from './admincomponent/roomfromwalkin/roomfromwalkin.component';
import { BookingdetailsComponent } from './component/bookingdetails/bookingdetails.component';
import { ContactusComponent } from './component/contactus/contactus.component';
import { ForgotpasswordotpComponent } from './component/forgotpasswordotp/forgotpasswordotp.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { ForgotpasswordstepperComponent } from './component/forgotpasswordstepper/forgotpasswordstepper.component';
import { ForgotpasswordformComponent } from './component/forgotpasswordform/forgotpasswordform.component';
import { UpdateproofComponent } from './admincomponent/updateproof/updateproof.component';
import { RoomfromwalkinfutureComponent } from './admincomponent/roomfromwalkinfuture/roomfromwalkinfuture.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
// import { MatchpasswordComponent } from './component/matchpassword/matchpassword.component';


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
    RoomtypeComponent,
    FooditemComponent,
    PlacetovisitComponent,
    TariffComponent,
    BookingsummaryComponent,
    StepperComponent,
    AdminComponent,
    FrontdeskComponent,
    UserdetailsComponent,
    MybookingsComponent,
    ProfiledetailsComponent,
    ChangepasswordComponent,
    CancelbookingComponent,
    WalkingcurrentComponent,
    WalkingfutureComponent,
    FrontdeskselectroomsComponent,
    RoomlogicComponent,
    RoomfromwalkinComponent,
    BookingdetailsComponent,
    ContactusComponent,
    ForgotpasswordstepperComponent,
    ForgotpasswordotpComponent,
    ForgotpasswordformComponent,
    UpdateproofComponent,
    RoomfromwalkinfutureComponent,
    SpinnerComponent
    // MatchpasswordComponent,
   
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
    BrowserAnimationsModule,
    MatRadioModule,
    MatStepperModule,
    MatButtonModule,
    NgOtpInputModule,
    
    NgMultiSelectDropDownModule.forRoot()
   
    
  ],
  providers: [DatePipe,
    {
    provide:HTTP_INTERCEPTORS,
    useClass:GetdetailsInterceptor,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }


