import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../../model/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  @Input() courseId: string = '';
  @Input() students: Student[] = [];
  @Output() add = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  readonly displayedColumns = ['name', 'email', 'actions']

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    this.add.emit(null);
  }

  onEdit(student: Student) {
    this.edit.emit(student);
  }

  onDelete(student: Student) {
    this.delete.emit(student);
  }
}
