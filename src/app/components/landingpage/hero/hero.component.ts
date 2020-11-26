import { Component, OnInit } from '@angular/core';
import { Autoplay, SwiperOptions } from 'swiper';
import { ScrollbarOptions } from 'swiper/types/components/scrollbar';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  slides = [
    {
      input: 'Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”).',
      output: 'If you want to sell your shares, you must first offer them to the other shareholders.'
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

  public disabled: boolean = false;

  public config: SwiperOptions = {
    a11y: { enabled: true },
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: false,
    pagination: false,
    autoplay: true,
    spaceBetween: 30
  };

  constructor() { }

  ngOnInit() {
  }

}
