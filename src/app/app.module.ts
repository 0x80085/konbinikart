import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { ActionBarComponent } from "./action-bar/action-bar.component";
import { AboutComponent } from "./about/about.component";
import { GroceryListEditableComponent } from "./groceries/grocery-list-editable/grocery-list-editable.component";
import { CreateGroceryItemComponent } from "./groceries/grocery-list-editable/create-grocery-item/create-grocery-item.component";
import { EditableGroceryItemComponent } from "./groceries/grocery-list-editable/editable-grocery-item/editable-grocery-item.component";
import { GroceryListTranslatedComponent } from "./groceries/grocery-list-translated/grocery-list-translated.component";
import { GroceryItemTranslatedComponent } from "./groceries/grocery-item-translated/grocery-item-translated.component";
import { GroceryItemDetailComponent } from "./groceries/grocery-item-detail/grocery-item-detail.component";
import { GroceryItemFlashcardComponent } from "./groceries/grocery-item-flashcard/grocery-item-flashcard.component";
import { FlashcardAnswerModalComponent } from "./groceries/grocery-item-flashcard/flashcard-answer-modal/flashcard-answer-modal.component";
import { StudyCompleteComponent } from "./groceries/grocery-item-flashcard/study-complete/study-complete.component";
import { GroceryItemDetailEditableComponent } from "./groceries/grocery-item-detail-editable/grocery-item-detail-editable.component";
import { GroceryListComponent } from "./groceries/grocery-list/grocery-list.component";
import { FontIconModule, FontIconService } from 'nativescript-fonticon/angular';
import { knownFolders } from "@nativescript/core";

// FontIconService.debug = true; // --> enable to debug the icon stuff

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule,
    AppRoutingModule,
    NativeScriptFormsModule,
    FontIconModule.forRoot({
      'ion':  knownFolders.currentApp().getFile("./assets/ionicons.css").readTextSync()
    })
  ],
  declarations: [
    AppComponent,
    ActionBarComponent,
    HomeComponent,
    AboutComponent,
    GroceryListComponent,
    GroceryListEditableComponent,
    EditableGroceryItemComponent,
    CreateGroceryItemComponent,
    GroceryItemDetailComponent,
    GroceryItemFlashcardComponent,
    FlashcardAnswerModalComponent,
    StudyCompleteComponent,
    GroceryItemDetailEditableComponent,
    GroceryListTranslatedComponent,
    GroceryItemTranslatedComponent,
    StudyCompleteComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
