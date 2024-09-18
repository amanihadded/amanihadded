import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { ImageUserService } from '../image-user.service';
declare var $: any;

@Component({
  selector: 'app-gestion-utilisateur',
  templateUrl: './gestion-utilisateur.component.html',
  styleUrls: ['./gestion-utilisateur.component.css']
})
export class GestionUtilisateurComponent implements OnInit {
    forminput!: FormGroup;
    users: User[] = [];
    filteredUsers: User[] = [];
    searchTerm: string = '';
    userCount: number = 0;
    selectedFile: File | null = null;
    user: User = { id: -1, firstname: '', lastname: '', email: '', username: '', password: '', address: '' };
    userToUpdate: User = { id: -1, firstname: '', lastname: '', email: '', username: '', password: '', address: '' };
    isSidebarCollapsed = false;
    imageMap: Map<number, string> = new Map<number, string>();
  
    constructor(private userService: UserService, private formBuilder: FormBuilder, private imageUserService: ImageUserService) {}
  
    ngOnInit(): void {
      this.loadUsers();
      this.forminput = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        username: ['', [Validators.required]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        address: ['', [Validators.required]],
      });
    }
  
    searchUsers() {
      if (this.searchTerm) {
        this.filteredUsers = this.users.filter(user => user.username.toLowerCase().includes(this.searchTerm.toLowerCase()));
      } else {
        this.filteredUsers = this.users;
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
    onSidebarToggle(collapsed: boolean) {
      this.isSidebarCollapsed = collapsed;
    }
  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
    }
  
    loadUsers() {
      this.userService.getAllUsers().subscribe(listUser => {
        this.users = listUser;
        this.filteredUsers = this.users;
        this.userCount = this.users.length;
    
        // Pour chaque utilisateur, récupérer son image
        this.users.forEach(user => {
          this.imageUserService.getImageByUserId(user.id).subscribe(
            (response: any) => {  // Assurez-vous que `response` est de type base64 string
              this.imageMap.set(user.id, response); // On stocke directement la chaîne base64
            },
            (error) => {
              console.error('Failed to retrieve image:', error);
            }
          );
        });
      });
    }
     


  // Ajout model
  AjoutModel() {
    $('#ajouModel').modal('show');
  }

  AjoutEvent() {
    if (this.forminput.valid) {
      this.userService.addUser(this.forminput.value).subscribe(newUser => {
        if (this.selectedFile) {
          this.imageUserService.uploadImage(this.selectedFile, newUser.id).subscribe(response => {
            console.log('Image uploaded successfully:', response);
          }, error => {
            console.error('Error uploading image:', error);
          });
        }
        window.location.reload();
        this.loadUsers(); // Met à jour la liste sans recharger la page
        this.closeEvent();
      }, error => {
        console.error("Erreur", error);
      });
    }
  }

  closeEvent() {
    $('#ajouModel').modal('hide');
  }

  // Modif model
  editEtudiant(user: User) {
    this.userToUpdate = { ...user };
    $('#ModifModel').modal('show');
  }

  modifEvent() {
    if (this.userToUpdate) {
      this.userService.updateUser(this.userToUpdate.id, this.userToUpdate).subscribe(updatedUser => {
        console.log('User updated', updatedUser);
        if (this.selectedFile) {
          this.imageUserService.updateImage(this.selectedFile, this.userToUpdate.id).subscribe(response => {
            console.log('Image updated successfully:', response);
          }, error => {
            console.error('Error updating image:', error);
          });
        }
        const index = this.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
          this.searchUsers();
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

  userToDelete!: User;

  // Delete
  deleteEtudiant(user: User) {
    $('#deleteModal').modal('show');
    this.userToDelete = user;
  }

  deleteEvent() {
    this.userService.deleteUser(this.userToDelete.id).subscribe(() => {
      this.loadUsers();
      this.closeDelete();
    }, error => {
      console.error('Erreur', error);
    });
  }

  closeDelete() {
    $('#deleteModal').modal('hide');
  }

  // Details
  userToShow!: User;

  detailsFormateur(user: User) {
    this.userToShow = user;
    $('#detailsModel').modal('show');
  }

  closeDetails() {
    $('#detailsModel').modal('hide');
  }
}
