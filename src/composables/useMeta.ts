import { type MetaFlat } from 'zhead'

type MetaPickedRequired = Pick<
  MetaFlat,
  'ogTitle' | 'ogSiteName' | 'ogDescription' | 'ogImage' | 'ogUrl' | 'ogType' | 'robots'
>

type MetaPickedOptional = Pick<
  MetaFlat,
  'ogLocale' | 'google' | 'googlebot' | 'googlebotNews' | 'googleSiteVerification' | 'twitterCard' | 'fbAppId'
>

type MetaType = MetaPickedRequired & Partial<MetaPickedOptional>

export const useMeta = ({
  ogTitle,
  ogDescription,
  ogSiteName,
  ogImage,
  ogUrl,
  ogType = 'website',
  ogLocale = 'ja_JP',
  robots = 'all',
  google = undefined,
  googlebot = undefined,
  googlebotNews = undefined,
  googleSiteVerification = undefined,
  twitterCard = undefined,
  fbAppId = undefined,
}: MetaType) => {
  return useSeoMeta({
    title: ogTitle,
    ogTitle,
    ogSiteName,
    description: ogDescription,
    ogDescription,
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
