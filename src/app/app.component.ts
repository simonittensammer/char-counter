import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

  handleClick() {
    this.spacePressed = true;
    this.checkCharacterMatch();
  }
}
