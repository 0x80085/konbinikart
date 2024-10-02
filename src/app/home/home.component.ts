import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Page, Utils } from "@nativescript/core";
import { GroceryItem } from "../models/grocery-item.model";
import { ItemService } from "../services/item.service";
import { DarkModeShimService } from "../services/dark-mode-shim.service";

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements AfterViewInit, OnInit {
  darkMode: string;
  items: GroceryItem[];

  public get isDarkMode(): boolean {
    return this.darkMode && this.darkMode.toLowerCase() === 'dark mode'
  }

  constructor(
    private page: Page,
    private itemService: ItemService,
    private darkModeShimService: DarkModeShimService) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.loadItems();

    this.darkMode = this.darkModeShimService.getMode()
  }

  private loadItems() {
    this.items = this.itemService.getGroceryItemsFromStorage();
  }

  ngAfterViewInit(): void {
    this.page.on(Page.navigatedToEvent, (data) => {
      this.loadItems();
    });
  }
}
