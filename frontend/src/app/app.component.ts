import { Component, OnInit } from '@angular/core';
import { CommonService, Theme, THEMES } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedTheme: Theme;

  constructor(private commonservice: CommonService) {}

  ngOnInit() {
    this.commonservice.state$.subscribe(() => {
      if (this.commonservice.selectedTheme) {
        this.selectedTheme = this.commonservice.selectedTheme;
      } else {
        this.selectedTheme = THEMES[0];
      }
    });
  }
}
