import { Observable, of } from 'rxjs';
import { CoursesService } from './../../../courses/services/courses.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/courses/model/course';
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
    email: new FormControl('', { nonNullable:true }),
    courses: new FormControl<Course[]>([], { nonNullable:true }),
  })

  courses: Course[] = [];
  allCourses$: Observable<Course[]> = of([]);

  constructor(
    private formBuilder: FormBuilder,
    private service: StudentsService,
    private coursesService: CoursesService,
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
        email: student.email,
        courses: student.courses
      })
      this.courses = student.courses;
    })
  }

  private loadCourses() {
    this.allCourses$ = this.coursesService.list();
  }

  onUpdate(courses: Course[]) {
    this.form.get('courses')?.setValue(courses)
    this.courses = courses;
  }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      if (id) {
        this.loadById(id)
      }
    })
    this.loadCourses()
  }
}
