import { Component } from '@angular/core';

import { ResourcesDataService } from './resources-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jszip-demo';

  constructor(private _resourcesDataService: ResourcesDataService) {
    console.log(JSON.stringify(this._resourcesDataService.generateResources()));
  }
}
