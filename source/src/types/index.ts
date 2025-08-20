import { PrismicDocument, PrismicImage } from './prismic'

interface Thumbnail extends PrismicImage {
  large: PrismicImage
}

export interface CaseStudyDoc extends PrismicDocument {
  data: {
    text_color: string
    background_color: string
    title: string
    thumbnail: Thumbnail,
    svg: any,
    credits: any, 
    tags: any,
    date: any, 
    launch_site_text: string, 
    launch_site_link: string,
    launch_site_background: string, 
    launch_site_text1: string,
  }
}
