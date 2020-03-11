import { Component, OnInit } from '@angular/core';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: Tag[];

  constructor(private service: TagsService) {}

  async ngOnInit() {
    this.tags = await this.service.get() as Tag[];
  }
}

export interface Tag {
  name: string;
  description: string;
}
