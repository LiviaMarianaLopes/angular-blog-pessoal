import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private API_URL = 'https://projeto-blog-pessoal-l27j.onrender.com/api/temas';

  constructor(private http: HttpClient) {}

  createTema(nome: string): Observable<any> {
    const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(this.API_URL, { descricao: nome }, { headers });
  }
}
