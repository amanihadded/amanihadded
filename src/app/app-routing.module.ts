import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { GestionFormateurComponent } from './gestion-formateur/gestion-formateur.component';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionFormationComponent } from './gestion-formation/gestion-formation.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GetionProjectComponent } from './getion-project/getion-project.component';
import { HomeUserComponent } from './home-user/home-user.component'
import { PaymentUserComponent } from './payment-user/payment-user.component';
import { SideBarUserComponent } from './side-bar-user/side-bar-user.component';
import { HomeFormateurComponent } from './home-formateur/home-formateur.component';
import { AccesComponent } from './acces/acces.component';
import { ProjetUserComponent } from './projet-user/projet-user.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FormationComponent } from './formation/formation.component';
import { FormationForComponent } from './formation-for/formation-for.component';
import { FormateurContactComponent } from './formateur-contact/formateur-contact.component';
import { FeedbackAdminComponent } from './feedback-admin/feedback-admin.component';
import { AccesAdminComponent } from './acces-admin/acces-admin.component';
import { EmailComponent } from './email/email.component';
import { AuthGuard } from './guards/auth.guard'; // Adjust path if needed
import { SigninFormateurComponent } from './signin-formateur/signin-formateur.component';
import { SigninAdminComponent } from './signin-admin/signin-admin.component';
import { SignupForComponent } from './signup-for/signup-for.component';


const routes: Routes = [
  {path:'sidebar',component:SideBarComponent, canActivate: [AuthGuard] },
  {path:'sidebarUser',component:SideBarUserComponent, canActivate: [AuthGuard] },
  {path:'gestionFormateur',component:GestionFormateurComponent, canActivate: [AuthGuard] },
  {path:'gestionUtilisateur',component:GestionUtilisateurComponent, canActivate: [AuthGuard] },
  {path:'dashbordAdmin',component:DashboardComponent, canActivate: [AuthGuard] },
  {path:'gestionformation',component:GestionFormationComponent, canActivate: [AuthGuard] },
  {path:'home',component:HomeComponent},
  {path:'header',component:HeaderComponent, canActivate: [AuthGuard] },
  {path:'signin',component:SignInComponent },
  {path:'signup',component:SignUpComponent },
  {path:'gestionprojet',component:GetionProjectComponent, canActivate: [AuthGuard] },
  {path:'homeuser',component:HomeUserComponent, canActivate: [AuthGuard] },
  {path:'paymentUser',component:PaymentUserComponent, canActivate: [AuthGuard] },
  {path:'homeformateur',component:HomeFormateurComponent, canActivate: [AuthGuard] },
  {path:'acces/:id',component:AccesComponent, canActivate: [AuthGuard] },
  {path:'listeprojet',component:ProjetUserComponent, canActivate: [AuthGuard] },
  {path:'feedback',component:FeedbackComponent, canActivate: [AuthGuard] },
  { path:'formation/:id', component: FormationComponent , canActivate: [AuthGuard] },
  {path:'formationformateur/:id',component:FormationForComponent, canActivate: [AuthGuard] },
  {path:'formateurContact',component:FormateurContactComponent, canActivate: [AuthGuard] },
  {path:'feedbackAdmin',component:FeedbackAdminComponent, canActivate: [AuthGuard] },
  {path:'accesAdmin',component:AccesAdminComponent, canActivate: [AuthGuard] },
  {path:'email',component:EmailComponent, canActivate: [AuthGuard] },
  {path:'signinFor',component:SigninFormateurComponent},
  {path:'signinAdmin',component:SigninAdminComponent},
  {path:'signupFor',component:SignupForComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
