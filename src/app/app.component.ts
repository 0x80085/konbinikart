import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AndroidActivityBackPressedEventData, Application } from '@nativescript/core';
import { confirm } from '@nativescript/core';
import { filter } from 'rxjs';
import { DarkModeShimService } from './services/device/dark-mode-shim.service';

export interface CanDeactivateComponent {
  shouldConfirmBack(): boolean;
}

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  currentRoute: string = ''; // Store the current route

  private darkMode: string;
  get isDarkMode(): boolean {
    return this.darkMode && this.darkMode.toLowerCase() === 'dark mode'
  }

  constructor(private router: Router, private darkModeShimService: DarkModeShimService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.darkMode = this.darkModeShimService.getMode()
    // Subscribe to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Store the current route
      this.currentRoute = event.urlAfterRedirects;
    });

    // Android back button listener
    if (Application.android) {
      this.changeStatusBarColor(this.darkMode ? '#000000' : "#FFFFFF");

      Application.android.on(
        Application.AndroidApplication.activityBackPressedEvent,
        (data: AndroidActivityBackPressedEventData) => {
          const outlet = this.router.routerState.root.firstChild;
          const activeComponent = outlet?.component;

          if (
            activeComponent &&
            'shouldConfirmBack' in activeComponent &&
            (activeComponent as CanDeactivateComponent).shouldConfirmBack()
          ) {
            // Prevent back navigation and show the confirmation dialog
            data.cancel = true;
            this.confirmExit();
          }
        }
      );
    }
  }

  private changeStatusBarColor(color: string) {
    const activity = Application.android.startActivity || Application.android.foregroundActivity;
    const colorAsNumber = android.graphics.Color.parseColor(color);
    activity.getWindow().setStatusBarColor(colorAsNumber);
  }

  confirmExit(): void {
    confirm({
      title: 'Confirm Exit',
      message: 'You will lose progress when you navigate away from this page. Are you sure you want to leave this page?',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result) {
        // If confirmed, go back
        this.router.navigate(['..']); // Adjust this based on your route handling
      }
    });
  }
}
