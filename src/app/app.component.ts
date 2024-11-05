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

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.updateCharacter();
    setInterval(() => {
      this.checkMissedOpportunity();
      this.updateCharacter();
    }, 1000);
  }

  updateCharacter() {
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
      this.spacePressed = true;
      this.checkCharacterMatch();
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
}
