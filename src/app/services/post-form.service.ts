import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostFormService {
  private API_URL = 'https://projeto-blog-pessoal-l27j.onrender.com/api/postagens'; 

  constructor(private http: HttpClient) {}

  createPost(titulo: string, texto: string, temaId: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const userId = localStorage.getItem('userId');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const postPayload = {
      titulo: titulo,
      texto: texto,
      tema: { id: temaId },
      usuario: { id: userId }
    };
    console.log(postPayload)

    return this.http.post(this.API_URL, postPayload, { headers });
  }
  updatePost(id: number, titulo: string, texto: string, temaId: number): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const userId = localStorage.getItem('userId');
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    const postPayload = {
      id: id,
      titulo: titulo,
      texto: texto,
      tema: { id: temaId },
      usuario: { id: userId }
    };
  
    return this.http.put(`${this.API_URL}/${id}`, postPayload, { headers });
  }
  
}
