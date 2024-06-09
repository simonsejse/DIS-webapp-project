import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { CategoryDTO, MonthlyFinanceDTO, SubcategoryDTO } from '@/types/types';
import { DateHelper, lower } from '@/lib/utils';
import {
  getMonthlyTotals,
  getTransactionsTotal,
} from '@/lib/spreadsheet-helper';
import { Month } from 'date-fns';

type Props = {
  category: CategoryDTO;
  handleOnCellClick: (mthfinance: number) => void;
};

const columns = [
  { Header: 'Kategori' },
  { Header: 'Januar' },
  { Header: 'Februar' },
  { Header: 'Marts' },
  { Header: 'April' },
  { Header: 'Maj' },
  { Header: 'Juni' },
  { Header: 'Juli' },
  { Header: 'August' },
  { Header: 'September' },
  { Header: 'Oktober' },
  { Header: 'November' },
  { Header: 'December' },
];

export default function MyTable({ category, handleOnCellClick }: Props) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const alignRight = column.Header !== 'Kategori';
              return (
                <TableCell
                  {...(alignRight ? { align: 'right' } : {})}
                  key={column.Header}
                  className=""
                >
                  {column.Header}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="">
              <Typography fontWeight={700} component="div">
                {category.title}
              </Typography>
            </TableCell>
            {columns.slice(1).map((column) => (
              <TableCell key={lower(column.Header)} align="right">
                <Typography fontWeight={700} component="div">
                  {getMonthlyTotals(
                    category.subcategories,
                    lower(column.Header)
                  )}{' '}
                  kr.
                </Typography>
              </TableCell>
            ))}
          </TableRow>
          {category.subcategories.map((subcat, subcatIndex) => (
            <TableRow key={subcatIndex}>
              <TableCell
                className="max-w-[170px] min-w-[170px] flex flex-col text-wrap "
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <Typography component="div">
                  {subcat.title}
                  {subcat.description && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        display: 'block',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      {subcat.description}
                    </Typography>
                  )}
                </Typography>
              </TableCell>
              {columns.slice(1).map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  align="right"
                  onClick={() =>
                    handleOnCellClick(subcat.monthlyFinances[colIndex]?.id)
                  }
                  className="hover:bg-gray-100 transition-colors duration-200 ease-in-out cursor-pointer transform active:scale-90 max-w-[100px] min-w-[100px] text-wrap"
                >
                  {getTransactionsTotal(
                    subcat.monthlyFinances.find(
                      (finance) =>
                        DateHelper.extractMonth(finance.month) ===
                        lower(column.Header)
                    )
                  )}{' '}
                  kr.
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
