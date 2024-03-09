import { type MetaFlat } from 'zhead'

interface MetaDefaults {
  title: string
  description: string
}

type MetaPickedRequired = Pick<
  MetaFlat,
  'ogTitle' | 'ogSiteName' | 'ogDescription' | 'ogImage' | 'ogUrl' | 'ogType' | 'ogLocale'
>

type MetaPickedOptional = Pick<
  MetaFlat,
  'robots' | 'google' | 'googlebot' | 'googlebotNews' | 'googleSiteVerification' | 'twitterCard' | 'fbAppId'
>

type MetaType = MetaPickedRequired & Partial<MetaPickedOptional> & MetaDefaults

export const useMeta = ({
  title,
  description,
  ogImage,
  ogUrl,
  ogType = 'website',
  ogLocale = 'ja_JP',
  robots = undefined,
  google = undefined,
  googlebot = undefined,
  googlebotNews = undefined,
  googleSiteVerification = undefined,
  twitterCard = undefined,
  fbAppId = undefined,
}: MetaType) => {
  return useSeoMeta({
    title,
    ogTitle: title,
    ogSiteName: title,
    description,
    ogDescription: description,
    ogImage,
    ogUrl,
    ogType,
    ogLocale,
    robots,
    google,
    googlebot,
    googlebotNews,
    googleSiteVerification,
    twitterCard,
    fbAppId,
  })
}
