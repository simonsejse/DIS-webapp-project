import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { ErrorResponse, SuccessResponseBuilder } from '@/lib/response-builder';

type Props = {
  regnskabId: number;
  actMonFin: string | undefined;
  subcat: number | undefined;
  closeModal: () => void;
};

type FormOption = {
  label: string;
  defaultValue: string | number;
  id: string;
  type: string;
};

type FormData = {
  name: string;
  price: number;
  quantity: number;
};

type FormDataExt = FormData & {
  regnskabId: number;
  actMonFin: string;
  subcat: number;
};

type SuccessResponse = {
  message: string;
};

const FormOptions: FormOption[] = [
  {
    label: 'Navn',
    defaultValue: 'Husleje',
    id: 'name',
    type: 'text',
  },
  {
    label: 'Beløb',
    defaultValue: 500,
    id: 'price',
    type: 'number',
  },
  {
    label: 'Antal',
    defaultValue: 1,
    id: 'quantity',
    type: 'number',
  },
];

export default function TransModalForm({
  regnskabId,
  actMonFin,
  subcat,
  closeModal,
}: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = React.useState<FormData>({
    name: 'Husleje',
    price: 500,
    quantity: 1,
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
    AxiosResponse<SuccessResponse>,
    AxiosError<ErrorResponse>,
    FormDataExt
  >(
    async (formData: FormDataExt) => {
      console.log(subcat);
      return await axios.post('/api/transactions', {
        ...formData,
        regnskabId,
        actMonFin,
        subcat,
      });
    },
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({
          queryKey: ['spreadsheet', regnskabId],
        });
        toast({
          title: 'Success!',
          description: data?.data.message,
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
    if (!actMonFin || !subcat) {
      toast({
        title: 'Error!',
        description: 'Der skete en uventet fejl. Prøv igen senere.',
        variant: 'destructive',
      });
      return;
    }
    mutation.mutate({
      ...formData,
      regnskabId,
      actMonFin,
      subcat,
    });
  };

  return (
    <form className={cn('grid items-start gap-4')} onSubmit={handleSubmit}>
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
