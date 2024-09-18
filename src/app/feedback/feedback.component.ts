import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FeedbackService } from '../feedback.service';
import { Feedback } from '../models/feedback.model';
import { User } from '../models/user.model'; // Import du modèle User
import { AuthUserService } from '../auth-user-service.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  comments: Feedback[] = [];
  user: any; // Remplacez 'any' par le type approprié si vous en avez un

  constructor(private feedbackService: FeedbackService, private authUserService :AuthUserService) { 
    
  }

  ngOnInit(): void {
    this.user = this.authUserService.getCurrentUser(); 
    this.loadFeedbacks();
    
  }

  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  // Charger les commentaires depuis l'API
  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe(
      (feedbacks: Feedback[]) => {
        this.comments = feedbacks;
      },
      error => {
        console.error('Erreur lors du chargement des feedbacks:', error);
      }
    );
  }

  submitComment(form: NgForm) {
    if (form.valid) {
      const newFeedback: Feedback = {
        content: form.value.commentText, // Assurez-vous que `commentText` correspond au nom du champ de texte
        user: this.user
      };
  
      console.log('Submitting comment:', newFeedback);
  
      this.feedbackService.addFeedback(newFeedback).subscribe(
        (feedback: Feedback) => {
          console.log('Comment submitted successfully:', feedback);
  
          // Ajouter le commentaire soumis à la liste des commentaires
          this.comments.push(feedback);
  
          // Réinitialiser le formulaire après soumission
          form.reset();
        },
        error => {
          console.error('Error submitting comment:', error);
        }
      );
    } else {
      console.warn('Form is not valid');
    }
  }
  

}
