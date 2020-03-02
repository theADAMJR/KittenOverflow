import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags = [
    { name: "c#", description: "A good language. Used by the finest kittens." },
    { name: "ts", description: "Another good language. Used by fine kittens." },
    { name: "angular", description: "A great framework. Used by this lol" },
    { name: "js", description: "Use TypeScript instead for webapps." }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
