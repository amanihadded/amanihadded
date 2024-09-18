import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormateurService } from '../formateur.service';
import { ProjectService } from '../project.service';
import { FormationService } from '../formation.service';
import {FeedbackService } from '../feedback.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarCollapsed = false;

  numberOfProjects: number = 0;
  numberOfTrainers: number = 0;
  numberOfUsers: number = 0;
  numberOfFormations: number = 0;
  totalBudget: number = 0;
  numberOfComments: number = 0;

  constructor(
    private userService: UserService,
    private formateurService: FormateurService,
    private projetService: ProjectService,
    private formationService: FormationService,
    private commentaireService: FeedbackService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  onSidebarToggle(isCollapsed: boolean) {
    this.isSidebarCollapsed = isCollapsed;
  }

  getDashboardData() {
    this.userService.getAllUsers().subscribe(users => {
      this.numberOfUsers = users.length;
    });

    this.formateurService.getAllFormateur().subscribe(formateurs => {
      this.numberOfTrainers = formateurs.length;
    });

    this.projetService.getAllProjects().subscribe(projects => {
      this.numberOfProjects = projects.length;
    });

    this.formationService.getAllFormations().subscribe(formations => {
      this.numberOfFormations = formations.length;
    });

    this.commentaireService.getAllFeedbacks().subscribe(comments => {
      this.numberOfComments = comments.length;
    });

    this.paymentService.getAllPayments().subscribe(payments => {
      this.totalBudget = payments.reduce((sum, payment) => sum + parseFloat(payment.price), 0);
    });
  }
}
