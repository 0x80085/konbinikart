import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";

enum Points {
  OneCardMaxScore = 30
}

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

  points: number = Points.OneCardMaxScore;
  totalScore: number = 0;
  maxScore: number = 0;

  constructor(
    private itemService: ItemService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.items = this.itemService.getGroceryItemsFromStorage();
    this.loadItem(this.currentItemIndex);
    this.maxScore = Points.OneCardMaxScore * this.items.length;
  }

  loadItem(index: number) {
    if (this.items && index >= 0 && index < this.items.length) {
      this.currentItemIndex = index;
      this.selectedItem = this.items[this.currentItemIndex];
    }
  }

  showNextItem() {
    this.totalScore += this.points;

    const iscompleted = this.isCompleteSession();

    if (iscompleted) {
      this.routerExtensions.navigate([
        `/study-completed/${this.totalScore}/${this.maxScore}`,
        { score: this.totalScore, max: this.maxScore },
      ]);
      return;
    }

    this.resetToggles();

    this.points = Points.OneCardMaxScore;

    this.loadItem(this.currentItemIndex + 1);
  }

  private isCompleteSession = () =>
    this.currentItemIndex + 1 === this.items.length;

  private resetToggles() {
    this.showEnglish = false;
    this.showRomaji = false;
    this.showHint = false;
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
