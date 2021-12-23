import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatTableModule
  ],
  exports : [
    MatProgressBarModule,
    MatTableModule
  ],
})
export class SharedPublicoModule { }
