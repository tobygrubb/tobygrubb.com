import { PrismicRichText } from '../prismic'

export type TimelineData = {
  title: PrismicRichText
  current_title: string
  body: {
    slice_type: string
    slice_label: string
    items: {
      name: PrismicRichText
      description: PrismicRichText
      roles: PrismicRichText
    }[]
    primary: {
      year: PrismicRichText
    }
  }[]
  current: {
    category: string
    items: PrismicRichText
  }[]
}
