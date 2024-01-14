import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "ns-study-complete",
  templateUrl: "./study-complete.component.html",
  styleUrls: ["./study-complete.component.css"],
})
export class StudyCompleteComponent {
  maxScore: number;
  totalScore: number;

  constructor(route: ActivatedRoute) {
    this.maxScore = +route.snapshot.params.maxScore;
    this.totalScore = +route.snapshot.params.totalScore;
  }
}
