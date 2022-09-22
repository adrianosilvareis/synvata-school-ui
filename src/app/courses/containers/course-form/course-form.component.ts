import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from './../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: new FormControl('', { nonNullable:true }),
    name: new FormControl('', { nonNullable:true })
  })

  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
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
    this._snackBar.open("Saving course with success", '', { duration: 5000 })
    this.onCancel()
  }

  private onError() {
    this._snackBar.open("Error saving course", '', { duration: 5000 })
  }

  ngOnInit(): void {
    const course:Course = this.route.snapshot.data['course']
    this.form.setValue({
      id: course.id,
      name: course.name
    })
  }

}
