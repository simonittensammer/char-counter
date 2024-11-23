import {Component, HostListener} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-char-count',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './char-count.component.html',
  styleUrl: './char-count.component.css'
})
export class CharCountComponent {
  characters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  currentCharacter: string = '';
  previousCharacters: string[] = [];
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
    this.updateCharacter();
    this.initInterval();
  }

  initInterval() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.hideCharacter();
      setTimeout(() => {
        this.checkMissedOpportunity();
        this.updateCharacter();
      }, this.frequency * 250);
    }, this.frequency * 1000);
  }

  hideCharacter() {
    this.isHidden = true;
  }

  updateCharacter() {
    this.isHidden = false;

    const randomIndex = Math.floor(Math.random() * this.characters.length);
    this.currentCharacter = this.characters[randomIndex];
    this.previousCharacters.unshift(this.currentCharacter);
    if (this.previousCharacters.length > 4) {
      this.previousCharacters.pop();
    }
    this.spacePressed = false;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.handleClick();
    }
  }

  checkCharacterMatch() {
    if (this.previousCharacters.length >= 4) {
      if (this.previousCharacters[3] === this.currentCharacter) {
        this.score++;
      } else {
        this.wrongClicks++;
      }
    } else {
      this.wrongClicks++;
    }
  }

  checkMissedOpportunity() {
    if (this.previousCharacters.length >= 4) {
      if (this.previousCharacters[3] === this.currentCharacter && !this.spacePressed) {
        this.missed++;
      }
    }
  }

  onGameClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'INPUT' && target.tagName !== 'BUTTON') {
      this.handleClick();
    }
  }

  handleClick() {
    this.spacePressed = true;
    this.checkCharacterMatch();
  }
}
