import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamplesService } from 'src/app/services/examples.service';
import { Autoplay, SwiperOptions } from 'swiper';
import { ScrollbarOptions } from 'swiper/types/components/scrollbar';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  slides = [];

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

  constructor(private examplesService: ExamplesService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.examplesService.getExamples().subscribe(result => {
      if (result.success) {
        this.slides = result.data;
      }
    }, error => {
      this.snackBar.open(error.error.data, 'Dismiss', {
        duration: 3000
      });
    });
  }
}
