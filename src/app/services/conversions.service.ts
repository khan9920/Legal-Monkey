import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversionsService {

  private recentConversions = [
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    }
  ]

  private allConversions = [
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
    {
      _id: 'LM-003',
      title: 'Ralph Warden Contract',
      date: '23-03-2020',
      cost: '$ 5.00'
    },
  ]

  constructor() { }

  getRecentConversions() {
    return this.recentConversions;
  }

  getAllConversions() {
    return this.recentConversions.concat(this.allConversions);
  }
}
