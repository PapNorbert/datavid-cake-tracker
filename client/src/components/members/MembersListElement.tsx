import { Container } from "react-bootstrap";

import { MembersWithPagination } from "../../interface/memberInterface";
import MemberDetailedElement from "./MemberDetailedElement";
import PaginationElement from "../PaginationElement";
import Limit from "../Limit";


interface PropType {
  membersData: MembersWithPagination;
}

export default function MembersListElement({ membersData }: PropType) {

  if (membersData.members.length > 0) {
    return (
      <>
        <Limit />
        <Container>
          {membersData.members.map(currentElement => (
            <MemberDetailedElement member={currentElement} key={currentElement.id} />
          ))}
          < PaginationElement totalPages={membersData.pagination.totalPages} />
        </Container>
      </>
    )
  }

  return (
    <h3>No members found!</h3>
  )
}
