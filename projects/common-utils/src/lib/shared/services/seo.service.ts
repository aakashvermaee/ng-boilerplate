import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

/**
 * SEO Tags update service wrapper.
 */
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private meta: Meta) {}

  /**
   * This method is used to update singular SEO tag.
   */
  updateTag(tag: MetaDefinition): void {
    this.meta.updateTag(tag);
  }

  /**
   * This method is used to bulk update SEO tags.
   */
  updateTags(tags: MetaDefinition[] = []): void {
    if (!tags.length) {
      return;
    }

    tags.forEach((tag: MetaDefinition) => {
      this.meta.updateTag(tag);
    });
  }
}
