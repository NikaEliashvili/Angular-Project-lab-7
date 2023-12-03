import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-comments',
  template: `
    <div class="comment animation-popup" *ngFor="let comment of comments">
      <div class="user">
        <img src="/assets/user-icon.png" alt="icon" />
        <div>
          <h3 class="comment-name">{{ comment.name }}</h3>
          <p class="comment-email">{{ comment.email }}</p>
        </div>
      </div>
      <p class="comment-body">{{ comment.body }}</p>
    </div>
  `,
  styles: [
    `
      .comment {
        background-color: #273746;
        padding: 0.3rem 0.8rem;
        margin: auto 1rem;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
      }
      .comment-name {
        margin: 0;
        font-size: 1rem;
      }
      .comment-email {
        margin: 0;
        margin-top: -0.125rem;
        font-size: 0.75rem;
      }
      .comment-body {
        margin: 0;
        margin-top: 1rem;
        font-size: 0.95rem;
        color: #ecf0f1;
      }
      .user {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 1rem;
      }
      .user img {
        width: 40px;
        background-color: #ffffff;
        border-radius: 50%;
      }
    `,
  ],
})
export class PostCommentsComponent {
  @Input() comments: any[] = [];
}
