import dayjs, { extend, locale } from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/pt-br';

extend(RelativeTime);

interface RelativeTimeOptions {
  locale: string;
  time: string | number | Date;
}

export default function useRelativeTime({ locale: userLocale, time }: RelativeTimeOptions) {
  locale(userLocale);

  return dayjs(time).fromNow(true);
}
