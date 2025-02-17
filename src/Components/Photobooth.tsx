import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import Instructions from './Instructions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Camera from './Camera';
import Photo from './Photo';
import { useState } from 'react';

export default function Photobooth() {
    const [startCamera, setStartCamera] = useState(false)
    const [capturedImages, setCapturedImages] = useState<string[]>([]);
    const [isDone, setIsDone] = useState(false);

    const handleCaptureComplete = (images: string[], done: boolean) => {
        setCapturedImages(images);
        setIsDone(done);
    };

    return(
        <Container fluid className='containers photobooth d-flex justify-content-center align-items-center flex-column'>
            {/* {!startCamera && <Instructions />}
            {!startCamera && <Button onClick={() => setStartCamera(true)} className='btn btn-light text-light border-2 mt-4 shadow d-flex align-items-center darkTransparentBg'><FontAwesomeIcon icon={faCamera} className='fs-2 m-1' /> Start Capturing</Button>}
            {!isDone && startCamera && <Camera onCaptureComplete={handleCaptureComplete}
                capturedImages={capturedImages}
                isDone={isDone} />}
            {isDone && <Photo images = {capturedImages}/>} */}
            <Photo />
        </Container>
    )
}