import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DialogService } from 'primeng/dynamicdialog';
import { Establishment, Survey } from '@/app/core/models';
import { EstablishmentService } from '@/app/core/services/establishment.service';
import { UserService } from '@/app/shared/services/user-service';
import { Questions } from '@/app/dashboard/pages/questions/questions';
import { SurveyService } from '@/app/core/services/survey.service';

@Component({
  selector: 'app-surveys-page',
  imports: [SelectModule, FormsModule, ButtonModule],
  templateUrl: './surveys-page.html',
  styleUrl: './surveys-page.css',
  providers: [DialogService],
})
export class SurveysPage implements OnInit {
  private readonly dialogService = inject(DialogService);
  private readonly userService = inject(UserService);
  private readonly currentUser = this.userService.currentUser();
  private readonly establishmentService = inject(EstablishmentService);
  private readonly surveyService = inject(SurveyService);
  public establishmentsList: Establishment[] = [];
  public selectedEstablishment: Establishment | undefined = undefined;
  public surveysList: Survey[] = [];

  ngOnInit(): void {
    this.getEstablishments();
  }

  getEstablishments() {
    this.establishmentService.getByOwnerId(this.currentUser!.id).subscribe({
      next: (establishments) => {
        console.log('Establecimientos ', establishments);
        this.establishmentsList = establishments;
      },
    });
  }

  onCreateSurvey() {
    console.log('Establecimiento seleccionado ', this.selectedEstablishment);
    this.dialogService
      .open(Questions, {
        header: 'Crear encuesta',
        inputValues: {
          establishment: this.selectedEstablishment,
        },
      })!
      .onClose.subscribe((survey) => {
        console.log('Dialog closed: ', survey);
        this.surveysList.push(survey);
      });
  }

  getSurveysByEstablishment() {
    if (!this.selectedEstablishment) {
      return;
    }

    this.surveyService.getByEstablishmentId(this.selectedEstablishment.id).subscribe({
      next: (surveys) => {
        console.log('Encuestas ', surveys);
        this.surveysList = surveys;
      },
    });
  }
}
