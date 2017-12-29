import { Injectable, Inject } from '@angular/core';
import { Meta, DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SeoService {
    private _document: any;
    
    constructor(@Inject(DOCUMENT) private document, 
                                  private metaService: Meta
    ) {
      this._document = document;
    }
    
    /*
    * General
    */
    public setTitle(siteTitle){
        this._document.title = siteTitle;
    }

    public setDescription(siteDescription){
      this.metaService.updateTag({
        content: siteDescription,
        name: 'description'
      });
    }

    /*
    *  Open graph
    */
    public setOgTitle(value: string) {
      this.metaService.updateTag({
        content: value,
        property: 'og:title'
      });
    }

    public setOgType(value: string) {
      this.metaService.updateTag({
        content: value,
        porperty: 'og:type'
      });
    }

    public setOgUrl(value: string) {
      this.metaService.updateTag({
        content: value,
        property: 'og:url'
      });
    }

    public setOgImage(value: string) {
      this.metaService.updateTag({
        content: value,
        property: 'og:image'
      });
    }

    public setOgDescription(value: string) {
      this.metaService.updateTag({
        content: value,
        property: 'og:description'
      });
    }

    /*
    *  Twitter
    */
    public setTwitterTitle(value: string) {
      this.metaService.updateTag({
        content: value,
        name: 'twitter:title'
      });
    }

    public setTwitterCard(value: string) {
      this.metaService.updateTag({
        content: value,
        name: 'twitter:card'
      });
    }

    public setTwitterSite(value: string) {
      this.metaService.updateTag({
        content: value,
        name: 'twitter:site'
      });
    }

    public setTwitterCreator(value: string) {
      this.metaService.updateTag({
        content: value,
        name: 'twitter:creator'
      });
    }

    public setTwitterUrl(value: string) {
      this.metaService.updateTag({
        content: value,
        name: 'twitter:url'
      });
    }

    public setTwitterImage(value: string) {
      this.metaService.updateTag({
        content: value,
        name: 'twitter:image'
      });
    }

    public setTwitterDescription(value: string) {
      this.metaService.updateTag({
        content: value,
        name: 'twitter:description'
      });
    }
}