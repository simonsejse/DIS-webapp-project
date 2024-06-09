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
  categoryId: number | undefined;
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
  description: string;
};

type FormDataExt = FormData & {
  categoryId: number;
};

type SuccessResponse = {
  message: string;
};

const FormOptions: FormOption[] = [
  {
    label: 'Navn på subkategori',
    defaultValue: 'Løn',
    id: 'name',
    type: 'text',
  },
  {
    label: 'Beskrivelse',
    defaultValue: '',
    id: 'description',
    type: 'textarea',
  },
];

export default function SubCatModalForm({
  regnskabId,
  categoryId,
  closeModal,
}: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = React.useState<FormData>({
    name: 'Løn',
    description: '',
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
      return await axios.post('/api/regnskab/subcategory', {
        ...formData,
      });
    },
    {
      onSuccess: (data) => {
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
    if (!categoryId) {
      toast({
        title: 'Error!',
        description: 'Kategori ikke fundet',
        variant: 'destructive',
      });
      return;
    }
    mutation.mutate({
      ...formData,
      categoryId,
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
