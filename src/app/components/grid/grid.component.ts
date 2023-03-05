import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { GifSimpleModel } from 'src/app/models/gif-simple.model';
import { GifService } from 'src/app/services/gifs.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  gifItems: GifSimpleModel[] = [];

  constructor(private gifService: GifService) {}

  ngOnInit(): void {
    this.getGifs().subscribe({
      next: (gifs: GifSimpleModel[]) => {
        this.gifItems.push(...gifs);
      },
    });
  }

  private getGifs(): Observable<GifSimpleModel[]> {
    return this.gifService.getGifs('cats').pipe(take(1));
  }
}
