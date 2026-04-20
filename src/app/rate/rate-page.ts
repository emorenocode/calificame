import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from '@/app/core/services/survey.service';
import { ResponseService } from '@/app/core/services/response.service';
import { Survey } from '@/app/core/models';
import { Starts } from './starts/starts';

@Component({
  selector: 'app-rate-page',
  imports: [Starts, ReactiveFormsModule],
  templateUrl: './rate-page.html',
  styleUrl: './rate-page.css',
})
export class RatePage implements OnInit {
  public readonly isLoading = signal(true);
  public readonly isSubmitted = signal(false);
  public readonly formTxt = new FormControl(null, Validators.required);
  public readonly surveyId = input.required<string>();
  public readonly question = signal('');
  public readonly startSelected = signal<number | null>(null);
  public readonly message = signal('');
  public readonly messages = signal<any>(null);
  public readonly btnCTA = signal<{ label: string; url: string }>({ label: '', url: '' });
  private readonly router = inject(Router);
  private readonly surveyService = inject(SurveyService);
  private readonly responseService = inject(ResponseService);
  private currentSurvey!: Survey;

  constructor() {}

  ngOnInit(): void {
    this.getSurvey();
  }

  getSurvey() {
    this.surveyService.getById(this.surveyId()).subscribe({
      next: (survey) => {
        console.log('Survey => ', survey);
        if (!survey) {
          this.router.navigate(['/']);
          return;
        }
        this.question.set(survey.question);
        this.messages.set(survey.stars);
        this.currentSurvey = survey;
        this.isLoading.set(false);
        this.sendScandalyticsEvent();
      },
    });
  }

  sendScandalyticsEvent() {
    this.surveyService.sendScandalyticsEvent(this.surveyId()).subscribe();
  }

  goTo(url: string) {
    const start = this.startSelected();

    if (start && start < 4 && this.formTxt.invalid) {
      this.formTxt.markAsTouched();
      return;
    }

    url = this.validateWhatsAppText(url);

    this.responseService
      .submit({
        surveyId: this.currentSurvey.id,
        establishmentId: this.currentSurvey.establishmentId,
        rating: this.startSelected()!,
        comment: this.formTxt.value || '',
        resolved: false,
      })
      .subscribe({
        next: (res) => {
          console.log('Res => ', res);
          window.open(url);
          this.isSubmitted.set(true);
        },
      });
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

  onStartSelected(start: number) {
    if (this.startSelected() === start) return;

    const currentMessage = this.messages()[start];
    this.startSelected.set(start);
    this.message.set(currentMessage.message);
    this.btnCTA.set(currentMessage.cta);
  }
}
