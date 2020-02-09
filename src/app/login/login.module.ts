import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from './login-service/login.service';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
  ],
  providers: [ LoginService]
})
export class LoginModule { }
