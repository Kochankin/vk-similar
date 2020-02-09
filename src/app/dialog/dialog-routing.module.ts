import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogPageComponent } from './dialog-page/dialog-page.component';
import { DialogResolver } from './dialog-resolver/dialog.resolver';
import { AppGuard } from '../app.guard';

const routes: Routes = [
  {
    path: '', 
    component: DialogPageComponent,
    resolve: { dialog: DialogResolver },
    canActivate: [AppGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DialogResolver]
})
export class DialogRoutingModule { }
