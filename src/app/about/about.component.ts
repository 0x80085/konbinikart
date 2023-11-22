import { Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "ns-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent {
  constructor(private routerExtensions: RouterExtensions) {}
  goBack() {
    this.routerExtensions.backToPreviousPage();
  }
}
