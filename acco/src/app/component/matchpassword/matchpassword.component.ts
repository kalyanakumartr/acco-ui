import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


export const matchpassword : ValidatorFn = (control: AbstractControl):ValidationErrors|null =>{

  let password = control.get('password');
  let confirmpassword = control.get('confirmpassword');
  if(password && confirmpassword && password?.value != confirmpassword?.value){
     return {
         passwordmatcherror : true }
  }
 return null; 
}
