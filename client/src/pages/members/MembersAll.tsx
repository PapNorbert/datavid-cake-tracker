import { useContext, useEffect, useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { Container } from "react-bootstrap";

import { SearchContext } from "../../context/SearchContextProvider";
import configuredAxios from "../../axios/configuredAxios";
import {
  limitQuerryParamDefault, limitQuerryParamName,
  pageQuerryParamDefault, pageQuerryParamName,
  lastNameQuerryParamDefault, lastNameQuerryParamName,
  firstNameQuerryParamDefault, firstNameQuerryParamName,
  orderByDateQuerryParamDefault, orderByDateQuerryParamName
} from '../../config/application.json'
import { MembersWithPagination } from "../../interface/memberInterface";
import MembersAllNav from "../../components/members/MembersAllNav";
import SearchBar from "../../components/SearchBar";
import MembersListElement from "../../components/members/MembersListElement";



export default function MembersAll() {
  const [membersUrl, setMembersUrl] = useState<string>('/api/members');
  const {
    limit, page, lastName,
    firstName, orderByDate,
  } = useContext(SearchContext);


  const { data: membersData, isError, error, isLoading } =
    useQuery<AxiosResponse<MembersWithPagination>, AxiosError>({
      queryKey: ["membersList", membersUrl],
      queryFn: queryFunction,
      retry: false,
      placeholderData: keepPreviousData, // keeps the last succesful fetch as well beside current 
    });

  function queryFunction() {
    return configuredAxios.get(membersUrl);
  }

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (limit !== limitQuerryParamDefault) {
      queryParams.set(limitQuerryParamName, limit);
    }
    if (page !== pageQuerryParamDefault) {
      queryParams.set(pageQuerryParamName, page);
    }
    if (lastName !== lastNameQuerryParamDefault) {
      queryParams.set(lastNameQuerryParamName, lastName);
    }
    if (firstName !== firstNameQuerryParamDefault) {
      queryParams.set(firstNameQuerryParamName, firstName);
    }
    if (orderByDate !== orderByDateQuerryParamDefault) {
      queryParams.set(orderByDateQuerryParamName, orderByDate);
    }

    setMembersUrl(`/api/members?${queryParams.toString()}`)
  }, [
    limit, page, lastName, firstName, orderByDate
  ]);



  if (isLoading) {
    return (
      <>
        <h2 className="text-center">Loading...</h2>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <h2 className="error">{error.message || 'Sorry, there was an error!'}</h2>
      </>
    )
  }

  return (
    <>
    <h1>Members</h1>
      { orderByDate !== 'true' &&
        <SearchBar />
      }
      <MembersAllNav />
      <Container>
        <h3>Found {membersData?.data.pagination.totalCount} results</h3>
        {
          membersData?.data.members &&
          <MembersListElement membersData={membersData.data} />
        }
      </Container>
    </>
  )
}
