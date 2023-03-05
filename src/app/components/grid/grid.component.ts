import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { GifSimpleModel } from 'src/app/models/gif-simple.model';
import { GifService } from 'src/app/services/gifs.service';

const FIGURE_SIZES = ['xs', 'md', 'lg'];

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @ViewChild('grid') grid!: ElementRef;
  gifItems: GifSimpleModel[] = [];

  constructor(private gifService: GifService) {}

  ngOnInit(): void {
    this.getGifs(7).subscribe({
      next: (gifs: GifSimpleModel[]) => {
        this.gifItems.push(...gifs);
      },
    });
  }

  private getGifs(size: number): Observable<GifSimpleModel[]> {
    return this.gifService.getGifs('cats gifs', size).pipe(
      take(1),
      map((g) => {
        return g.map((e: GifSimpleModel) => {
          e.class =
            FIGURE_SIZES[Math.floor(Math.random() * FIGURE_SIZES.length)];
          return e;
        });
      })
    );
  }

  moreGifs(size: number) {
    this.getGifs(size).subscribe({
      next: (gifs: GifSimpleModel[]) => {
        this.gifItems.push(...gifs);
        setTimeout(() => {
          this.grid.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 300);
      },
    });
  }

  getClass(i: number): string {
    if (i < 7) {
      return `card-item pos-${i}`;
    }
    return `card-item ${this.gifItems[i].class}`;
  }
}
