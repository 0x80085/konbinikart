import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';
import { Screen } from '@nativescript/core/platform';
import { GroceryItem } from '~/app/models/grocery-item.model';
import { GroceryListService } from '~/app/services/items/grocery-list.service';

@Component({
  selector: 'ns-view-added-groceries-modal',
  templateUrl: './view-added-groceries-modal.component.html',
  styleUrls: ['./view-added-groceries-modal.component.css']
})
export class ViewAddedGroceriesModalComponent {
  items: GroceryItem[];
  width: number;
  height: number;

  constructor(
    private params: ModalDialogParams,
    private groceryListService: GroceryListService,
  ) {
    this.width = Screen.mainScreen.widthDIPs * 0.8
    this.height = Screen.mainScreen.heightDIPs * 0.6
    this.refreshList();
  }

  onDelete(item: GroceryItem) {
    this.groceryListService.remove(item.id);
    this.refreshList();
  }

  closeModal() {
    this.params.closeCallback();
  }

  private refreshList() {
    this.items = this.groceryListService.getAll();
  }
}
