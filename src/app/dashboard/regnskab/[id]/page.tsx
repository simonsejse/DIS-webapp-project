"use client";

import ErrorComponent from "@/components/client/ErrorComponent";
import LoadingComponent from "@/components/client/LoadingComponent";
import { ErrorResponse, SuccessResponse } from "@/lib/responseBuilder";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import React from "react";
import { useQuery } from "react-query";

type Props = {
  params: {
    id: string;
  };
};

type Spreadsheet = {
  id: number;
  name: string;
  created_at: string;
  last_updated_at: string;
};

export default function Page({ params }: Props) {
  const fetchSpreadsheet = async (id: string) => {
    const response = await axios.get<Spreadsheet>(`/api/regnskab/${id}`);
    console.log(response.data);
    return response.data;
  };

  const { isLoading, isError, data, error } = useQuery<
    SuccessResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: ["spreadsheet", params.id],
    queryFn: () => fetchSpreadsheet(params.id),
  });
  if (isLoading) return <LoadingComponent />;
  if (isError && error.response?.data.ismajor)
    return (
      <ErrorComponent
        error={
          error.response?.data.message || "Der skete en uventet serverfejl"
        }
      />
    );

  return (
    <div>
      My Post: {params.id}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
