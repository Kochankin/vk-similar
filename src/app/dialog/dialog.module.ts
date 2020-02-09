import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPageComponent } from './dialog-page/dialog-page.component';
import { MessageBatchComponent } from './message-batch/message-batch.component';
import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { DialogRoutingModule } from './dialog-routing.module';
import { DialogService } from './dialog-service/dialog.service';

@NgModule({
  declarations: [
    DialogPageComponent,
    MessageBatchComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DialogRoutingModule,
  ],
  providers: [
    DialogService
  ]
})
export class DialogModule { }
