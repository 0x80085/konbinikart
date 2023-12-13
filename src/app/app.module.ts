import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { ActionBarComponent } from "./action-bar/action-bar.component";
import { AboutComponent } from "./about/about.component";
import { GroceryListEditableComponent } from "./groceries/grocery-list-editable/grocery-list-editable.component";
import { GroceryListTranslatedComponent } from "./groceries/grocery-list-translated/grocery-list-translated.component";
import { GroceryItemDetailComponent } from "./groceries/grocery-item-detail/grocery-item-detail.component";
import { GroceryItemFlashcardComponent } from "./groceries/grocery-item-flashcard/grocery-item-flashcard.component";
import { StudyCompleteComponent } from "./groceries/grocery-item-flashcard/study-complete/study-complete.component";
import { GroceryItemDetailEditableComponent } from "./groceries/grocery-item-detail-editable/grocery-item-detail-editable.component";
import { GroceryListComponent } from "./groceries/grocery-list/grocery-list.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [
    AppComponent,
    ActionBarComponent,
    HomeComponent,
    AboutComponent,
    GroceryListComponent,
    GroceryListEditableComponent,
    GroceryItemDetailComponent,
    GroceryItemFlashcardComponent,
    StudyCompleteComponent,
    GroceryItemDetailEditableComponent,
    GroceryListTranslatedComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
