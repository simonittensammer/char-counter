import {Component, HostListener, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-same-img',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './same-img.component.html',
  styleUrl: './same-img.component.css'
})
export class SameImgComponent implements OnInit{
  images: string[] = [
    'assets/img-count/1.jpg',
    'assets/img-count/2.jpg',
    'assets/img-count/3.jpg',
    'assets/img-count/4.jpg',
    'assets/img-count/5.jpg',
    'assets/img-count/6.jpg',
    'assets/img-count/7.jpg',
    'assets/img-count/8.jpg',
    'assets/img-count/9.jpg',
    'assets/img-count/10.jpg',
    'assets/img-count/11.jpg',
    'assets/img-count/12.jpg',
    'assets/img-count/13.jpg',
    'assets/img-count/14.jpg'
  ];
  topImages: string[] = [];
  currentImage: string = '';
  score: number = 0;
  missed: number = 0;
  wrongClicks: number = 0;
  spacePressed: boolean = false;
  frequency: number = 1;
  interval: any;
  isHidden: boolean = false;

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.generateNewImages();
    this.updateImage();
    this.initInterval();
  }

  generateNewImages() {
    this.topImages = [];
    while (this.topImages.length < 4) {
      const randomIndex = Math.floor(Math.random() * this.images.length);
      const randomImage = this.images[randomIndex];
      if (!this.topImages.includes(randomImage)) {
        this.topImages.push(randomImage);
      }
    }
  }

  initInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.hideImage();
      setTimeout(() => {
        this.checkMissedOpportunity();
        this.updateImage();
      }, this.frequency * 250);
    }, this.frequency * 1000);
  }

  hideImage() {
    this.isHidden = true;
  }

  updateImage() {
    this.isHidden = false;

    const randomIndex = Math.floor(Math.random() * this.images.length);
    this.currentImage = this.images[randomIndex];
    this.spacePressed = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.handleClick();
    }
  }

  checkImageMatch() {
    if (this.topImages.includes(this.currentImage)) {
      this.score++;
    } else {
      this.wrongClicks++;
    }
  }

  checkMissedOpportunity() {
    if (this.topImages.includes(this.currentImage) && !this.spacePressed) {
      this.missed++;
    }
  }

  handleClick() {
    this.spacePressed = true;
    this.checkImageMatch();
  }
}
