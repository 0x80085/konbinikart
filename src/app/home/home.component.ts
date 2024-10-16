import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Page } from "@nativescript/core";
import { GroceryItem } from "../models/grocery-item.model";
import { GroceryListService } from "../services/items/grocery-list.service";
import { DarkModeShimService } from "../services/device/dark-mode-shim.service";

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
    private groceryListService: GroceryListService,
    private darkModeShimService: DarkModeShimService) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.darkMode = this.darkModeShimService.getMode()
    
    this.loadItems();
  }

  private loadItems() {
    this.items = this.groceryListService.getAll();
  }

  ngAfterViewInit(): void {
    this.page.on(Page.navigatedToEvent, (data) => {
      this.loadItems();
    });
  }
}
