import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slides = [
    {
      input: ' Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). ',
      output: ' If you want to sell your shares, you must first offer them to the other shareholders.'
    },
    {
      input: ' Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). ',
      output: ' If you want to sell your shares, you must first offer them to the other shareholders.'
    },
    {
      input: '  3 Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). ',
      output: ' If you want to sell your shares, you must first offer them to the other shareholders.'
    },
    {
      input: ' 3 Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). ',
      output: ' If you want to sell your shares, you must first offer them to the other shareholders.'
    },
    {
      input: ' Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). ',
      output: ' If you want to sell your shares, you must first offer them to the other shareholders.'
    },
  ];
}
