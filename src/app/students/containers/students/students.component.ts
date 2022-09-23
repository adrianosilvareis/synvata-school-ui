import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { CoursesService } from 'src/app/courses/services/courses.service';
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
    private route: ActivatedRoute,
    private service: StudentsService,
    private courseService: CoursesService
  ) {
    this.students$ = this.loadList()
    this.options$ = this.loadCoursesOptions()
  }

  loadList(course?: Partial<Course>) {
    if (course && course.id) {
      return this.service
        .listByCourseId(course.id)
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

  private onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(resolve => {
      this.courseId = resolve['courseId']
    })
  }
}
