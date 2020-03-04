import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.css']
})
export class RecentPostsComponent implements OnInit {
  posts = [];

  constructor(private service: PostsService) {}

  async ngOnInit() {
    this.posts = await this.service.get();
  }
}

export interface Post {
  id: string;
  title: string;
  body: string;
  authorId: string;
}
