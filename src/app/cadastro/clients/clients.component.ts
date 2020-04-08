import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataModel, GenericDataSource } from '../generic-datasource';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { UiService } from 'src/app/common/ui.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.component.html',
  styles: []
})
export class ClientsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataModel>;

  dataSource: GenericDataSource;


  displayedColumns = ['id', 'nome'];

  constructor(public dialog: MatDialog, private uiService: UiService) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.dataSource = new GenericDataSource();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '700px',
      data: {}
    });

    dialogRef.afterClosed().pipe(filter(data => data))
      .subscribe(data => this.uiService.showToast('Dado salvo com sucesso')
      );
  }

}
