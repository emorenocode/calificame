import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Starts } from './starts/starts';
import { RateService } from '@/app/rate/rate-service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate-page',
  imports: [Starts, ReactiveFormsModule],
  templateUrl: './rate-page.html',
  styleUrl: './rate-page.css',
})
export class RatePage implements OnInit {
  public readonly formTxt = new FormControl(null, Validators.required);
  public readonly clientId = input.required<string>();
  public readonly question = signal('');
  public readonly startSelected = signal<number | null>(null);
  public readonly message = signal('');
  public readonly messages = signal<any>(null);
  public readonly btnCTA = signal<{ label: string; url: string }>({ label: '', url: '' });
  private readonly rateService = inject(RateService);

  constructor() {}

  ngOnInit(): void {
    this.getClientConfig();
  }

  goTo(url: string) {
    const start = this.startSelected();

    if (start && start < 4 && this.formTxt.invalid) {
      this.formTxt.markAsTouched();
      return;
    }

    url = this.validateWhatsAppText(url);

    window.open(url);
  }

  validateWhatsAppText(url: string): string {
    const currentUrl = new URL(url);
    const isWhatsApp = currentUrl.origin.includes('https://wa.me');

    if (isWhatsApp) {
      const txtValue = this.formTxt.value;
      url = `${currentUrl.origin}${currentUrl.pathname}?text=${txtValue}`;
    }

    return url;
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

    const currentMessage = this.messages()[start];
    this.startSelected.set(start);
    this.message.set(currentMessage.message);
    this.btnCTA.set(currentMessage.cta);
    this.sendReview();
  }

  private sendReview() {
    setTimeout(() => {
      console.log({
        review: this.startSelected(),
        createdAt: new Date(),
        cta: this.btnCTA().url,
      });
    }, 1000);
  }
}
