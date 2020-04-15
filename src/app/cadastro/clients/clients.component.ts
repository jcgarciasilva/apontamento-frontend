import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { UiService } from 'src/app/common/ui.service';
import { filter, startWith, switchMap, map, catchError, debounce, debounceTime } from 'rxjs/operators';
import { DataService, Direction } from 'src/app/services/data.service';
import { Client } from './client';
import { merge, of } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: 'clients.component.html',
  styles: [`
    mat-form-field {
      width:100%
    }
  `]
})
export class ClientsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  errorText: string;
  _isLoadingResults = false;
  resultsLength: number;
  dataSource = new MatTableDataSource();
  displayedColumns = ['nome', 'actions'];
  pageLength = 0;
  nameFilter = new FormControl('');


  constructor(public dialog: MatDialog, private uiService: UiService, private dataService: DataService) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this._fillTable();
    });
    this.paginator.page.subscribe(() => this._fillTable());
    this.nameFilter.valueChanges.pipe(
      filter(i => i.length > 3 || i), debounceTime(1000))
      .subscribe(() => this._fillTable());
    this._fillTable();
  }


  ngOnInit(): void {
  }

  edit(link: string) {
    let formData: Client;
    if (link) {
      this.dataService.get(link).subscribe(
        data => {
          formData = data as Client;
          this.openForm(formData);
        },
        () => console.log('error')
      );
    } else {
      this.openForm(new Client());
    }
  }

  private openForm(formData: Client) {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '700px',
      data: {
        client: formData
      }
    });
    dialogRef.afterClosed().pipe(filter(data => data))
      .subscribe(data => {
        this.uiService.showToast('Dado salvo com sucesso');
        this._fillTable();
      });
  }

  _fillTable() {
    this._isLoadingResults = true;
    this.dataService.list(new Client(), {
      page: this.paginator.pageIndex, size: this.paginator.pageSize, sorts: [{
        fieldName: 'name', direction: this.sort.direction || 'asc'
      }], filters: [
        { fieldName: 'name', value: this.nameFilter.value }
      ]
    }).subscribe(
      data => {
        this.dataSource.data = data._embedded.clients;
        this.pageLength = data.page.totalElements;

      },
      error => this.uiService.showToast(error.error),
      () => this._isLoadingResults = false
    );
  }

  delete(link: string) {
    this.uiService.showDialog('Confirmação', 'Você realmente deseja remover este item', 'Ok', 'Cancel')
      .subscribe(() => this.dataService.delete(link));
  }

  get isLoadingResults() {
    return this._isLoadingResults;
  }
}
