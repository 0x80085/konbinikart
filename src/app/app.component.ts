import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AndroidActivityBackPressedEventData, Application } from '@nativescript/core';
import { confirm } from '@nativescript/core';
import { filter } from 'rxjs';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  currentRoute: string = ''; // Store the current route


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    // Subscribe to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Store the current route
      this.currentRoute = event.urlAfterRedirects;
    });

    // Android back button listener
    if (Application.android) {
      Application.android.on(
        Application.AndroidApplication.activityBackPressedEvent,
        (data: AndroidActivityBackPressedEventData) => {

          console.log(this.currentRoute);

          // Check if we are on the specific page you want to guard
          if (this.currentRoute === '/study'
            || this.currentRoute === "/groceries-translated"
          ) {  // <-- Change '/your-page' to the actual route
            // Prevent back navigation and show the confirmation dialog
            data.cancel = true;
            this.confirmExit();
          }
        }
      );
    }
  }

  confirmExit(): void {
    confirm({
      title: 'Confirm Exit',
      message: 'Are you sure you want to leave this page?',
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
