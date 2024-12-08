import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { action, alert } from '@nativescript/core';
import { EditableGroceryItem, GroceryItem } from '~/app/models/grocery-item.model';
import { CustomItemsService } from '~/app/services/items/custom-items.service';
import { GroceryListService } from '~/app/services/items/grocery-list.service';
import { toRomaji, toHiragana, toKatakana, isHiragana, isKatakana } from 'wanakana';

@Component({
  selector: 'ns-create-grocery-item',
  templateUrl: './create-grocery-item.component.html',
  styleUrls: ['./create-grocery-item.component.css']
})
export class CreateGroceryItemComponent {
  groceryItem: EditableGroceryItem = {
    id: '0',
    emoji: '',
    nameEnglish: '',
    nameKatakana: '',
    nameHiragana: '',
    nameRomaji: '',
    dateLastInteraction: new Date(),
    isInStorage: true
  };

  constructor(
    private customItemsService: CustomItemsService,
    private groceryListService: GroceryListService,
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

    const newItem: GroceryItem = {
      id: 'replace me',
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

    this.customItemsService.add(newItem);
    this.groceryListService.add(newItem);

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
      id: '0',
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
