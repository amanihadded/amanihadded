import { Component, OnInit } from '@angular/core';
import { Formation } from '../models/formation.model';
import { FormationService } from '../formation.service';
import { Formateur } from '../models/formateur.model';
import { FormateurService } from '../formateur.service';
import { ImageFormationService } from '../image-formation.service'
declare var $: any;

@Component({
  selector: 'app-gestion-formation',
  templateUrl: './gestion-formation.component.html',
  styleUrls: ['./gestion-formation.component.css']
})
export class GestionFormationComponent implements OnInit {

  imageMap: Map<number, string> = new Map<number, string>();
  selectedFile: File | null = null;
  Formations: Formation[] = [];
  formateurs: Formateur[] = [];
  selectedFormateur: Formateur | null = null;
  searchTerm: string = '';
  formationCount: number = 0;
  formation: Formation = {
    id: -1,
    title: "",
    content: "",
    documentLink: "",
    meetingLink: "",
    videoLink: "",
    duration: "",
    date: "",
    prix: "",
    formateur: {
      id:-1,
      username:'',
      email:'',
      speciality:'',
      firstname:'',
      lastname:'',
      address:'',
      password:''
    }
  };

  formationToUpdate: Formation = {
    id: -1,
    title: "",
    content: "",
    documentLink: "",
    meetingLink: "",
    videoLink: "",
    duration: "",
    date: "",
    prix: "",
    formateur: {
      id:-1,
      username:'',
      email:'',
      speciality:'',
      firstname:'',
      lastname:'',
      address:'',
      password:''
    }
  };

  constructor(
    private formationService: FormationService,
    private formateurService: FormateurService,
    private imageFormationService : ImageFormationService
  ) {}

  ngOnInit(): void {
    this.loadFormations();
    this.loadFormateurs();
  }

  loadFormations() {
    this.formationService.getAllFormations().subscribe((data: Formation[]) => {
      this.Formations = data;
      this.formationCount = this.Formations.length;
      this.Formations.forEach(formation => {
        this.imageFormationService.getImageByUserId(formation.id).subscribe(
          (response: any) => {  // Assurez-vous que `response` est de type base64 string
            this.imageMap.set(formation.id, response); // On stocke directement la chaîne base64
          },
          (error) => {
            console.error('Failed to retrieve image:', error);
          }
        );
      });

    }, error => {
      console.error('Erreur lors du chargement des formations:', error);
    });
  }
  selectedImage: string | null = null;
    loadImage(imageFile: File) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.selectedImage = event.target.result;
      };
      reader.readAsDataURL(imageFile);
    }
  
    getImageUrl(image: any): string {
      return 'data:' + image.type + ';base64,' + image.picByte;
    }
  loadFormateurs() {
    this.formateurService.getAllFormateur().subscribe(data => {
      this.formateurs = data;
    }, error => {
      console.error('Erreur lors du chargement des formateurs:', error);
    });
  }

  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }
  // Ajout Modal
  openAjoutModal() {
    $('#ajouModel').modal('show');
  }

  AjoutModel() {
    if (this.selectedFormateur && this.formation) {
      this.formationService.addFormation(this.formation, this.selectedFormateur.id).subscribe(
        (response) => {
          if (this.selectedFile) {
            this.imageFormationService.uploadImage(this.selectedFile, response.id).subscribe(response => {
              console.log('Image uploaded successfully:', response);
            }, error => {
              console.error('Error uploading image:', error);
            });
          }
          console.log('Formation ajoutée avec succès', response);
          window.location.reload();
          this.loadFormations();  // Recharger les formations pour mettre à jour l'affichage
          this.closeAjoutModal(); // Fermer le modal après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la formation', error);
          alert('Erreur lors de l\'ajout de la formation. Veuillez vérifier les détails.');
        }
      );
    } else {
      console.error('Formateur non sélectionné ou formation invalide');
    }
  }
  
  closeAjoutModal() {
    $('#ajouModel').modal('hide');
  }

  // Modif Modal
  editFormation(formation: Formation) {
    this.formationToUpdate = { ...formation };
    this.selectedFormateur = formation.formateur;
    $('#ModifModel').modal('show');
  }

  updateFormation() {
    if (this.formationToUpdate.id !== -1) {
      this.formationService.updateFormation(this.formationToUpdate.id, this.formationToUpdate, this.formationToUpdate.formateur.id || -1).subscribe(
        (response: any) => {
          console.log('Formation mise à jour avec succès', response);
          if (this.selectedFile) {
            this.imageFormationService.updateImage(this.selectedFile, response.id).subscribe(response => {
              console.log('Image updated successfully:', response);
            }, error => {
              console.error('Error updating image:', error);
            });
          }
          window.location.reload();
          this.loadFormations();
          this.closeModifModal();
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour de la formation', error);
        }
      );
    }
  }
  
  closeModifModal() {
    $('#ModifModel').modal('hide');
  }

  

  openDetailsModal(formation: Formation) {
    this.formation = formation;
    $('#detailsModel').modal('show');
  }

  closeDetailsModal() {
    $('#detailsModel').modal('hide');
  }

  // Delete Modal
  formationToDelete!: Formation;

  openDeleteModal(formation: Formation) {
    this.formationToDelete = formation;
    $('#deleteModal').modal('show');
  }
 
  deleteFormation() {
    if (this.formationToDelete) {
      this.formationService.deleteFormation(this.formationToDelete.id).subscribe(() => {
        this.loadFormations();
        this.closeDeleteModal();
      }, error => {
        console.error('Erreur lors de la suppression de la formation:', error);
      });
    }
  }
   
  closeDeleteModal() {
    $('#deleteModal').modal('hide');
  }
}
