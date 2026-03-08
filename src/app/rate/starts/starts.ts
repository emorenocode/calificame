import { Component, output, signal } from '@angular/core';

@Component({
  selector: 'app-starts',
  imports: [],
  templateUrl: './starts.html',
  styleUrl: './starts.css',
})
export class Starts {
  public selected = output<number>();

  protected starSelected = signal<number>(0);

  selectStar(star: number) {
    this.starSelected.set(star);
    this.selected.emit(star);
  }
}
