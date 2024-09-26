import { Component, OnInit, TemplateRef } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { NavComponent } from '../nav/nav.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    SidenavComponent,
    NavComponent,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
  ],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  categories: any[] = [];
  articleForm!: FormGroup;  
  isEditMode = false;
  selectedArticle: any;
  selectedFile: File | null = null;
    imagePreview: string | ArrayBuffer | null = null;
    baseurl= 'https://localhost:44364/'


  constructor(
    private articleService: ApiService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    debugger
    this.articleForm = this.fb.group({
      categoryId: ['', Validators.required],
      articleTitle: ['', Validators.required],
      articleDescription: ['', Validators.required],
      articleImage: [null] 
    });
    console.log(this.articleForm);
    

    this.fetchArticles();
    this.fetchCategories();
  }

  fetchArticles(): void {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0]; // Save the selected file
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Update the image preview
      };
      reader.readAsDataURL(this.selectedFile); // Convert file to URL for preview
    }
  }
  

  
  fetchCategories(): void {
    this.articleService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  openCreateArticleModal(templateRef: TemplateRef<any>): void {
    this.isEditMode = false;
    this.articleForm.reset();
    this.dialog.open(templateRef, {
      width: '600px'
    });
  }

  saveArticle(): void {
    const formData = new FormData();
  
    // Use the same property names as the backend
    formData.append('ArticleTitle', this.articleForm.get('articleTitle')?.value); 
    formData.append('Description', this.articleForm.get('articleDescription')?.value); 
    formData.append('Categoryid', this.articleForm.get('categoryId')?.value);
  
    if (this.selectedFile) {
      formData.append('ArticleImage', this.selectedFile, this.selectedFile.name);
    }
  
    this.articleService.addArticle(formData).subscribe(
      (response) => {
        console.log('Article saved successfully', response);
        this.fetchArticles();
      },
      (error) => {
        console.error('Error saving article', error);
      }
    );
  }
  
  

  deleteArticle(id: number): void {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.fetchArticles();
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
