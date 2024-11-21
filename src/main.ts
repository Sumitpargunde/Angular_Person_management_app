import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { UsersComponent } from './app/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule

bootstrapApplication(UsersComponent, {
  providers: [
    provideRouter([
      { path: '', component: UsersComponent }
    ]),
    importProvidersFrom(
      ReactiveFormsModule,
      HttpClientModule,
      ToastrModule.forRoot() // Add ToastrModule configuration
    )
  ]
}).catch(err => console.error(err));
