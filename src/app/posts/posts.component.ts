import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit
{
  posts = [];

  constructor(private service: PostsService) {}

  ngOnInit()
  {

  }

}

export interface Post
{
  id: string,
  title: string,
  body: string,
  authorId: string
}