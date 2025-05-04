import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostListComponent]
    });
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
