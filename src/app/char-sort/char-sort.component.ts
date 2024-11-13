import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-char-sort',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './char-sort.component.html',
  styleUrl: './char-sort.component.css'
})
export class CharSortComponent {
  word: string = '';
  shuffledWord: string[] = [];
  selectedLetters: string[] = [];
  characterCount: number = 5; // Default character count
  showAnswer: boolean = false; // Option to show the correct answer

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchWord();
  }

  fetchWord() {
    const apiUrl = `https://random-word-api.herokuapp.com/word?length=${this.characterCount}&lang=de&number=1`;
    this.http.get<string[]>(apiUrl).subscribe(response => {
      if (response && response.length > 0) {
        this.word = response[0].toUpperCase();
        this.shuffleWord();
        this.showAnswer = false; // Reset showAnswer when fetching a new word
      }
    });
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
    this.showAnswer = false;
  }

  getNewWord() {
    this.selectedLetters = [];
    this.fetchWord();
  }

  isCorrectOrder(): boolean {
    return this.selectedLetters.join('') === this.word;
  }

  getDisplayWord(): string {
    return this.word.split('').map((letter, index) => this.selectedLetters[index] ? this.selectedLetters[index] : '_').join(' ');
  }

  revealAnswer() {
    this.showAnswer = true;
  }
}
