import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { RefreshService } from './refresh.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	ifButtonRefresh: boolean = false;
  
  constructor(private router: Router, private refreshService: RefreshService) {
  	router.events.subscribe(event => {
	    if(event instanceof NavigationStart) {
	    	if (event.url == "/cadastro") {
	    		this.ifButtonRefresh = false;
	    	}
	    	else if (event.url == "/operacoes") {
	    		this.ifButtonRefresh = true;
	    	}
	    }
	  });
  }

  refresh() {
  	this.refreshService.doRefresh();
  }
}
