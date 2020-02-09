import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DialogPreviewComponent } from './dialog-preview/dialog-preview.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { DialogPreviewService } from './dialog-preview-service/dialog-preview.service';

@NgModule({
  declarations: [
    AddDialogComponent,
    DialogPreviewComponent,
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule
  ],
  providers: [DialogPreviewService]
})
export class MainModule { }
