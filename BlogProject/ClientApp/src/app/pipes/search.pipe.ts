import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, switchMap } from 'rxjs/operators';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {
     transform(posts: Post[], search = ''): Post[] {
        if (!search.trim()) {
          return posts;
        }
    
        return posts.filter(post => {
          return post.title.toLowerCase().includes(search.toLowerCase());
        })
      }
}
