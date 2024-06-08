// Our DTO's (Data Transfer Objects) are defined here.
// We define three levels, full, partial and minimal.
// Full is the full data structure, partial is a subset
// of the full data structure and minimal is the smallest
// subset of the data structure.
// This is to make the data structure more flexible and
// to avoid unnecessary data being fetched.

// The naming convention is as follows:
// Full: SpreadsheetDTO, CategoryDTO
// Partial: PartialSpreadsheetDTO, PartialCategoryDTO
// Minimal: MinimalSpreadsheetDTO, MinimalCategoryDTO

type RoleDTO = "admin" | "user";

export type UserDTO = {
  id: number;
  email: string;
  created_at: string;
  first_name: string;
  last_name: string;
  password: string;
  role: RoleDTO;
  spreads: SpreadsheetDTO[];
  avg_monthly_available_amount: number;
};

export type UserPartialDTO = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  spreads: SpreadsheetDTO[];
  avg_monthly_available_amount: number;
};

export type UserMinimalDTO = {
  id: number;
  spreads: SpreadsheetDTO[];
  avg_monthly_available_amount: number;
};

export type TransactionDTO = {
  id: number;
  monthlyFinanceId: number;
  item_name: string;
  price: number;
  quantity: number;
  transaction_date: string;
};

export type MonthlyFinanceDTO = {
  id: number;
  subCategoryId: number;
  month: string;
  year: number;
  created_at: string;
  total_price: number;
  transactions: TransactionDTO[];
};

export type SubcategoryDTO = {
  id: number;
  categoryId: number;
  title: string;
  description?: string;
  created_at: string;
  monthlyFinances: MonthlyFinanceDTO[];
};

export type CategoryDTO = {
  id: number;
  spreadsheetId: number;
  title: string;
  description: string;
  current_date: string;
  created_at: string;
  subcategories: SubcategoryDTO[];
};

export type SpreadsheetDTO = {
  id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  last_updated_at: string;
  categories: CategoryDTO[];
};
