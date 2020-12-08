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
      input: 'Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”).',
      outputs: [
        'If you buy, get, license, rent or subscribe to content, Apps and other in-app services in the Apple Online Store (or a third party online store using the in-app purchase API), this agreement governs your use of Apple’s services.',
        'Content may be offered by Apple or a third party. Our Services are available for your use in your country of residence.'
      ]
    },
    {
      input: ' Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). ',
      outputs: ['If you want to sell your shares, you must first offer them to the other shareholders.']
    },
    {
      input: '  3 Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). ',
      outputs: [
        'If you want to sell your shares, you must first offer them to the other shareholders.',
        'If you want to sell your shares, you must first offer them to the other shareholders.',
        'If you want to sell your shares, you must first offer them to the other shareholders.'
      ]
    },
    {
      input: ' 3 Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). ',
      outputs: ['If you want to sell your shares, you must first offer them to the other shareholders.']
    },
    {
      input: ' Each Shareholder(an “Oferor”) proposing to Transfer any oral of the Shares then owned by such Oferor (the “Transfer Shares”) to any third party (the “Oferee”), such Oferor shall first offer Transfer Shares to the other Shareholders (“RemainingShareholders”). ',
      outputs: [
        'If you want to sell your shares, you must first offer them to the other shareholders.',
        'If you want to sell your shares, you must first offer them to the other shareholders.',
        'If you want to sell your shares, you must first offer them to the other shareholders.'
      ]
    },
  ];

  public disabled: boolean = false;

  public config: SwiperOptions = {
    a11y: { enabled: true },
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
    autoplay: false,
    spaceBetween: 30,
  };

  constructor() { }

  ngOnInit() {
  }

}
