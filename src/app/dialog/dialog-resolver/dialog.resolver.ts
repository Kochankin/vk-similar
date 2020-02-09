import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MessagesBatch } from 'src/app/shared/models/messages-batch';
import { DialogService } from '../dialog-service/dialog.service';


@Injectable()
export class DialogResolver implements Resolve<MessagesBatch[]> {
  constructor(private _dialogService: DialogService) {}

  public resolve(route: ActivatedRouteSnapshot): MessagesBatch[] {
    const id = Number(route.paramMap.get('id'));
    return this._dialogService.getMessagesBatches(id);
  }
}