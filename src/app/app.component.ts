import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './shared/loader.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularaustraliasays';
  isLoading$: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.isLoading$;
  }
}
