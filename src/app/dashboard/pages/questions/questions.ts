import { Component, inject } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, tap } from 'rxjs';

@Component({
  selector: 'app-questions',
  imports: [],
  templateUrl: './questions.html',
  styleUrl: './questions.css',
})
export class Questions {
  private readonly firestore = inject(Firestore);

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

    const newQuestionRef = doc(collection(this.firestore, 'question'));
    // const newStoreRef = doc(this.firestore, 'question', this.userService.currentUser()!.id);
    console.log('newQuestionRef ', newQuestionRef);
    return from(setDoc(newQuestionRef, questionToSave)).pipe(
      tap((res) => {
        // this.saveLocalData(player);
        console.log('Res => ', res);
      }),
    );
  }
}
