import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from 'react-bootstrap';
import Instructions from './Instructions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import Camera from './Camera';
import Photo from './Photo';
import { useEffect, useState } from 'react';
import RotatePhone from './rotatePhone';

interface PhotoboothProps {
    stopTimer: boolean,
    handleStopTimer: (decision:boolean) => void,
}

export default function Photobooth( { stopTimer, handleStopTimer }: PhotoboothProps) {
    const [startCamera, setStartCamera] = useState(false)
    const [capturedImages, setCapturedImages] = useState<string[]>([]);
    const [isDone, setIsDone] = useState(false);
    const [retakeCount, setRetakeCount] = useState(0);
    const [toggleInstructions, setToggleInstructions] = useState(false);

    useEffect(() => {
        handleStopTimer(false)
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setToggleInstructions(true);
        }, 4500);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);


    const handleCaptureComplete = (images: string[], done: boolean) => {
        setCapturedImages(images);
        setIsDone(done);
    };
    const handleRetake = () => {
        setCapturedImages([]); 
        setIsDone(false);
        setStartCamera(true);
        setRetakeCount(prev => prev + 1);
    };

    return(
        <Container fluid className='containers photobooth d-flex justify-content-center align-items-center flex-column'>
            {(!startCamera && !toggleInstructions) && <RotatePhone />}
            {(!startCamera && toggleInstructions) && <Instructions />}
            {(!startCamera && toggleInstructions) && <Button onClick={() => {setStartCamera(true) }} className='btn jello-horizontal btn-light text-light border-2 mt-4 shadow d-flex align-items-center darkTransparentBg rounded-4'><FontAwesomeIcon icon={faCamera} className='fs-2 m-1' /> Start Capturing</Button>}
            {(!isDone && startCamera) && 
                <Camera 
                    key={`camera-${retakeCount}`}
                    onCaptureComplete={handleCaptureComplete}
                    images = {capturedImages}
                    capturedImages={capturedImages}
                    isDone={isDone}
                     stopTimer={stopTimer}
                />
            }
            {isDone && <Photo images = {capturedImages} handleRetake = {handleRetake} />}
            {/* <Photo /> */}
        </Container>
    )
}