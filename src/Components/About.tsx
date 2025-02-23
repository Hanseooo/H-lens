import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import AboutContent from './AboutContent';
import { useEffect } from 'react';

interface AboutProps {
    handleStopTimer: (decision:boolean) => void,
}

export default function About( { handleStopTimer }: AboutProps) {

    useEffect(() => {
        handleStopTimer(true);
    },)

    return(
        <Container fluid className='containers home d-flex justify-content-evenly align-items-center flex-column'>
            <div style={{marginTop: "-40px"}}>
                <AboutContent header = "About" body ="H-lens is all about capturing moments easily through the web.
                    Using a virtual " italic='Photobooth' body2="users can easily take
                    photos and express themselves just like in a photobooth." />
                <AboutContent header='Privacy' body='H-lens cares for your ' italic='Privacy' body2="images captured
                    are only stored temporarily in your device's memory. H-lens does not keep
                    a copy of your image."/>
            </div>
            <p className='text-center jello-horizontal mt-4 text-light' style={{textShadow: "0px 4px 12px black"}}>made by hanseo</p>
        </Container>
    )
}