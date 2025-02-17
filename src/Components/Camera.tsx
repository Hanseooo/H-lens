import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useInterval } from '../hooks/useInterval';


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
    const isDoneRef = useRef(isDone)

    // When capture is complete (4 images taken)
    useEffect(() => {
        if (capturedImages.length === 4) {
            onCaptureComplete(capturedImages, true);
            isDoneRef.current = true
        }
    }, [capturedImages, onCaptureComplete]);

    useEffect(() => {
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
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    useInterval(() => {
        if (isCounting && countdown > 0) {
            setCountdown(prev => prev - 1);
        } else if (isCounting && countdown === 0) {
            captureImage();
            if (capturedImages.length < 3) {
                setCountdown(5);
            } else {
                setIsCounting(false);
            }
        }
    }, isCounting ? 1000 : null);

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


    return (
        <Container className='d-flex flex-column align-items-center reduceMarginTop'>
            <p className='text-light fw-bold fs-4 '>{countdown}</p>
            <div className='d-flex flex-column justify-content-center align-items-center cameraContainer'>
                <div className='p-3 bg-light shadow'>
                <video 
                    className=''
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    style={{ width: '100%', maxWidth: '520px', transform: 'scaleX(-1)' }}
                />
                </div>
            <p className='text-light fw-bold text-end fs-6 align-self-end mx-1'>
                {capturedImages.length}/4
            </p>
            </div>
        </Container>
    )
}
