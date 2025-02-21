import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
// import Navbar from './/Navbar'

import AboutContent from './AboutContent';

interface HomeProps {
    onChangeView: (view: string) => void,
    handleStopTimer: (decision: boolean) => void
}

export default function Home( { onChangeView, handleStopTimer }:HomeProps ) {

    useEffect(() => {
        handleStopTimer(true);
    },)

    return(
        <>
        <Container fluid className='containers home d-flex justify-content-center align-items-center flex-column'>
            <div className='text-light text-center'>
                <h1 className='poppins-medium focus-in-contract-bck'>H-Lens</h1>
                <h6 className='poppins-light text-focus-in'>A web-based Photobooth app</h6>
            </div>
            <Button onClick={() => onChangeView('photobooth')} className='btn btn-light mt-2 shadow jello-horizontal'>Get Started</Button>
        </Container>

        {/* <Navbar/> */}
        </>
    )
}