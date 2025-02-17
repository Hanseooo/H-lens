import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
// import Navbar from './/Navbar'

export default function Home() {
    return(
        <>
        <Container fluid className='containers home d-flex justify-content-center align-items-center flex-column'>
            <div className='text-light text-center'>
                <h1 className='poppins-medium'>H-Lens</h1>
                <h6 className='poppins-light'>A web-based Photobooth app</h6>
            </div>
            <Button className='btn btn-light mt-2 shadow'>Get Started</Button>
        </Container>
        {/* <Navbar/> */}
        </>
    )
}