import { Component, Input } from "@angular/core";
import { isAndroid } from "@nativescript/core/platform";
import { Page, confirm } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "ns-action-bar",
  templateUrl: "./action-bar.component.html",
  styleUrls: ["./action-bar.component.css"],
})
export class ActionBarComponent {
  @Input()
  title = "";

  @Input()
  showBackButton = true;

  @Input()
  askToConfirmOnBackPress = false;

  backBtnColor = "#000000";

  constructor(private page: Page, private routerExtensions: RouterExtensions) { }

  goBack() {
    if (this.askToConfirmOnBackPress) {
      confirm({
        title: 'Confirm Exit',
        message: 'Are you sure you want to leave this page?',
        okButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result) {
          this.routerExtensions.backToPreviousPage();
        }
      });
    } else {
      this.routerExtensions.backToPreviousPage();
    }
  }

  onActionBarLoadedLoaded() {
    if (isAndroid) {
      // let androidToolbar = this.page.actionBar.nativeView;
      // androidToolbar
      //   .getNavigationIcon()
      //   .setColorFilter(
      //     android.graphics.Color.parseColor(this.backBtnColor),
      //     (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
      //   );
    }
  }
}
