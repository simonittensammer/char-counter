import {Component, HostListener} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-img-count',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './img-count.component.html',
  styleUrl: './img-count.component.css'
})
export class ImgCountComponent {
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
  currentImage: string = '';
  previousImages: string[] = [];
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
    this.updateImage();
    this.initInterval();
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
    this.previousImages.unshift(this.currentImage);
    if (this.previousImages.length > 4) {
      this.previousImages.pop();
    }
    this.spacePressed = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.handleClick();
    }
  }

  checkImageMatch() {
    if (this.previousImages.length >= 3) {
      if (this.previousImages[2] === this.currentImage) {
        this.score++;
      } else {
        this.wrongClicks++;
      }
    } else {
      this.wrongClicks++;
    }
  }

  checkMissedOpportunity() {
    if (this.previousImages.length >= 3) {
      if (this.previousImages[2] === this.currentImage && !this.spacePressed) {
        this.missed++;
      }
    }
  }

  handleClick() {
    this.spacePressed = true;
    this.checkImageMatch();
  }
}
