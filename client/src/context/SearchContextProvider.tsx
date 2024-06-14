import { createContext } from 'react';
import { ChildrenProps } from '../interface/childrenPropsInterface';

import {
  limitQuerryParamDefault, pageQuerryParamDefault, pageQuerryParamName, limitQuerryParamName,
  lastNameQuerryParamDefault, lastNameQuerryParamName, firstNameQuerryParamDefault,
  firstNameQuerryParamName, orderByDateQuerryParamDefault, orderByDateQuerryParamName

} from '../config/application.json'
import { useSearchParamsState } from '../hooks/useSearchParamsState';

interface ContextData {
  lastName: string;
  setLastName: (newState: string) => void;
  firstName: string;
  setFirstName: (newState: string) => void;
  limit: string;
  setLimit: (newState: string) => void;
  page: string;
  setPage: (newState: string) => void;
  orderByDate: string;
  setOrderByDate: (newState: string) => void;
}

const initialContextData: ContextData = {
  lastName: lastNameQuerryParamDefault,
  setLastName: () => { },
  firstName: firstNameQuerryParamDefault,
  setFirstName: () => { },
  limit: limitQuerryParamDefault,
  setLimit: () => { },
  page: pageQuerryParamDefault,
  setPage: () => { },
  orderByDate: orderByDateQuerryParamDefault,
  setOrderByDate: () => { },
}


export const SearchContext = createContext<ContextData>(initialContextData);

export default function SearchContextProvider({ children }: ChildrenProps) {
  const [lastName, setLastName] =
    useSearchParamsState(lastNameQuerryParamName, lastNameQuerryParamDefault);
  const [firstName, setFirstName] =
    useSearchParamsState(firstNameQuerryParamName, firstNameQuerryParamDefault);
  const [limit, setLimit] =
    useSearchParamsState(limitQuerryParamName, limitQuerryParamDefault);
  const [page, setPage] =
    useSearchParamsState(pageQuerryParamName, pageQuerryParamDefault);
  const [orderByDate, setOrderByDate] =
    useSearchParamsState(orderByDateQuerryParamName, orderByDateQuerryParamDefault);



  const value = {
    lastName, setLastName,
    firstName, setFirstName,
    limit, setLimit,
    page, setPage,
    orderByDate, setOrderByDate
  }

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}