import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { GroceryItem } from "~/app/models/grocery-item.model";
import { ItemService } from "~/app/services/item.service";

@Component({
  selector: "ns-grocery-list",
  templateUrl: "./grocery-list.component.html",
  styleUrls: ["./grocery-list.component.css"],
})
export class GroceryListComponent implements OnInit, AfterContentChecked {
  items: Array<GroceryItem>;

  constructor(private itemService: ItemService) {}
  
  ngOnInit(): void {
    this.items = this.itemService.getGroceryItemsFromStorage();
  }
  
  ngAfterContentChecked(): void {
    // on back clicked doesnt re-init page, so thi is needed
    this.items = this.itemService.getGroceryItemsFromStorage();
  }
}
