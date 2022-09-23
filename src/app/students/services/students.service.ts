import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.httpClient.get<Student[]>(this.API)
  }
}
