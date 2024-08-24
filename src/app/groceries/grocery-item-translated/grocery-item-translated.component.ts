import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { GroceryItem } from "~/app/models/grocery-item.model";

export interface DisplayGroceryItem extends GroceryItem {
  checked: boolean;
  hintLevel: number;
}

@Component({
  selector: "ns-grocery-item-translated",
  templateUrl: "./grocery-item-translated.component.html",
  styleUrls: ["./grocery-item-translated.component.css"],
})
export class GroceryItemTranslatedComponent implements OnChanges {
  @Input() item: DisplayGroceryItem = null;
  @Input() translateMode: "hiragana" | "katakana";

  @Output() onCheckItem = new EventEmitter();

  private readonly maxHintLevel = 3;

  enableViewRomaji = false;
  enableViewEnglish = false;
  enableViewVisualHint = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["item"]) {
      this.setHintState();
    }
  }

  isHiraganaMode() {
    return this.translateMode === "hiragana";
  }

  isKatakanaMode() {
    return this.translateMode === "katakana";
  }

  isMaxHintLevelReached() {
    return this.item.hintLevel >= this.maxHintLevel;
  }

  getHintButtonText() {

    if (this.item.checked) {
      return '🛒'
    }
    return this.enableViewVisualHint ? this.item.emoji : 'HINT'
  }

  onTapHint() {
    if (this.isMaxHintLevelReached() || this.item.checked) {
      return;
    }
    this.item.hintLevel++;
    this.setHintState();
  }

  getBottomLabelText() {

    switch (true) {
      case this.item.checked:
        return this.item.nameEnglish
        break;
      case this.enableViewRomaji:
        return this.item.nameRomaji
        break;

      default:
        return ""
        break;
    }
  }

  private setHintState() {
    switch (this.item.hintLevel) {
      case 0:
        this.enableViewRomaji = false;
        this.enableViewVisualHint = false;
        this.enableViewEnglish = false;
        break;
      case 1:
        this.enableViewRomaji = true;
        break;
      case 2:
        this.enableViewVisualHint = true;
        break;
      case 3:
        this.enableViewEnglish = true;
        break;
    }
  }

  checkItemAsCompleted() {
    this.onCheckItem.emit({ item: this.item });
  }
}
