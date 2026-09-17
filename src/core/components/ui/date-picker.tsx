import type { DateFormat } from '@/core/constants/dates';
import type { Language } from '@/layout/constants/locales';

import React, { useEffect, useState } from 'react';
import { es } from 'react-day-picker/locale';
import { useTranslation } from 'react-i18next';

import { Button } from '@/core/components/ui/button';
import { Calendar } from '@/core/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/core/components/ui/popover';
import { dateFormatValue } from '@/core/constants/dates';
import { formatDate } from '@/core/lib/dates';
import { toSentenceCase } from '@/core/lib/utils';

/* DatePicker component allowing users to select a date either by typing or using a calendar popover.
 * **Note:** This component does not trigger form onChange events automatically if calendar popover is used, but it can via input field.
 * */
export function DatePicker({
  value,
  placeholder,
  dateFormat = dateFormatValue.intLong,
  disabled,
  onChange,
  ...props
}: DatePickerProps) {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(value);

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(date);

  useEffect(() => {
    onChange(date);
  }, [date]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          disabled={disabled}
          className="data-[empty=true]:text-muted-foreground justify-between text-left font-normal w-full"
          {...props}
        >
          <span>
            {date
              ? toSentenceCase(
                  formatDate(date, dateFormat, i18n.language as Language),
                )
              : placeholder}
          </span>
          <i className="ph ph-caret-down" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={i18n.language === 'es' ? es : undefined}
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
          month={month}
          onMonthChange={setMonth}
          disabled={disabled}
          footer={
            <div className="w-full flex justify-end">
              <Button
                size="sm"
                variant="destructive"
                className="mt-2"
                onClick={() => {
                  setDate(undefined);
                  setOpen(false);
                }}
              >
                {t('core:actions.clear')}
              </Button>
            </div>
          }
        />
      </PopoverContent>
    </Popover>
  );
}

export type DatePickerProps = Omit<
  React.ComponentProps<'button'>,
  'value' | 'onChange'
> & {
  placeholder?: string;
  dateFormat?: DateFormat;
  value?: Date;
  onChange: (...event: any[]) => void;
};
