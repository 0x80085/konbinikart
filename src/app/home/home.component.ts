import { Component } from "@angular/core";
import { Page } from "@nativescript/core";
import { GroceryItem } from "../models/grocery-item.model";
import { ItemService } from "../services/item.service";

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  darkMode: boolean;
  items: GroceryItem[];

  constructor(
    private page: Page,
    private itemService: ItemService
  ) {
    // Hide the action bar on this page
    this.page.actionBarHidden = true;
    this.items = this.itemService.getGroceryItemsFromStorage();

    // this.detectDarkMode();
  }

  // detectDarkMode() {
  //   if (isAndroid) {
  //     const context = Utils.android.getApplicationContext();
  //     // const context = Application.android.context;
  //     const nightModeFlags =
  //       context.getResources().getConfiguration().uiMode &
  //       android.content.res.Configuration.UI_MODE_NIGHT_MASK;
  //     this.darkMode =
  //       nightModeFlags === android.content.res.Configuration.UI_MODE_NIGHT_YES;
  //   }
  // }

  cancelEventPropagation($event){
    console.log($event);
    
    $event.stopPropagation();
    return false;
  }
}
