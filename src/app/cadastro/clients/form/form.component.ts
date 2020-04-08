import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { IClient, Client } from '../client';
import { DataService } from 'src/app/services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  formErrorName: string;


  constructor(private dialogRef: MatDialogRef<FormComponent>,
    private formBuilder: FormBuilder,
    private service: DataService) {
    this.buildForm(new Client());
  }

  ngOnInit() {

  }

  buildForm(client?: IClient) {
    this.form = this.formBuilder.group({
      name: [
        client.name,
        [Validators.required, Validators.minLength(3)]
      ]
    });
  }


  save() {
    const cli = new Client(0, this.form.get('name').value);
    this.service.save(cli).subscribe(
      data => {
        this.dialogRef.close(data);
      },
      (error: HttpErrorResponse) => {
        this.form.get(`${error.error[0].field}`).setErrors(error.error[0].message);
        this.formErrorName = error.error[0].message;
      }
    );
  }
}
