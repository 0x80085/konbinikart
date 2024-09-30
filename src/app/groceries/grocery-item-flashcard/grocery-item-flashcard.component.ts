import { AfterViewInit, Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogOptions, ModalDialogService, RouterExtensions } from "@nativescript/angular";
import { Page } from "@nativescript/core";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";
import { TTSService } from "~/app/services/tts.service";
import { FlashcardAnswerModalComponent } from "./flashcard-answer-modal/flashcard-answer-modal.component";

enum Points {
  OneCardMaxScore = 30
}

@Component({
  selector: "ns-grocery-item-flashcard",
  templateUrl: "./grocery-item-flashcard.component.html",
  styleUrls: ["./grocery-item-flashcard.component.css"],
})
export class GroceryItemFlashcardComponent implements OnInit, AfterViewInit {
  selectedItem: GroceryItem;
  items: GroceryItem[];
  currentItemIndex: number = 0;

  showEnglish: boolean = false;
  showRomaji: boolean = false;
  showHint: boolean = false;

  earnablePointsForCurrentCard: number = Points.OneCardMaxScore;
  totalScore: number = 0;
  maxScore: number = 0;

  constructor(
    private itemService: ItemService,
    private ttsService: TTSService,
    private routerExtensions: RouterExtensions,
    private page: Page,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.resetSession();
  }

  ngAfterViewInit(): void {
    this.page.on(Page.navigatedToEvent, (data) => {
      this.resetSession();
    });
  }

  resetSession() {
    this.resetToggles();
    this.currentItemIndex = 0;
    this.maxScore = 0;
    this.selectedItem = undefined;
    this.totalScore = 0;
    this.earnablePointsForCurrentCard = Points.OneCardMaxScore;

    const itemsInStorage = this.itemService.getGroceryItemsFromStorage();
    const shuffledItems = this.shuffle(itemsInStorage);
    this.items = shuffledItems;

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
    if (this.items.length === 0) {
      return
    }

    this.totalScore += this.earnablePointsForCurrentCard;

    if (this.isSessionComplete()) {
      this.routerExtensions.navigate([
        `/study-completed/${this.totalScore}/${this.maxScore}`,
        { score: this.totalScore, max: this.maxScore },
      ]);
      return;
    }

    this.resetToggles();

    this.earnablePointsForCurrentCard = Points.OneCardMaxScore;

    this.loadItem(this.currentItemIndex + 1);
  }

  openAnswerModal() {
    if (this.earnablePointsForCurrentCard === 10) {
      this.deductPoints(10)
    }

    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: { ...this.selectedItem, score: `${this.earnablePointsForCurrentCard}/${Points.OneCardMaxScore}` },
      fullscreen: false
    };

    this.modalService.showModal(FlashcardAnswerModalComponent, options).then(result => {
      setTimeout(() =>
        this.showNextItem(), 10);
    });
  }

  speakTTSInJapanese() {
    this.ttsService.speakJapanese(this.selectedItem.nameHiragana);
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

  toggleEnglish() {
    if (!this.showEnglish) {
      this.showEnglish = !this.showEnglish;
      this.deductPoints(10);
    }
  }

  private isSessionComplete = () =>
    this.currentItemIndex + 1 === this.items.length;

  private resetToggles() {
    this.showEnglish = false;
    this.showRomaji = false;
    this.showHint = false;
  }

  private shuffle(array: GroceryItem[]): GroceryItem[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  private deductPoints(amount: number) {
    this.earnablePointsForCurrentCard -= amount;
  }
}
