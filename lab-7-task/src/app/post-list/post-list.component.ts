import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-post-list',
  template: `
    <div
      *ngFor="let post of posts"
      (click)="toggleSelectPost(post)"
      class="post-container"
    >
      <div [class.selected]="post.id === selectedPostId" class="post">
        <h2 class="header">{{ post.title }}</h2>
        <p class="body">{{ post.body }}</p>
      </div>
      <div
        class="comments animation-dropdown"
        *ngIf="selectedPostId !== null && post.id === selectedPostId"
      >
        <h3>Comments:</h3>
        <app-post-comments
          [comments]="selectedPostComments"
        ></app-post-comments>
      </div>
    </div>
  `,
  styles: [
    `
      .selected {
        border-radius: 0.3rem;
        padding: 1rem 2rem;
        background-color: #dbdb9c;
        color: black;
      }
      .post.selected .header {
        color: #185680;
      }
      .post-container.selected .body {
        font-weight: 500;
      }
      .post {
        padding: 1rem 2rem;
      }
      .post-container {
        height: fit-content;
        max-width: 700px;
        margin: 1rem;
        background-color: #2c3e50;
        color: #ecf0f1;
        border-radius: 0.4rem;
        box-shadow: 0 3px 10px 2px #1a2530;
        cursor: pointer;
      }
      .post:active {
        transition: all 0.125s;
        transform: scale(0.97);
      }
      .post-container .header {
        font-size: 1.2rem;
        color: #3498db;
        text-transform: capitalize;
      }
      .post-container .body {
        font-size: 0.85rem;
      }

      .comments h3 {
        margin: 1.5rem 1.8rem 0.5rem;
      }
    `,
  ],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  selectedPostId: number | null = null;
  selectedPostComments: any[] = [];

  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  toggleSelectPost(post: any): void {
    if (this.selectedPostId === post.id) {
      // Unselect the post if it's already selected
      this.selectedPostId = null;
      this.selectedPostComments = [];
    } else {
      // Select the post and load comments
      this.selectedPostId = post.id;
      this.commentService.getComments(post.id).subscribe((comments) => {
        this.selectedPostComments = comments;
      });
    }
  }
}
