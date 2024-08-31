import { Component } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular';
import { Screen } from '@nativescript/core/platform';
import { GroceryItem } from '~/app/models/grocery-item.model';

interface ModalData extends GroceryItem {
  score: string;
}

@Component({
  selector: 'ns-flashcard-answer-modal',
  templateUrl: './flashcard-answer-modal.component.html',
  styleUrls: ['./flashcard-answer-modal.component.css']
})
export class FlashcardAnswerModalComponent {

  model: ModalData;
  width: number;

  constructor(private params: ModalDialogParams) {
    this.model = params.context;
    this.width = Screen.mainScreen.widthDIPs * 0.8
  }

  closeModal() {
    this.params.closeCallback();
  }
}
