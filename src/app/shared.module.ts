import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  exports: [HttpClientModule, FormsModule, ReactiveFormsModule, MatIconModule],
  providers: [],
})
export class SharedModule {}
