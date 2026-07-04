import type { DriveFormData } from '@/modules/drives/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormInput } from '@/core/components/form-fields/form-input';
import { FormInputNumber } from '@/core/components/form-fields/form-input-number';
import { FormSwitch } from '@/core/components/form-fields/form-switch';
import { Button } from '@/core/components/ui/button';
import { FieldGroup } from '@/core/components/ui/field';
import { Spinner } from '@/core/components/ui/spinner';
import { driveFormSchema } from '@/modules/drives/schemas';

export function DriveForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}: DriveFormProps) {
  const { t } = useTranslation();

  const form = useForm<DriveFormData>({
    resolver: zodResolver(driveFormSchema),
    defaultValues: {
      name: '',
      model: '',
      serial: '',
      product: '',
      storage: null,
      available: true,
      ...defaultValues,
    },
  });

  const isSubmitting = form.formState.isSubmitting || isLoading;

  return (
    <form id="drive-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-4">
        <FormInput
          control={form.control}
          name="name"
          label={t('drives:fields.name')}
          disabled={isSubmitting}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="model"
            label={t('drives:fields.model')}
            disabled={isSubmitting}
          />
          <FormInput
            control={form.control}
            name="serial"
            label={t('drives:fields.serial')}
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            control={form.control}
            name="product"
            label={t('drives:fields.product')}
            disabled={isSubmitting}
          />
          <FormInputNumber
            control={form.control}
            name="storage"
            label={t('drives:fields.storage')}
            disabled={isSubmitting}
            unit="GB"
          />
        </div>

        <FormSwitch
          control={form.control}
          name="available"
          label={t('drives:fields.available')}
          disabled={isSubmitting}
        />

        <div className="flex justify-end gap-2 pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('actions.cancel')}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner />}
            {submitLabel ?? t('actions.save')}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}

export type DriveFormProps = {
  defaultValues?: Partial<DriveFormData>;
  onSubmit: (data: DriveFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
};
