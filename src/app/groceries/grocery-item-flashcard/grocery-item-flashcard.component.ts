import { Component, OnInit } from "@angular/core";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";

@Component({
  selector: "ns-grocery-item-flashcard",
  templateUrl: "./grocery-item-flashcard.component.html",
  styleUrls: ["./grocery-item-flashcard.component.css"],
})
export class GroceryItemFlashcardComponent implements OnInit {
  selectedItem: GroceryItem;
  items: GroceryItem[];
  currentItemIndex: number = 0;

  showEnglish: boolean = false;
  showRomaji: boolean = false;
  showHint: boolean = false;
  
  points: number = 100;
  totalScore: number = 0;
  maxScore: number = 0;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items = this.itemService.getGroceryItemsFromStorage();
    this.loadItem(this.currentItemIndex);
    this.maxScore = 100 * this.items.length;
  }

  loadItem(index: number) {
    if (this.items && index >= 0 && index < this.items.length) {
      this.currentItemIndex = index;
      this.selectedItem = this.items[this.currentItemIndex];
    }
  }

  showNextItem() {
    // todo change/remove
    alert(`score total: ${this.totalScore} + ${this.points}`);
    
    // Save current score to totalScore
    this.totalScore += this.points;

    // Reset toggles for English and Romaji
    this.showEnglish = true;
    this.showRomaji = true;

    // Reset points for the next card
    this.points = 100;

    // Load next item
    this.loadItem(this.currentItemIndex + 1);
  }

  showPreviousItem() {
    this.loadItem(this.currentItemIndex - 1);
  }

  toggleEnglish() {
    if (!this.showEnglish) {
      this.showEnglish = !this.showEnglish;
      this.deductPoints(10);
    }
  }

  toggleRomaji() {
    if (!this.showRomaji) {
      this.showRomaji = !this.showRomaji;
      this.deductPoints(10);
    }
  }

  toggleHint() {
    if (!this.showHint) {
      this.showHint = !this.showHint;
      this.deductPoints(10);
    }
  }

  deductPoints(amount: number) {
    this.points -= amount;
  }
}
