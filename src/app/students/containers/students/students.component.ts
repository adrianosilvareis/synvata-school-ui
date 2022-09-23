import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { CoursesService } from 'src/app/courses/services/courses.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Student } from '../../model/student';
import { StudentsService } from '../../services/students.service';
import { Course } from './../../../courses/model/course';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  courseId: string = '';
  options$: Observable<Course[]>;
  students$: Observable<Student[]>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private service: StudentsService,
    private courseService: CoursesService,
    private _snackBar: MatSnackBar,
  ) {
    this.students$ = this.loadList()
    this.options$ = this.loadCoursesOptions()
  }

  onAdd(){
    this.router.navigate(['students/new'])
  }

  onEdit(student: Student) {
    this.router.navigate(['students/edit', student.id])
  }

  onConfirmDelete(student: Student) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Are you sure you want to delete student '${student.name}'?`,
    });

    const response = dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.deleteById(student.id)
        }
      })
  }

  filterByCourse(course: Course) {
    this.students$ = this.loadList(course.id)
  }

  loadList(courseId?: string) {
    if (courseId) {
      return this.service
        .listByCourseId(courseId)
        .pipe(catchError(_ => {
          this.onError('Error loading students.');
          return of([])
        }))
    }
    return this.service
      .list()
      .pipe(catchError(_ => {
        this.onError('Error loading students.');
        return of([])
      }))
  }

  loadCoursesOptions() {
    return this.courseService
      .list()
      .pipe(catchError(_ => {
        this.onError('Error loading students.');
        return of([])
      }))
  }

  private deleteById(id: string) {
    this.service.deleteById(id)
    .pipe(catchError(_ => {
      this.onError('Error on delete student.');
      return of(false)
    }))
    .subscribe(response => {
      if (response) {
        this._snackBar.open("Deleted student with success", '', { duration: 5000 })
        this.students$ = this.loadList()
      }
    })
  }

  private onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(resolve => {
      this.courseId = resolve['courseId']
      this.students$ = this.loadList(this.courseId)
    })
  }
}
