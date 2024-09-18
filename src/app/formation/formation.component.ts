import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../formation.service';
import { Formation } from '../models/formation.model';



@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  currentFormation: Formation | null = null;
  formations: Formation[] = [];
  isSidebarCollapsed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationService
  ) {}

  onSidebarToggle(collapsed: boolean): void {
    this.isSidebarCollapsed = collapsed;
  }

  ngOnInit(): void {
    this.formationService.getAllFormations().subscribe(
      (formations) => {
        this.formations = formations;

        // Get the formation ID from route parameters
        this.route.paramMap.subscribe(params => {
          const formationId = Number(params.get('id'));

          if (!isNaN(formationId)) {
            this.currentFormation = this.formations.find(f => f.id === formationId) || null;
            if (!this.currentFormation) {
              console.warn('Formation not found for ID:', formationId);
            }
          } else {
            console.warn('Invalid formation ID:', params.get('id'));
            this.currentFormation = null;
          }
        });
      },
      (error) => {
        console.error('Error fetching formations:', error);
      }
    );
  }
}
