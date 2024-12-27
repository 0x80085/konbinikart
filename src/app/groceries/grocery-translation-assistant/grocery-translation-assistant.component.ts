import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { isHiragana, isKatakana } from 'wanakana';
import { action, alert, inputType, prompt, PromptResult } from '@nativescript/core';
import { catchError, finalize, take } from 'rxjs';
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

  isLoading = false;

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
      return;
    }

    this.resetModel();

    this.isLoading = true;
    this.translateService.getTranslation(word).pipe(
      finalize(() => this.isLoading = false),
      take(1),
      catchError(async (error) => {

        console.log(error);

        if (error.status === 401) {
          await this.showEnterJWTPopup()
          throw new Error(error);
        }
        alert("Failed to translate... Error code=" + error.status)
        throw new Error(error);
      })
    ).subscribe(it => {
      this.groceryItem = {
        ...it,
        id: 'replace me',
        emoji: it.emoji.trim(),
        dateLastInteraction: new Date, isInStorage: false
      };
    })

  }

  private resetModel() {
    this.groceryItem.nameHiragana = '';
    this.groceryItem.nameKatakana = '';
    this.groceryItem.nameRomaji = '';
    this.groceryItem.explanation = '';
    this.groceryItem.originalAiTranslation = '';
    this.groceryItem.emoji = '';
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

   const storedItemRef = this.customItemsService.add(newItem);

    this.groceryListService.add(storedItemRef);

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

  private async showEnterJWTPopup(): Promise<void> {
    await prompt({
      title: "Login to use assistant",
      message: "Please enter your JWT to access the assistant (test & mytestsecurePassword123):",
      defaultText: "",
      okButtonText: "Set",
      cancelButtonText: "Cancel",
      inputType: inputType.text,
      cancelable: true,
    }).then(({ result, text }: PromptResult) => {
      if (result) {
        console.log("Token: ", text);
        this.translateService.setToken(text);
      } else {
        console.log("User canceled the input.");
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
