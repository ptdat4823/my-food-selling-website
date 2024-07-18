export type Page = {
  data: any[];
  page: number;
  totalPages: number;
};

export const defaultPage: Page = {
  data: [],
  page: 1,
  totalPages: 1,
};
