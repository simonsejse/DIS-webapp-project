'use client';

import MyBreadcrumb from '@/components/client/Breadcrumb';
import ErrorComponent from '@/components/client/ErrorComponent';
import LoadingComponent from '@/components/client/LoadingComponent';
import { PrettyDate, prettyDateAsString } from '@/components/client/PrettyDate';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ErrorResponse } from '@/lib/response-builder';
import {
  Translator,
  parseNumber,
  placeValueIntoPlaceholder,
} from '@/lib/utils';
import { MonthlyFinanceDTO, SpreadsheetDTO } from '@/types/types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import RegnskabDropdown from '@/components/client/RegnskabDropdown';
import Table from './components/Table';
import AddTransModal from './components/add-trans-modal';
import AddCatAndSubcat from './components/add-cat-and-subcat';
import AddSubCatModalForm from './components/add-subcat-modal';
import AddCatModalForm from './components/add-cat-modal';

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params }: Props) {
  const regnskabId = parseNumber(params.id);

  const [activeCategory, setActiveCategory] = React.useState<
    number | undefined
  >();
  const [actMonFin, setActMonFin] = React.useState<string | undefined>();
  const [actSubCat, setActSubCat] = React.useState<number | undefined>();
  const [openTrans, setOpenTrans] = React.useState(false);
  const [openSubCat, setOpenSubCat] = React.useState(false);
  const [openCat, setOpenCat] = React.useState(false);
  const handleOnCellClick = (month: string, subcat: number) => {
    setActSubCat(subcat);
    setActMonFin(month);
    setOpenTrans(true);
  };
  const handleOpenSubcatModal = (category: number) => {
    setOpenSubCat(true);
    setActiveCategory(category);
  };
  const fetchSpreadsheet = async () => {
    const response = await axios.get<SpreadsheetDTO>(
      `/api/regnskab/${regnskabId}`
    );
    console.log(response.data);
    return response;
  };

  const { isLoading, isError, data, error } = useQuery<
    AxiosResponse<SpreadsheetDTO>,
    AxiosError<ErrorResponse>
  >({
    queryKey: ['spreadsheet', regnskabId],
    queryFn: () => fetchSpreadsheet(),
    staleTime: 0,
  });
  if (isLoading) return <LoadingComponent />;
  if (isError && error.response?.data.ismajor)
    return (
      <ErrorComponent
        error={
          error.response?.data.message || 'Der skete en uventet serverfejl'
        }
      />
    );

  const crumbs = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Regnskab', href: '/dashboard/regnskab' },
    {
      name: data?.data.name || 'Udefineret',
      href: `/dashboard/regnskab/${regnskabId}`,
    },
  ];

  if (!data?.data) return <ErrorComponent error="Data kunne ikke hentes" />;

  const spreadsheet = data.data;
  const { stats } = extractSpreadsheetData(spreadsheet);

  const handleRegnskabClose = async () => {
    const response = await axios.post(`/api/regnskab/${regnskabId}/close`);
    console.log(response.data);
  };
  const handleRegnskabOpen = async () => {
    const response = await axios.post(`/api/regnskab/${regnskabId}/open`);
    console.log(response.data);
  };
  const handleRegnskabDelete = async () => {
    const response = await axios.delete(`/api/regnskab/${regnskabId}`);
    console.log(response.data);
  };

  const categories = data?.data.categories.flatMap((category) => ({
    name: category.title,
    content: (
      <Table
        handleOpenSubcatModal={handleOpenSubcatModal}
        handleOnCellClick={handleOnCellClick}
        key={category.id}
        category={category}
      />
    ),
  }));

  return (
    <>
      <AddCatModalForm
        open={openCat}
        setOpen={setOpenCat}
        regnskabId={regnskabId}
      />
      <AddSubCatModalForm
        open={openSubCat}
        setOpen={setOpenSubCat}
        categoryId={activeCategory}
        regnskabId={regnskabId}
      />
      <AddTransModal
        open={openTrans}
        setOpen={setOpenTrans}
        regnskabId={regnskabId}
        actMonFin={actMonFin}
        subcat={actSubCat}
      />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 sm:pr-14">
        <MyBreadcrumb crumbs={crumbs} />
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start space-x-6 p-4 ">
              <div className="flex-1 p-6 ">
                <div className="mb-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                      {spreadsheet.name}{' '}
                      {isOpen(spreadsheet.status) ? (
                        <GreenBadge className="ml-2" />
                      ) : (
                        <RedBadge className="ml-2" />
                      )}
                    </h2>
                    <p className="text-gray-600">{spreadsheet.description}</p>
                  </div>
                  <RegnskabDropdown
                    isVertical={true}
                    onClickDelete={handleRegnskabDelete}
                    onClickLabelClosed={handleRegnskabClose}
                    onClickLabelOpen={handleRegnskabOpen}
                  />
                </div>
                <div className="space-y-2 border-2 p-2 rounded-lg divide-y-2 divide-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Statistiker{' '}
                    <span className="text-red-700">(Work In Progress)</span>
                  </h2>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center pt-2"
                    >
                      <span className="text-lg text-gray-800">
                        {stat.title}
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {placeValueIntoPlaceholder(
                          stat.format,
                          '%num',
                          stat.value
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-lg">
                <p className="text-md font-semibold text-gray-700 mb-1">
                  Oprettet:
                </p>
                <PrettyDate
                  dateStr={spreadsheet.created_at}
                  className="text-gray-500 mb-2"
                />
                <p className="text-md font-semibold text-gray-700 mb-1">
                  Sidst opdateret:
                </p>
                <PrettyDate
                  dateStr={spreadsheet.last_updated_at}
                  className="text-gray-500"
                />
              </div>
            </div>
          </CardHeader>
          <Separator className="mb-5" />
          <CardContent>
            {categories.map((category, index) => (
              <Accordion type="single" key={index} collapsible>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>
                    <h3 className="font-semibold text-lg text-gray-800 hover:text-gray-600 transition-colors">
                      {category.name}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>{category.content}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </CardContent>
          <CardFooter>
            <AddCatAndSubcat
              title="Tilføj kategori"
              size="large"
              onClick={() => setOpenCat(true)}
            />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

const GreenBadge = ({ className }: { className?: string }) => {
  return (
    <Badge className={className || ''} variant="green-subtle">
      Åben
    </Badge>
  );
};

const RedBadge = ({ className }: { className?: string }) => {
  return (
    <Badge className={className || ''} variant="red-subtle">
      Lukket
    </Badge>
  );
};

function extractSpreadsheetData(spreadsheet: SpreadsheetDTO) {
  const stats = [
    {
      title: 'Rådighedsbeløb forrige måned',
      value: 100,
      format: '%num kr.',
    },
    {
      title: 'Rådighedsbeløb denne måned',
      value: 200,
      format: '%num kr.',
    },
    {
      title: 'Vækst for rådighedsbeløb i %',
      value: 100,
      format: '%num %',
    },
    {
      title: 'Rådighedsbeløb i gns.',
      value: 150,
      format: '%num kr.',
    },
    {
      title: 'Rådighedsbeløb i år',
      value: 1800,
      format: '%num kr.',
    },
  ];
  return { stats };
}

function isOpen(status: string) {
  return status === 'OPEN';
}
