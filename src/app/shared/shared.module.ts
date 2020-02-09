import { SearchComponent } from './search/search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const SHARED_COMPONENTS = [
  SearchComponent,
];

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
