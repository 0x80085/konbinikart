import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { GroceryListEditableComponent } from "./groceries/grocery-list-editable/grocery-list-editable.component";
import { GroceryListTranslatedComponent } from "./groceries/grocery-list-translated/grocery-list-translated.component";
import { GroceryItemDetailComponent } from "./groceries/grocery-item-detail/grocery-item-detail.component";
import { GroceryItemDetailEditableComponent } from "./groceries/grocery-item-detail-editable/grocery-item-detail-editable.component";
import { GroceryListComponent } from "./groceries/grocery-list/grocery-list.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HomeComponent,
    GroceryListComponent,
    GroceryListEditableComponent,
    GroceryItemDetailComponent,
    GroceryItemDetailEditableComponent,
    GroceryListTranslatedComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
