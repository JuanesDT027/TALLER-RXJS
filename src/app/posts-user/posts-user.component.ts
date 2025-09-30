import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-posts-user',
  templateUrl: './posts-user.component.html',
  styleUrls: ['./posts-user.component.css'],
})
export class PostsUserComponent implements OnInit {
  @Input() userId!: number;
  posts: Post[] = [];
  comments: { [postId: number]: Comment[] } = {};
  loading: boolean = false;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.loading = true;
      this.api.getPostsByUser(this.userId).subscribe({
        next: (posts) => {
          this.posts = posts;
          this.loading = false;

          // ✅ Cargar comentarios de cada post
          this.posts.forEach((post) => {
            this.api.getCommentsByPost(post.id).subscribe((comments) => {
              this.comments[post.id] = comments;
            });
          });
        },
        error: () => {
          this.error = 'No se pudieron cargar las publicaciones.';
          this.loading = false;
        },
      });
    }
  }
}
