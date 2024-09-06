import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { action, alert } from '@nativescript/core';
import { EditableGroceryItem } from '~/app/models/grocery-item.model';
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
    if (isHiragana(this.groceryItem.nameHiragana)) {
      this.groceryItem.nameRomaji = toRomaji(this.groceryItem.nameHiragana);
      this.groceryItem.nameKatakana = toKatakana(this.groceryItem.nameHiragana);
    }
  }
  onChangeKatakana() {
    if (isKatakana(this.groceryItem.nameKatakana)) {
      this.groceryItem.nameRomaji = toRomaji(this.groceryItem.nameKatakana);
      this.groceryItem.nameHiragana = toHiragana(this.groceryItem.nameKatakana);
    }

  }

  resetForm() {
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
      // const isHiraganaValid = this.hiraganaRegex.test(this.groceryItem.nameHiragana);
      // if (!isHiraganaValid) {
      //   alert("⚠️ Please enter valid hiragana. This is not hiragana.");
      //   return;
      // }
      // const isKatakanaValid = this.katakanaRegex.test(this.groceryItem.nameKatakana);
      // if (!isKatakanaValid) {
      //   alert("⚠️ Please enter valid katakana. This is not katakana.");
      //   return;
      // }
    }

    const id = this.itemService.getAllGroceryItems().length - 1;

    const newItem = { ...this.groceryItem, id: id };
    this.itemService.addGroceryItemToStorage(newItem);

    const actionsMap = {
      "Back": () => this.routerExtensions.backToPreviousPage(),
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
}
