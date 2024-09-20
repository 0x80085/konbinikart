import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { action, alert } from '@nativescript/core';
import { EditableGroceryItem, GroceryItem } from '~/app/models/grocery-item.model';
import { ItemService } from '~/app/services/item.service';
import { toRomaji, toHiragana, toKatakana, isHiragana, isKatakana } from 'wanakana';

@Component({
  selector: 'ns-create-grocery-item',
  templateUrl: './create-grocery-item.component.html',
  styleUrls: ['./create-grocery-item.component.css']
})
export class CreateGroceryItemComponent {
  groceryItem: EditableGroceryItem = {
    id: 0,
    emoji: '',
    nameEnglish: '',
    nameKatakana: '',
    nameHiragana: '',
    nameRomaji: '',
    dateLastInteraction: new Date(),
    isInStorage: true
  };

  constructor(
    private itemService: ItemService,
    private routerExtensions: RouterExtensions
  ) { }

  onChangeHiragana() {
    const nameHiragana = this.groceryItem.nameHiragana;
    if (isHiragana(nameHiragana.replaceAll(" ", ""))) {
      this.groceryItem.nameRomaji = toRomaji(nameHiragana);
      this.groceryItem.nameKatakana = toKatakana(nameHiragana);
    }
  }
  onChangeKatakana() {
    const nameKatakana = this.groceryItem.nameKatakana;
    if (isKatakana(nameKatakana)) {
      this.groceryItem.nameRomaji = toRomaji(nameKatakana);
      this.groceryItem.nameHiragana = toHiragana(nameKatakana);
    }

  }

  addItem() {
    if (
      this.groceryItem.emoji.trim() === "" ||
      this.groceryItem.nameEnglish.trim() === "" ||
      this.groceryItem.nameHiragana.trim() === "" ||
      this.groceryItem.nameKatakana.trim() === ""
    ) {
      alert("⚠️ Some fields are missing input.");
      return;
    }

    const id = this.itemService.getAllGroceryItems().length - 1;

    const newItem: GroceryItem = {
      id: id,
      emoji: this.groceryItem.emoji.trim(),
      nameEnglish: this.groceryItem.nameEnglish.trim(),
      nameHiragana: this.groceryItem.nameHiragana.trim(),
      nameKatakana: this.groceryItem.nameKatakana.trim(),
      nameRomaji: this.groceryItem.nameRomaji.trim()
    };

    const isHiraganaValid = isHiragana(newItem.nameHiragana);
    if (!isHiraganaValid) {
      alert("⚠️ Please enter valid hiragana. This is not hiragana.");
      return;
    }
    const isKatakanaValid = isKatakana(newItem.nameKatakana);
    if (!isKatakanaValid) {
      alert("⚠️ Please enter valid katakana. This is not katakana.");
      return;
    }

    this.itemService.addGroceryItemToStorage(newItem);

    const actionsMap = {
      "Back to list": () => this.routerExtensions.backToPreviousPage(),
      "Create new": () => this.resetForm(),
    };

    action({
      message: "✅ Saved to grocery list!",
      cancelable: true,
      title: "✅ Saved",
      actions: Object.keys(actionsMap)
    }).then((result: string) => {
      const actionToPerform = actionsMap[result];
      if (actionToPerform) {
        actionToPerform();
      }
    });
  }

  private resetForm() {
    this.groceryItem = {
      id: 0,
      emoji: '',
      nameEnglish: '',
      nameKatakana: '',
      nameHiragana: '',
      nameRomaji: '',
      dateLastInteraction: new Date(),
      isInStorage: true
    };
  }
}
