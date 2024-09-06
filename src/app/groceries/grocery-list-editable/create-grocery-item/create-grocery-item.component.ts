import { Component } from '@angular/core';
import { action, alert } from '@nativescript/core';
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

  resetForm() {
    this.groceryItem = {
      id: 0, // You can set this dynamically if needed
      emoji: '',
      nameEnglish: '',
      nameKatakana: '',
      nameHiragana: '',
      nameRomaji: '',
      dateLastInteraction: new Date(),
      isInStorage: true
    };
  }

  addItem() {
    if (
      this.groceryItem.nameEnglish.trim() === "" ||
      this.groceryItem.nameHiragana.trim() === "" ||
      this.groceryItem.nameKatakana.trim() === "" ||
      this.groceryItem.nameRomaji.trim() === ""
    ) {
      alert("⚠️ Some fields are missing input.");
      return;
    }

    if (false) {
      // Todo
      const isHiraganaValid = this.hiraganaRegex.test(this.groceryItem.nameHiragana);
      if (!isHiraganaValid) {
        alert("⚠️ Please enter valid hiragana. This is not hiragana.");
        return;
      }
      const isKatakanaValid = this.katakanaRegex.test(this.groceryItem.nameKatakana);
      if (!isKatakanaValid) {
        alert("⚠️ Please enter valid katakana. This is not katakana.");
        return;
      }
    }

    const id = this.itemService.getAllGroceryItems().length - 1;

    const newItem = { ...this.groceryItem, id: id };
    console.log("Adding item...", newItem);
    this.itemService.addGroceryItemToStorage(newItem);

    action({
      message: "✅ Saved to grocery list!",
      cancelable: true,
      title: "✅ Saved",
      actions: []
    }).then(_ => this.resetForm());
  }
}
