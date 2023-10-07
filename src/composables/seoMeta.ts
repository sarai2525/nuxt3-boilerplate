import { useSeoMeta } from '#imports'

export type Meta = Record<'title' | 'description' | 'ogUrl' | 'ogImage' | 'robots', string | undefined | null>

export function useHeadMetas({ title, description, ogUrl, ogImage, robots = 'index, follow' }: Meta) {
  useSeoMeta({ title, ogTitle: title, description, ogDescription: description, ogUrl, ogImage, robots })
}
