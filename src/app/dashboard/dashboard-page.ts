import { UserService } from '@/app/shared/services/user-service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { from, map, tap } from 'rxjs';
import { collection, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard-page',
  imports: [Navbar, RouterOutlet],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage implements OnInit {
  protected readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly firestore = inject(Firestore);
  private currentUser = this.userService.currentUser();

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const userRef = doc(this.firestore, 'user', this.currentUser!.id);
    from(getDoc(userRef)).subscribe({
      next: (user) => {
        console.log('User ', user.data());
      },
      error: (err) => {
        console.error('Error to get user: ', err);
      },
    });
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }

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
