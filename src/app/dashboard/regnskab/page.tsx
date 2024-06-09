'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTable } from './components/data-table';
import { Payment, columns } from './components/columns';
import { Button } from '@/components/ui/button';
import AddAccountingModal from './components/add-regnskab-modal';
import { useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import LoadingComponent from '@/components/client/LoadingComponent';
import ErrorComponent from '@/components/client/ErrorComponent';
import { ErrorResponse } from '@/lib/response-builder';

async function fetchPayments() {
  const response = await axios.get<Payment[]>('/api/regnskab');
  return response;
}

export default function Regnskab() {
  const { data, error, isLoading, isError } = useQuery<
    AxiosResponse<Payment[]>,
    AxiosError<ErrorResponse>
  >({
    queryKey: 'accountings',
    queryFn: fetchPayments,
  });

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError && error.response?.data.ismajor) {
    return (
      <ErrorComponent
        error={
          error.response?.data.message || 'Der skete en uventet serverfejl'
        }
      />
    );
  }
  console.log(data?.data);
  return (
    <div className="max-w-6xl mx-auto p-5 pt-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl text-gray-700 font-semibold">Regnskab</h1>
        <AddAccountingModal />
      </div>
      <section className="mt-2">
        <DataTable columns={columns} data={data?.data || []} />
      </section>
    </div>
  );
}
