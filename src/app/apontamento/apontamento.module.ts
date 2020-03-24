import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApontamentoComponent } from './apontamento.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [ApontamentoComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ApontamentoModule { }
