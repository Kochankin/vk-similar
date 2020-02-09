import { LocalStorageService } from './shared/local-storage-service/local-storage.service';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainModule } from './main/main.module';
import { DialogModule } from './dialog/dialog.module';
import { LoginModule } from './login/login.module';
import { AppGuard } from './app.guard';


function initLocalStorage(localStorageService: LocalStorageService) {
  return () => {
    return new Promise((resolve) => {
      localStorageService.setDefaultDataToLocalStorage()
      resolve();
    });
  }
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    LoginModule, 
    MainModule,
    DialogModule,
  ],
  providers: [
    AppGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initLocalStorage,
      multi: true,
      deps: [LocalStorageService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
