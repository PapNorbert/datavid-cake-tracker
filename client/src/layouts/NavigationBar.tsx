import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'



export default function Navigationbar() {
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand='lg' bg='customColor' sticky='top' className='px-5 pb-1 pt-1 mb-4' >
      <Container fluid className='mx-5 '>
        <Navbar.Brand className='ms-5 me-auto clickable' onClick={() => { navigate('/') }} >
          Datavid Cake Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav '>
          <Container className='ms-5'>
            <Nav.Link className='me-4 mr-4 nav-text fw-bold'
              onClick={() => { navigate('/members/create') }}>
              Add member
            </Nav.Link>
          </Container>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}