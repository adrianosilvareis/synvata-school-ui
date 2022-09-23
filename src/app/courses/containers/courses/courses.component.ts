import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;

  constructor(
    public dialog: MatDialog,
    private service: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.courses$ = this.loadList()
  }

  ngOnInit(): void {
  }

  onAdd(){
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course.id], { relativeTo: this.route })
  }

  goStudents(course: Course) {
    this.router.navigate([`${course.id}/students`], { relativeTo: this.route })
  }

  onConfirmDelete(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Are you sure you want to delete course '${course.name}'?`,
    });

    const response = dialogRef.afterClosed()
      .subscribe(response => {
        if (response) {
          this.deleteById(course.id)
        }
      })
  }

  private deleteById(id: string) {
    this.service.deleteById(id)
    .pipe(catchError(_ => {
      this.onError('Error on delete courses.');
      return of(false)
    }))
    .subscribe(response => {
      if (response) {
        this._snackBar.open("Deleted course with success", '', { duration: 5000 })
        this.courses$ = this.loadList()
      }
    })
  }

  private loadList() {
    return this.service.list().pipe(catchError(_ => {
      this.onError('Error loading courses.');
      return of([])
    }))
  }

  private onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }
}
