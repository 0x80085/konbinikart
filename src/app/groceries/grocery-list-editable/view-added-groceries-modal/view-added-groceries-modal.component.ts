import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';
import { Screen } from '@nativescript/core/platform';
import { GroceryItem } from '~/app/models/grocery-item.model';
import { ItemService } from '~/app/services/item.service';

@Component({
  selector: 'ns-view-added-groceries-modal',
  templateUrl: './view-added-groceries-modal.component.html',
  styleUrls: ['./view-added-groceries-modal.component.css']
})
export class ViewAddedGroceriesModalComponent {
  items: GroceryItem[];
  width: number;

  constructor(private params: ModalDialogParams, private itemsService: ItemService) {
    // this.model = params.context;
    this.width = Screen.mainScreen.widthDIPs * 0.8
    this.items = this.itemsService.getGroceryItemsFromStorage();
  }

  closeModal() {
    this.params.closeCallback();
  }
}
