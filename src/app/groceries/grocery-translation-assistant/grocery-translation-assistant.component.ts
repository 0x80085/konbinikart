import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { isHiragana, isKatakana } from 'wanakana';
import { action, alert } from '@nativescript/core';
import { take } from 'rxjs';
import { EditableGroceryItem, GroceryItem } from '../../models/grocery-item.model';
import { CustomItemsService } from '../../services/items/custom-items.service';
import { TranslationService } from '../../services/items/translation.service';
import { GroceryListService } from '../../services/items/grocery-list.service';

export interface EditableGroceryItemAutoTranslated extends EditableGroceryItem {
  explanation: string;
  originalAiTranslation: string;
}

@Component({
  selector: 'ns-grocery-translation-assistant',
  templateUrl: './grocery-translation-assistant.component.html',
  styleUrls: ['./grocery-translation-assistant.component.css']
})
export class GroceryTranslationAssistantComponent {

  groceryItem: EditableGroceryItemAutoTranslated = {
    id: '0',
    emoji: '',
    nameEnglish: '',
    nameKatakana: '',
    nameHiragana: '',
    nameRomaji: '',
    dateLastInteraction: new Date(),
    isInStorage: true,
    explanation: "",
    originalAiTranslation: ""
  };

  constructor(
    private translateService: TranslationService,
    private customItemsService: CustomItemsService,
    private groceryListService: GroceryListService,
    private routerExtensions: RouterExtensions,

  ) { }

  translate() {
    const word = this.groceryItem.nameEnglish.trim();

    if (word.length === 0) {
      return
    }

    this.translateService.getTranslation(word).pipe(
      take(1)
    ).subscribe(it => {
      this.groceryItem = {
        ...it,
        id: 'replace me',
        emoji: this.groceryItem.emoji.trim(),
        dateLastInteraction: new Date, isInStorage: false
      };
    })

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
      isInStorage: true,
      explanation: "",
      originalAiTranslation: ''

    };
  }


}
