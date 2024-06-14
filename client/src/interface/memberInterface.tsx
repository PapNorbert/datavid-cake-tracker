import { Pagination } from "./paginationInterface";

export interface MembersWithPagination {
  members: Member[];
  pagination: Pagination
}


export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  city: string;
}