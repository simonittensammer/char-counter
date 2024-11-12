import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-char-sort',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './char-sort.component.html',
  styleUrl: './char-sort.component.css'
})
export class CharSortComponent {
  word: string = 'ANGULAR';
  shuffledWord: string[] = [];
  selectedLetters: string[] = [];

  constructor() {
    this.shuffleWord();
  }

  shuffleWord() {
    // Shuffle the word to create a shuffled array of letters
    this.shuffledWord = this.word.split('').sort(() => Math.random() - 0.5);
  }

  selectLetter(letter: string, index: number) {
    // Add the letter to the selected list
    this.selectedLetters.push(letter);
    // Remove the selected letter from the shuffledWord
    this.shuffledWord.splice(index, 1);
  }

  resetGame() {
    this.selectedLetters = [];
    this.shuffleWord();
  }

  isCorrectOrder(): boolean {
    return this.selectedLetters.join('') === this.word;
  }
}
