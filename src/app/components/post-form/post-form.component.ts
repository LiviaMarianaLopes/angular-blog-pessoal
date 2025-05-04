import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemaService } from '../../services/tema.service';
import { PostFormService } from 'src/app/services/post-form.service';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router'; 
import { PostService } from '../../services/post.service'; 

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  postForm: FormGroup;
  postError: string = '';
  postId: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private temaService: TemaService,
    private postFormService: PostFormService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      tema: ['', Validators.required],
      titulo: ['', Validators.required],
      texto: ['', Validators.required]
    });

    // Verifica se tem ID para edição
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.postId = +idParam;
        this.loadPostData(this.postId);
      }
    });
  }

  loadPostData(id: number) {
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.postForm.patchValue({
          tema: post.tema.descricao,
          titulo: post.titulo,
          texto: post.texto
        });
      },
      error: (err) => {
        console.error('Erro ao carregar o post:', err);
      }
    });
  }

  savePost() {
    if (this.postForm.invalid) {
      this.postError = 'Preencha todos os campos corretamente.';
      return;
    }

    const { tema, titulo, texto } = this.postForm.value;

    if (this.postId) {
      this.temaService.createTema(tema).subscribe({
        next: (temaCriado) => {
          const temaId = temaCriado.id;
          this.postFormService.updatePost(this.postId!, titulo, texto, temaId).subscribe({
            next: (post) => {
              this.router.navigate(['/posts']);
            },
            error: (error) => {
              this.postError = 'Erro ao atualizar a postagem.';
            }
          });
        }
      });
    } else {
      this.temaService.createTema(tema).subscribe({
        next: (temaCriado) => {
          const temaId = temaCriado.id;
          this.postFormService.createPost(titulo, texto, temaId).subscribe({
            next: (post) => {
              console.log('Post criado com sucesso:', post);
              this.router.navigate(['/posts']);
            },
            error: (error) => {
              this.postError = 'Erro ao criar a postagem.';
            }
          });
        },
        error: (error) => {
          this.postError = 'Você precisa estar logado para criar uma postagem.';
        }
      });
    }
  }
}
