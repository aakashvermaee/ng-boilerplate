import { Injectable } from '@angular/core';

/**
 * Service to preload all assets in background.
 */
@Injectable({
  providedIn: 'root',
})
export class AssetsPreloaderService {
  constructor() {}

  preload(assets: string[] = []) {
    if (!assets.length) return;

    assets.forEach((path) => {
      const image = new Image();
      image.hidden = true;
      image.src = path;
    });
  }
}
