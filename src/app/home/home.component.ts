import { Component } from "@angular/core";
import { Page } from "@nativescript/core";
import { isAndroid } from "@nativescript/core/platform";
import { Application } from "@nativescript/core";

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {

  darkMode: boolean;

  constructor(private page: Page) {
    // Hide the action bar on this page
    this.page.actionBarHidden = true;
    this.detectDarkMode()
  }

  detectDarkMode() {
    if (isAndroid) {

      const context = Application.android.context;
      const nightModeFlags =
        context.getResources().getConfiguration().uiMode &
        android.content.res.Configuration.UI_MODE_NIGHT_MASK;
      this.darkMode =
        nightModeFlags === android.content.res.Configuration.UI_MODE_NIGHT_YES;

    }
  }
}
