import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AppError } from '../errors/app-error';
import { NotFoundError } from './../errors/not-found-error';
import { BadRequestError } from '../errors/bad-request-error';

@Injectable()
export class DataService {
  constructor(private url: string, private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.url)
               .pipe(map(response => response), catchError(this.handleError));
  }

  create(resource) {
     return this.httpClient.post(this.url, JSON.stringify(resource))
                .pipe(map(response => response), catchError(this.handleError));
  }

  update(resource) {
    return this.httpClient.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true}))
               .pipe(map(response => response), catchError(this.handleError));
  }

  delete(id) {
    return this.httpClient.delete(this.url + '/' + id)
                 .pipe(map(response => response), catchError(this.handleError));
  }

  private handleError(error: Response) {
    switch (error.status) {
      case 400:
        return throwError(new BadRequestError());
      case 404:
        return throwError(new NotFoundError());
      default:
        return throwError(new AppError(error));
    }
  }
}
