import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/Post';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-posts-user',
  templateUrl: './posts-user.component.html',
  styleUrls: ['./posts-user.component.css'],
})
export class PostsUserComponent implements OnInit {
  @Input() userId!: number;
  posts: Post[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.api.getPostsByUser(this.userId).subscribe((posts) => {
        this.posts = posts;
      });
    }
  }
}
