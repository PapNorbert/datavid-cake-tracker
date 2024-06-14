import { Container } from "react-bootstrap";

export default function Home(): JSX.Element {

  return (
    <>
      <Container className="mt-5 text-center">
        <h1>Home</h1>
        <h4 className="mt-4">Welcome to the Datavid Cake Tracker! </h4>
        <h4 className="mt-3">
          Datavid Cake Tracker is a management tool that helps in keeping track of all Datavid members and their birthdays.
        </h4>
        <h4 className="mt-3">
          In the 'Add Member' section, you can add a new member by entering their first name, last name, date of birth,
          country and city.
        </h4>
        <h4 className="mt-3">
          Once added, all members are listed in the 'Members' section, which features a paginated view for
          easy navigation. You can filter members by first and last name, and edit or delete their information as needed.
          In addition, our app allows you to sort members by the closest birthday to today, so you can keep track of upcoming
          celebrations.
        </h4>
        <h4 className="mt-3">
          Enjoy seamless and efficient member management with our easy-to-use app.
        </h4>
      </Container>
    </>
  )
}