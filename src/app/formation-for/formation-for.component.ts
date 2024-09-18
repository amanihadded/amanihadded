import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../formation.service';
import { Formation } from '../models/formation.model';

@Component({
  selector: 'app-formation-for',
  templateUrl: './formation-for.component.html',
  styleUrls: ['./formation-for.component.css']
})
export class FormationForComponent implements OnInit {
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
    // Fetch all formations
    this.formationService.getAllFormations().subscribe(
      (formations) => {
        console.log('Fetched formations:', formations); // Debug log
        this.formations = formations;
  
        // Get the formation ID from route parameters
        this.route.paramMap.subscribe(params => {
          const formationKey = params.get('id');
          console.log('Formation key from route:', formationKey); // Debug log
  
          if (formationKey) {
            const formationId = Number(formationKey); // Convert to number
            console.log('Formation ID:', formationId); // Debug log
  
            if (!isNaN(formationId)) {
              this.currentFormation = this.formations.find(f => f.id === formationId) || null;
              if (!this.currentFormation) {
                console.warn('Formation not found for ID:', formationId);
              }
            } else {
              console.warn('Invalid formation ID:', formationKey);
              this.currentFormation = null;
            }
          } else {
            console.warn('Formation ID is null or undefined');
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
