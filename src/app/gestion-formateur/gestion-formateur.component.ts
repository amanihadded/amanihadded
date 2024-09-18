import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formateur } from '../models/formateur.model';
import { FormateurService } from '../formateur.service';
import { ImageFormateurService } from '../image-formateur.service';

declare var $: any;

@Component({
  selector: 'app-gestion-formateur',
  templateUrl: './gestion-formateur.component.html',
  styleUrls: ['./gestion-formateur.component.css']
})
export class GestionFormateurComponent implements OnInit {

  constructor(private formateurService: FormateurService,private formBuilder: FormBuilder, private imageFormateurService : ImageFormateurService) {}
  forminput!: FormGroup;
  filteredFormateur: Formateur[] = [];
  searchTerm: string = '';
  formateurCount: number = 0;
  Formateurs: Formateur[] = [];
  imageMap: Map<number, string> = new Map<number, string>();
  selectedFile: File | null = null;


  formateur: Formateur = {
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    speciality: '',
    username: '',
    password: '',
    address: ''
  };

  formateurToUpdate: Formateur = {
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    speciality: '',
    username: '',
    password: '',
    address: ''
  };

  ngOnInit(): void {
    this.loadUsers();
    this.forminput = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      speciality :['', [Validators.required]],
    });
  }

  // Charger la liste des formateurs
  loadUsers() {
    this.formateurService.getAllFormateur().subscribe(listFormateur => {
      this.Formateurs = listFormateur;
      this.filteredFormateur = this.Formateurs; // Initialize filteredFormateur with all formateurs
      this.formateurCount = this.Formateurs.length;

      this.Formateurs.forEach(formateur=>{
        this.imageFormateurService.getImageByUserId(formateur.id).subscribe(
          (response:any) => {
            this.imageMap.set(formateur.id, response);
          },
          (error) => {
            console.error('Failed to retrieve image:', error);
          }
        )
      })
    });
  }

  // Filtrer les formateurs en fonction de la recherche
  searchFormateurs() {
    if (this.searchTerm) {
      this.filteredFormateur = this.Formateurs.filter(formateur =>
        formateur.username.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredFormateur = this.Formateurs;
    }
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

    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
    }
  isSidebarCollapsed = false;

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  // Ajouter formateur
  AjoutModel() {
    $('#ajouModel').modal('show');
  }

  AjoutEvent() {
    if(this.forminput.valid)
      {this.formateurService.addFormateur(this.forminput.value).subscribe(newFormateur => {
        if (this.selectedFile) {
          this.imageFormateurService.uploadImage(this.selectedFile, newFormateur.id).subscribe(response => {
            console.log('Image uploaded successfully:', response);
          }, error => {
            console.error('Error uploading image:', error);
          });
        }
      window.location.reload();
      this.loadUsers(); // Reload formateurs to update the list
      this.closeEvent();
    }, error => {
      console.error("Erreur", error);
    });}
    
  }

  closeEvent() {
    $('#ajouModel').modal('hide');
  }

  // Modifier formateur
  editFormateur(formateur: Formateur) {
    this.formateurToUpdate = { ...formateur };
    $('#ModifModel').modal('show');
  }

  modifEvent() {
    if (this.formateurToUpdate) {
      this.formateurService.updateFormateur(this.formateurToUpdate.id, this.formateurToUpdate).subscribe(updatedFormateur => {
        if (this.selectedFile) {
          this.imageFormateurService.updateImage(this.selectedFile, this.formateurToUpdate.id).subscribe(response => {
            console.log('Image updated successfully:', response);
          }, error => {
            console.error('Error updating image:', error);
          });
        }
        
        const index = this.Formateurs.findIndex(formateur => formateur.id === updatedFormateur.id);
        if (index !== -1) {
          this.Formateurs[index] = updatedFormateur;
          this.searchFormateurs(); // Reapply the filter after update
        }
        this.closeModif();
        window.location.reload();
      }, error => {
        console.error('Erreur', error);
      });
    }
  }

  closeModif() {
    $('#ModifModel').modal('hide');
  }

  // Supprimer formateur
  formateurToDelete!: Formateur;

  deleteFormateur(formateur: Formateur) {
    this.formateurToDelete = formateur; // Initialize formateurToDelete here
    $('#deleteModal').modal('show');
  }

  deleteEvent() {
    this.formateurService.deleteFormateur(this.formateurToDelete.id).subscribe(() => {
      this.loadUsers(); // Reload formateurs to update the list
      this.closeDelete();
    }, error => {
      console.error('Erreur', error);
    });
  }

  closeDelete() {
    $('#deleteModal').modal('hide');
  }

  // Détails formateur
  formateurToShow!: Formateur;

  detailsFormateur(formateur: Formateur) {
    this.formateurToShow = formateur;
    $('#detailsModel').modal('show');
  }

  closeDetails() {
    $('#detailsModel').modal('hide');
  }
}
