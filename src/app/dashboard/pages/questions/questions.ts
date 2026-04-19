import { Component, inject, input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Establishment } from '@/app/core/models';
import { SurveyService } from '@/app/core/services/survey.service';
import { UserService } from '@/app/shared/services/user-service';

@Component({
  selector: 'app-questions',
  imports: [],
  templateUrl: './questions.html',
  styleUrl: './questions.css',
  providers: [DialogService],
})
export class Questions {
  private readonly surveyService = inject(SurveyService);
  private readonly userService = inject(UserService);
  private readonly dialogRef = inject(DynamicDialogRef);
  establishment = input<Establishment>();

  onSaveQuestion() {
    const questionToSave = {
      question: 'Que tal?',
      stars: {
        1: {
          message: 'Message 1',
          cta: {
            label: 'Send WhatsApp',
            url: 'https://wa.me/+1987654321?text=hello',
          },
        },
        2: {
          message: 'Message 2',
          cta: {
            label: 'Ir a WhatsApp',
            url: 'https://wa.me/+1987654321?text=hello',
          },
        },
        3: {
          message: 'Message 3',
          cta: {
            label: 'Ir a WhatsApp',
            url: 'https://wa.me/+1987654321?text=hello',
          },
        },
        4: {
          message: 'Message 4',
          cta: {
            label: 'Ir a Google Maps',
            url: 'https://search.google.com/local/writereview?placeid=ChIJW2dHOC_JBZER-iwrjknZ-Uk',
          },
        },
        5: {
          message: 'Message 5',
          cta: {
            label: 'Ir a Google Maps',
            url: 'https://search.google.com/local/writereview?placeid=ChIJW2dHOC_JBZER-iwrjknZ-Uk',
          },
        },
      },
    };

    this.surveyService
      .create({
        ...questionToSave,
        id: '',
        ownerId: this.userService.currentUser()!.id,
        establishmentId: this.establishment()!.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      })
      .subscribe({
        next: (res) => {
          this.dialogRef.close({
            ...questionToSave,
            id: res.id,
          });
        },
      });
  }
}
