import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [GridComponent, CardComponent],
  imports: [CommonModule],
  exports: [GridComponent, CardComponent],
})
export class ComponentsModule {}
