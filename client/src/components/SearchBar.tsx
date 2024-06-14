import { useContext, useState } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

import { SearchContext } from '../context/SearchContextProvider';


export default function SearchBar() {
  const {
    lastName, firstName, setLastName, setFirstName
  } = useContext(SearchContext);
  const [currentLastName, setCurrentLastName] = useState<string>(lastName);
  const [currentFirstName, setCurrentFirstName] = useState<string>(firstName);


  function handleSearch() {
    if (lastName !== currentLastName) {
      setLastName(currentLastName);
    }
    if (firstName !== currentFirstName) {
      setFirstName(currentFirstName);
    }
  }

  return (
    <Row className='mx-5 mb-4'>
      <Col xs lg={{ span: 4, offset: 1 }}  >
        <InputGroup>
          <InputGroup.Text>
            <Search className='mr-5' />
          </InputGroup.Text>
          <Form.Control type='text' value={currentLastName} onChange={e => setCurrentLastName(e.target.value)}
            placeholder='Last name of the member' />
        </InputGroup>
      </Col>
      <Col xs lg={{ span: 4, offset: 0 }}  >
        <InputGroup>
          <InputGroup.Text>
            <Search className='mr-5' />
          </InputGroup.Text>
          <Form.Control type='text' value={currentFirstName} onChange={e => setCurrentFirstName(e.target.value)}
            placeholder='First name of the member' />
        </InputGroup>
      </Col>
      <Col xs lg={{ span: 2, offset: 0 }} >
        <Button variant="secondary" onClick={handleSearch} >Search</Button>
      </Col>
    </Row>
  )
}