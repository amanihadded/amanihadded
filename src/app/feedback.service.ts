import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from './models/feedback.model'; // Adjust the import path

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:9093/feedback'; // Hardcoded API URL

  constructor(private http: HttpClient) { }

  // Add a new feedback
  addFeedback(feedback: Feedback): Observable<Feedback> {
     
    return this.http.post<Feedback>(`${this.apiUrl}/addFeedback`, feedback);
  }

  // Delete feedback by ID
  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteFeedback/${id}`);
  }

  // Get feedback by ID
  getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/getFeedbackById/${id}`);
  }

  // Get all feedbacks
  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/getAllFeedbacks`);
  }

  // Get feedbacks by user ID
  getFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/getFeedbacksByUserId/${userId}`);
  }
}
