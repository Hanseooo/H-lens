import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import cameraSfx from '../assets/audio/camerasfx.mp3'
import countdownSfx from '../assets/audio/countdown.mp3'
import CameraVideo from './CameraVideo';

interface CameraProps {
    onCaptureComplete: (images: string[], done: boolean) => void;
    capturedImages: string[];
    isDone: boolean;
}

export default function Camera( { onCaptureComplete, capturedImages, isDone }: CameraProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    // const [capturedImages, setCapturedImages] = useState<string[]>([]);
    const [countdown, setCountdown] = useState(5);
    const [isCounting, setIsCounting] = useState(false);
    // const [captureLimit, setCaptureLimit] = useState(1)
    // const [isDone, setIsDone] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);
    const [cameraSound] = useState(new Audio(cameraSfx))
    const [countDownSound] = useState(new Audio(countdownSfx))
    const isDoneRef = useRef(isDone)

    

    // When capture is complete (4 images taken)
    useEffect(() => {
        if (capturedImages.length === 4) {
            onCaptureComplete(capturedImages, true);
            isDoneRef.current = true
        }
    }, [capturedImages, onCaptureComplete]);

    useEffect(() => {
        // Reset internal state
        setCountdown(5);
        setIsCounting(false);
        setIsFlashing(false);
    
        // Reinitialize camera
        const startCamera = async () => {
            try {
                const constraints = { video: true };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };
    
        startCamera();
        startCaptureProcess();
    
        return () => {
            // Cleanup camera stream
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [isDone]);

    const playCameraSound = () => {
        cameraSound.currentTime = 0;
        cameraSound.play();
    };
    
    const playCountdownSound = () => {
        countDownSound.currentTime = 0;
        countDownSound.play();
    };

    useInterval(() => {
        if (isCounting && countdown > 0) {
            setCountdown(prev => prev - 1);
            if (countdown === 5) {
                playCountdownSound();
            }
        } else if (isCounting && countdown === 0) {
            setIsFlashing(true);
            playCameraSound()
            captureImage();
            if (capturedImages.length < 3) {
                setCountdown(5);
            } else {
                setIsCounting(false);
            }
        }
    }, isCounting ? 1000 : null);

    useEffect(() => {
        if (isFlashing) {
            const timer = setTimeout(() => setIsFlashing(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isFlashing]);

    function startCaptureProcess() {
        setIsCounting(true);
        setCountdown(5);
    }

    function captureImage() {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL('image/png');
                const newImages = [...capturedImages, imageData];
                onCaptureComplete(newImages, newImages.length === 4);
            }
        }
    }

    // function stopCamera() {
    //     if (videoRef.current?.srcObject) {
    //         const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
    //         tracks.forEach(track => track.stop());
    //         videoRef.current.srcObject = null;
    //     }
    // }


    return (
        <Container className='d-flex flex-column align-items-center reduceMarginTop'>
            <p className='text-light fw-bold fs-4 '>{countdown}</p>
            <div className='d-flex flex-column justify-content-center align-items-center cameraContainer'>
            <CameraVideo   isFlashing={isFlashing} videoRef={videoRef}  />
            <p className='text-light fw-bold text-end fs-6 align-self-end mx-1'>
                {capturedImages.length}/4
            </p>
            </div>
        </Container>
    )
}


  