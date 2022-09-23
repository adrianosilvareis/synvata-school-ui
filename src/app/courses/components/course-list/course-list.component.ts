import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../../model/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() goStudents = new EventEmitter();

  readonly displayedColumns = ['name', 'actions']

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(null);
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }

  onDelete(course: Course) {
    this.delete.emit(course);
  }

  onStudents(course: Course) {
    this.goStudents.emit(course);
  }

}
