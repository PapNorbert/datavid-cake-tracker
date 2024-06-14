import { Card } from "react-bootstrap";

import { Member } from "../../interface/memberInterface"
import RowWithKeyValue from "../RowWithKeyValue";
import { dateFormatOptions } from "../../util/dateOptions";

interface PropType {
  member: Member;
}

export default function MemberDetailedElement({ member }: PropType) {
  return (
    <Card className='mt-4 mb-3'>
      <Card.Header>
        {`${member.lastName} ${member.firstName}`}
      </Card.Header>
      <Card.Body>
        <RowWithKeyValue keyString="Birth Date" 
        valueString={new Date(member.birthDate).toLocaleDateString('ro-RO', dateFormatOptions)} />
        <RowWithKeyValue keyString="Country" valueString={member.country} />
        <RowWithKeyValue keyString="City" valueString={member.city} />
      </Card.Body>
    </Card>
  )
}
