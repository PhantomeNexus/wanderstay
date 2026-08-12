import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

type Messages = {[key: string]: string | Messages};

function withFallback(source: Messages, target: Messages): Messages {
  const merged: Messages = {...source};

  for (const [key, value] of Object.entries(target)) {
    const existing = merged[key];
    merged[key] =
      typeof value === 'object' && typeof existing === 'object'
        ? withFallback(existing, value)
        : value;
  }

  return merged;
}

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const source = (await import(`../../messages/${routing.defaultLocale}.json`)).default;
  const messages =
    locale === routing.defaultLocale
      ? source
      : withFallback(source, (await import(`../../messages/${locale}.json`)).default);

  return {locale, messages};
});
