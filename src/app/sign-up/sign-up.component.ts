import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { ImageUserService } from '../image-user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  forminput!: FormGroup;
  selectedImage: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private userService: UserService,
    private imageUserService: ImageUserService
  ) {}

  ngOnInit(): void {
    this.forminput = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      image: [null]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.selectedImage = e.target.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  signUp() {
    if (this.forminput.valid) {
      this.userService.addUser(this.forminput.value).subscribe({
        next: (newUser) => {
          if (this.selectedFile) {
            this.imageUserService.uploadImage(this.selectedFile, newUser.id).subscribe(
              (response) => console.log('Image uploaded successfully:', response),
              (error) => console.error('Error uploading image:', error)
            );
          }
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          console.error("Erreur", error);
        }
      });
    }
  }
}
