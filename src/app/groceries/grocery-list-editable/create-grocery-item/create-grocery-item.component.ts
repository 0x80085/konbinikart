import { Component } from '@angular/core';
import { alert } from '@nativescript/core';
import { EditableGroceryItem } from '~/app/models/grocery-item.model';
import { ItemService } from '~/app/services/item.service';

@Component({
  selector: 'ns-create-grocery-item',
  templateUrl: './create-grocery-item.component.html',
  styleUrls: ['./create-grocery-item.component.css']
})
export class CreateGroceryItemComponent {
  groceryItem: EditableGroceryItem = {
    id: 0, // You can set this dynamically if needed
    emoji: '',
    nameEnglish: '',
    nameKatakana: '',
    nameHiragana: '',
    nameRomaji: '',
    dateLastInteraction: new Date(),
    isInStorage: true
  };

  hiraganaRegex = /^[\u3040-\u309Fぁ-ゟー]+$/;
  katakanaRegex = /^[\u30A0-\u30FFーｦ-ﾟ]+$/;

  constructor(
    private itemService: ItemService
  ) { }

  addItem() {
    const id = this.itemService.getAllGroceryItems().length - 1;

    console.log("Adding item...", { ...this.groceryItem, id: id });
    this.itemService.addGroceryItemToStorage({ ...this.groceryItem, id: id });
    alert("Saved to grocery list!");
  }
}
