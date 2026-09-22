import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse, type NextRequest } from 'next/server'
const locales = ['en', 'es'] as const
type Locale = (typeof locales)[number]
const defaultLocale: Locale = 'en'


const LOCALE_COOKIE_NAME = 'NEXT_LOCALE'

function isValidLocale(locale: string | undefined): locale is Locale {
  return !!locale && (locales as readonly string[]).includes(locale)
}

function getLocaleFromHeaders(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language') || ''

  const negotiatorHeaders: Record<string, string> = {
    'accept-language': acceptLanguage,
  }

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  return match(languages, locales, defaultLocale) as Locale
}

function getLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value

  if (isValidLocale(cookieLocale)) {
    return cookieLocale
  }

  return getLocaleFromHeaders(request)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {

    const currentLocale = pathname.split('/')[1] as Locale
    const response = NextResponse.next()

    const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value
    if (cookieLocale !== currentLocale) {
      response.cookies.set(LOCALE_COOKIE_NAME, currentLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, 
      })
    }

    return response
  }

  const locale = getLocale(request)

  request.nextUrl.pathname = `/${locale}${pathname}`
  const response = NextResponse.redirect(request.nextUrl)

  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}