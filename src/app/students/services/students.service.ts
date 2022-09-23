import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';

import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private readonly API = 'api/students'

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Student[]>(this.API)
  }

  listByCourseId(courseId: string) {
    return this.httpClient.get<Student[]>(this.API).pipe(map(students => {
      return students.filter(student => {
        return student.courses.some(course => course.id == courseId)
      })
    }))
  }

  loadById(id: string) {
    return this.httpClient.get<Student>(`${this.API}/${id}`);
  }

  save(record: Partial<Student>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  deleteById(id: string) {
    return this.httpClient.delete<Student>(`${this.API}/${id}`);
  }

  private create(record: Partial<Student>) {
    return this.httpClient.post<Student>(this.API, record);
  }

  private update(record: Partial<Student>) {
    return this.httpClient.put<Student>(`${this.API}/${record.id}`, record);
  }
}
