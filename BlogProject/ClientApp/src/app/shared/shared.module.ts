import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateButtonComponent } from './components/create-button/create-button.component';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateButtonComponent
  ],
  declarations: [
    CreateButtonComponent
  ]
})
export class SharedModule {

}
