import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges  {
  posts: Post[] = [];
  totalPosts: number = 0;
  lastPosts: Post[] = [];
  postsByAuthor: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
      this.totalPosts = data.length;
      this.lastPosts = data.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()).slice(0, 5);
      this.calculatePostsByAuthor();
    });
  }

  calculatePostsByAuthor() {
    const counts: any = {};
    this.posts.forEach(post => {
      counts[post.usuario.nome] = (counts[post.usuario.nome] || 0) + 1;
    });
    this.postsByAuthor = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  }
}
