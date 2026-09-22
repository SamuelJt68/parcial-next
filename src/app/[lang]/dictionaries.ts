import 'server-only'

const dictionaries = {
  en: () => import('./dictonaries/en.json').then((m) => m.default),
  es: () => import('./dictonaries/es.json').then((m) => m.default),
} as const

export type Locale = keyof typeof dictionaries

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export type Dictionary = {
  welcome: string
  hello: string
  footer: {
    derechos: string
    propiedad: string
  }
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]()
