import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class RefreshService {

	public refresh: EventEmitter<any>;
  constructor() {
  	this.refresh = new EventEmitter();
  }

  public doRefresh() {
  	this.refresh.emit(true);
  }
}
