import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';  // Import MatDialogModule here
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { NavComponent } from "../nav/nav.component";
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,        
    MatFormFieldModule,     
    MatInputModule,        
    SidenavComponent,
    NavComponent
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  newCategory = { CategoryName: '' };  
  private dialogRef: MatDialogRef<any> | null = null;  

  constructor(private categoryService: ApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    debugger
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        console.log(data);
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }

  
  openCreateCategoryModal(templateRef: TemplateRef<any>): void {
    this.dialogRef = this.dialog.open(templateRef, {
      width: '400px' 
    });
  }

  addCategory(): void {
    this.categoryService.addCategories(this.newCategory).subscribe(
      response => {
        this.newCategory.CategoryName = '';
        this.dialogRef?.close();
        this.loadCategories();  
        console.log('Category added successfully', response);
      },
      error => {
        console.error('Error adding category', error);
      }
    );
  }

  onCancel(): void {
    this.newCategory.CategoryName = '';  
    this.dialogRef?.close(); 
  }

  
deleteCategory(id: number): void {
  if (confirm('Are you sure you want to delete this category?')) {
    this.categoryService.deleteCategory(id).subscribe(
      response => {
        this.loadCategories();
        console.log('Category deleted successfully', response);
      },
      error => {
        console.error('Error deleting category', error);
      }
    );
  }
}

}
