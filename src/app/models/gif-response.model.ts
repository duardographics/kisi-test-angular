import { GifModel } from './gif.model';

export interface GifResponseModel {
  data: GifModel[];
  pagination: any;
  meta: any;
}
