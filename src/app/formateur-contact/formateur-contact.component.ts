import { Component, OnInit } from '@angular/core';
import { Formateur } from '../models/formateur.model'
import { FormateurService } from '../formateur.service';
import { ImageFormateurService } from '../image-formateur.service';

@Component({
  selector: 'app-formateur-contact',
  templateUrl: './formateur-contact.component.html',
  styleUrls: ['./formateur-contact.component.css']
})
export class FormateurContactComponent implements OnInit {

  constructor(private formateurService : FormateurService,private imageFormateurService : ImageFormateurService){}
  isSidebarCollapsed = false;
  imageMap: Map<number, string> = new Map<number, string>();
  selectedFile: File | null = null;
  Formateurs:Formateur[]=[];
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
  ngOnInit(): void {
    this.formateurService.getAllFormateur().subscribe(listFormateur => {
      this.Formateurs = listFormateur; 

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
  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
