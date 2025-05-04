import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router 
  ) {}
  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => {
      this.loadPosts(); 
    });
  }

  editPost(post: Post): void {
    this.router.navigate(['/post-form', post.id]);
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    this.filteredPosts = this.posts.filter(post =>
      post.usuario.nome.toLowerCase().includes(value) ||
      post.data.toString().includes(value)
    );
  }
  
}
