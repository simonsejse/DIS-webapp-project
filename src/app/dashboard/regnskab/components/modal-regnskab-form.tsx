import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { ErrorResponse } from '@/lib/response-builder';

type FormOption = {
  label: string;
  defaultValue: string;
  id: string;
  type: string;
};

type FormData = {
  navn: string;
  beskrivelse: string;
};

type SuccessResponse = {
  message: string;
};

const FormOptions: FormOption[] = [
  { label: 'Navn', defaultValue: 'Regnskab 2024', id: 'navn', type: 'text' },
  {
    label: 'Beskrivelse',
    defaultValue: 'Oversigt over regnskab 2024',
    id: 'beskrivelse',
    type: 'textarea',
  },
];

export default function AccountingForm({
  className,
  closeModal,
}: React.ComponentProps<'form'> & { closeModal: () => void }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = React.useState<FormData>({
    navn: 'Regnskab 2024',
    beskrivelse: 'Oversigt over regnskab 2024',
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const mutation = useMutation<
    SuccessResponse,
    AxiosError<ErrorResponse>,
    FormData
  >(
    async (formData: FormData) => {
      const response = await axios.post('/api/regnskab', formData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['accountings'] });
        toast({
          title: 'Success!',
          description: data.message,
          variant: 'default',
        });
      },
      onError: (error) => {
        toast({
          title: 'Error!',
          description: error.response?.data.message,
          variant: 'destructive',
        });
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeModal();

    mutation.mutate({
      navn: formData.navn,
      beskrivelse: formData.beskrivelse,
    });
  };

  return (
    <form
      className={cn('grid items-start gap-4', className)}
      onSubmit={handleSubmit}
    >
      {FormOptions.map((option) => (
        <div key={option.id} className="grid gap-2">
          <Label
            className="uppercase text-xs tracking-wider"
            htmlFor={option.id}
          >
            {option.label}
          </Label>
          {option.type === 'textarea' ? (
            <textarea
              id={option.id}
              value={formData[option.id as keyof typeof formData]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <Input
              type={option.type}
              id={option.id}
              value={formData[option.id as keyof typeof formData]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <Button type="submit">Opret</Button>
    </form>
  );
}
