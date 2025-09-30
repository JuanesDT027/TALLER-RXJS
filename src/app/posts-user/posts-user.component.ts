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
    if (!this.userId) {
      return;
    }

    this.loading = true;
    this.api.getPostsByUser(this.userId).subscribe({
      next: (posts) => {
        // Normalizar posts y asegurar que `reactions` sea número
        this.posts = (posts as any[]).map((p: any) => {
          const reactionsCount = this.getReactionsCount(p?.reactions);
          return {
            id: p.id,
            title: p.title,
            body: p.body,
            userId: p.userId,
            reactions: reactionsCount,
          } as Post;
        });

        this.loading = false;

        // Cargar comentarios para cada post (manejo básico de error por post)
        this.posts.forEach((post) => {
          this.api.getCommentsByPost(post.id).subscribe({
            next: (comments) => {
              this.comments[post.id] = comments;
            },
            error: () => {
              // Si falla la petición de comentarios, dejar arreglo vacío para evitar undefined
              this.comments[post.id] = [];
            },
          });
        });
      },
      error: (err) => {
        console.error('Error cargando posts:', err);
        this.error = 'No se pudieron cargar las publicaciones.';
        this.loading = false;
      },
    });
  }

  private getReactionsCount(reactions: unknown): number {
    if (reactions == null) return 0;

    if (typeof reactions === 'number') {
      return reactions;
    }

    if (typeof reactions === 'object') {
      // Object.values puede devolver unknown[], así que lo tratamos manualmente.
      const values = Object.values(reactions as Record<string, unknown>);
      const total = values.reduce((acc: number, val: unknown) => {
        if (typeof val === 'number') return acc + val;
        if (typeof val === 'string' && !isNaN(Number(val)))
          return acc + Number(val);
        return acc;
      }, 0);
      return total;
    }

    if (typeof reactions === 'string') {
      const n = Number(reactions);
      return isNaN(n) ? 0 : n;
    }

    return 0;
  }
}
