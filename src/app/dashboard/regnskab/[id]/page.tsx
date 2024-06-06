'use client'

import ErrorComponent from '@/components/client/ErrorComponent'
import axios, { Axios, AxiosError } from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

type Props = {
    params: {
        id: number
    }
}

type SuccessResponse = {
    data: {
        id: number,
        name: string,
        description: string,
        created_at: string
    }
}

type ErrorResponse = {
    message: string
}

export default function Page({ params }: Props) {
    const { isLoading, isError, data, error } = useQuery<SuccessResponse, AxiosError<ErrorResponse>>({
        queryKey: ['spreadsheet', params.id],
        queryFn: () => axios.get(`/api/regnskab/${params.id}`)
    })
    if(isLoading) return <div>Loading...</div>
    if(isError) return <ErrorComponent error={error.response?.data.message || 'Der skete en uventet fejl'}/>
    
    return <div>
        My Post: {params.id}

        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
}