import { useContext } from 'react';
import { Nav } from 'react-bootstrap'

import { SearchContext } from '../../context/SearchContextProvider';


export default function MembersAllNav() {
  const { orderByDate, setOrderByDate } = useContext(SearchContext);

  return (
    <Nav variant='tabs' defaultActiveKey='false' className='tabs-nav'
      activeKey={orderByDate}
      onSelect={(eventKey) => { setOrderByDate(eventKey || 'false') }}>
      <Nav.Item>
        <Nav.Link eventKey='false' >
          Members ordered by name
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='true' >
          Members ordered by birth date closest
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}