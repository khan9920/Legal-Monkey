import { Injectable } from '@angular/core';
import * as mixpanel from 'mixpanel-browser';

@Injectable({
  providedIn: 'root'
})
export class MixpanelServiceService {

  constructor() { }

  /**
   * Initialize mixpanel.
   *
   * @param {string} token
   * @memberof MixpanelService
   */
  init(): void {
    const token = localStorage.getItem('token');

    mixpanel.init('42520216f88cf9cc498a5558a8e4cb56');
    mixpanel.identify(token);
  }

  /**
   * Push new action to mixpanel.
   *
   * @param {string} id Name of the action to track.
   * @param {*} [action={}] Actions object with custom properties.
   * @memberof MixpanelService
   */
  track(id: string, action: any = {}): void {
    mixpanel.track(id, action);
  }
}