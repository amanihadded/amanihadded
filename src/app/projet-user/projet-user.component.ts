import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model'
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-projet-user',
  templateUrl: './projet-user.component.html',
  styleUrls: ['./projet-user.component.css']
})
export class ProjetUserComponent implements OnInit{
projetCount: any;

  constructor(private projectService : ProjectService){}

  Projects:Project[]=[];

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(listProject => {
      this.Projects = listProject;
      });
  }

  isSidebarCollapsed: boolean = false; // Définir la propriété

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
