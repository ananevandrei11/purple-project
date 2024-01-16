export function getDateIntl({ langCode = 'ru-RU', date }: { langCode?: string; date: Date }) {
  return new Intl.DateTimeFormat(langCode, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}
