import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/students/services/students.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: new FormControl('', { nonNullable:true }),
    name: new FormControl('', { nonNullable:true }),
    email: new FormControl('', { nonNullable:true })
  })

  constructor(
    private formBuilder: FormBuilder,
    private service: StudentsService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: result => this.onSuccess(),
      error: error => this.onError()
    })
  }

  onCancel() { this.location.back() }

  private onSuccess() {
    this._snackBar.open("Saving student with success", '', { duration: 5000 })
    this.onCancel()
  }

  private onError() {
    this._snackBar.open("Error saving student", '', { duration: 5000 })
  }

  private loadById(id: string) {
    this.service.loadById(id).subscribe(student => {
      this.form.setValue({
        id: student.id,
        name: student.name,
        email: student.email
      })
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => this.loadById(id))
  }
}
