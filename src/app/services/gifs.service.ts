import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GifResponseModel } from '../models/gif-response.model';
import { GifSimpleModel } from '../models/gif-simple.model';

@Injectable({ providedIn: 'root' })
export class GifService {
  constructor(private httpClient: HttpClient) {}

  getGifs(search: string, size: number): Observable<GifSimpleModel[]> {
    const req = this.httpClient
      .request(
        'GET',
        `https://api.giphy.com/v1/gifs/search?api_key=lXATXIC1oWqLbcNbzBXCH2W8215dEiuD&q=${search}%C3%A7&limit=${size}`
      )
      .pipe(
        map((res) => {
          const r = res as GifResponseModel;
          return r.data.map((e) => ({
            id: e.id,
            url: e.images.original.url,
            title: e.title,
            description: `Description for ${e.title}`,
          }));
        })
      );

    return req;
  }
}
