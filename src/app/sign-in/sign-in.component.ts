import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from '../auth-user-service.service'; // Assurez-vous que ce chemin est correct


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  forminput!: FormGroup;
  username: string = "";
  password: string = "";
  loginError: string = ""; // Ajoutez cette propriété

  constructor(private router: Router, private formBuilder: FormBuilder,private authUserService: AuthUserService) {}

  ngOnInit(): void {
    this.forminput = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    
  }

  signIn() {
    if (this.forminput.valid) {
      const { username, password } = this.forminput.value;

      this.authUserService.login(username, password).subscribe({
        next: (user) => {
          this.authUserService.storeUser(user);
          this.router.navigate(['/homeuser']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.loginError = "Échec de la connexion. Veuillez vérifier vos identifiants."; // Définir le message d'erreur
        }
      });
    }
  }

  routeToSigninAdmin() {
    this.router.navigate(['/signinAdmin']);
  }

  // Navigate to Trainer SignIn
  routeToSigninFor() {
    this.router.navigate(['/signinFor']);
  }
}
