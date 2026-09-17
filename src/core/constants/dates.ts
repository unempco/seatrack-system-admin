export const dateFormatValue = {
  iso: 'YYYY-MM-DD',
  us: 'MM/DD/YYYY',
  eurLatam: 'DD/MM/YYYY',
  eastAsia: 'YYYY/MM/DD',
  usLong: 'MMMM DD, YYYY',
  intLong: 'DD MMMM YYYY',
  usAbbr: 'MMM DD, YYYY',
  intAbbr: 'DD MMM YYYY',
  monthYear: 'MMMM YYYY',
  monthYearAbbr: 'MMM YYYY',
  yearOnly: 'YYYY',
} as const;

export const dateFormatsKeys = Object.keys(dateFormatValue) as DateFormatKey[];
export const DEFAULT_DATE_FORMAT_KEY: DateFormatKey = dateFormatsKeys[5];

export type DateFormatKey = keyof typeof dateFormatValue;
export type DateFormat = (typeof dateFormatValue)[keyof typeof dateFormatValue];
