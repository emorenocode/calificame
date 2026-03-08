import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Starts } from './starts/starts';
import { RateService } from '@/app/rate/rate-service';

@Component({
  selector: 'app-rate-page',
  imports: [Starts],
  templateUrl: './rate-page.html',
  styleUrl: './rate-page.css',
})
export class RatePage implements OnInit {
  clientId = input.required<string>();
  question = signal('');
  startSelected = signal<number | null>(null);
  message = signal('');
  messages = signal<any>(null);
  btnCTA = signal<{ label: string; url: string }>({ label: '', url: '' });
  private readonly rateService = inject(RateService);

  constructor() {}

  ngOnInit(): void {
    this.getClientConfig();
  }

  goTo(url: string) {
    window.open(url);
  }

  getClientConfig() {
    this.rateService.getClientConfig(this.clientId()).subscribe({
      next: (client) => {
        this.question.set(client.question);
        this.messages.set(client.stars);
      },
    });
  }

  onStartSelected(start: number) {
    if (this.startSelected() === start) return;
    console.log({ start });

    const currentMessage = this.messages()[start];
    this.startSelected.set(start);
    this.message.set(currentMessage.message);
    this.btnCTA.set(currentMessage.cta);
    this.sendReview();
  }

  private sendReview() {
    console.log({
      review: this.startSelected(),
    });
  }
}
