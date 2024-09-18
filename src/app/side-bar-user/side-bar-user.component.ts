import { Component, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthUserService } from '../auth-user-service.service'; // Assurez-vous que ce chemin est correct

@Component({
  selector: 'app-side-bar-user',
  templateUrl: './side-bar-user.component.html',
  styleUrls: ['./side-bar-user.component.css']
})
export class SideBarUserComponent {
  isCollapsed = false;
  activeLink: string = '';
  user: any; // Remplacez 'any' par le type approprié si vous en avez un

  
  @Output() toggle = new EventEmitter<boolean>();

  constructor(private router: Router,
    private authUserService: AuthUserService) {
    // Écouter les changements de route pour mettre à jour le lien actif
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveLink(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {
    // Définir le lien actif lors du chargement initial
    this.setActiveLink(this.router.url);
    this.user = this.authUserService.getCurrentUser();  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed);
  }

  setActiveLink(link: string) {
    if (link.includes('homeuser')) {
      this.activeLink = 'home';
    } else if (link.includes('formateurContact')) {
      this.activeLink = 'Formateur';
    }else if (link.includes('listeprojet')) {
      this.activeLink = 'projets';
    }else if (link.includes('feedback')) {
      this.activeLink = 'commentaire';
    }else if (link.includes('paymentUser')) {
      this.activeLink = 'paiement';
    }  else if (link.includes('editProfileUser')) {
      this.activeLink = 'editProfileUser';
    }  else if (link.includes('logout')) {
      this.activeLink = 'logout';
    } else {
      this.activeLink = '';
    }
  }
  logout() {
    this.authUserService.logout(); // Assurez-vous que cette méthode est définie dans votre service
  }
}
