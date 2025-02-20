import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import cameraSfx from '../assets/audio/camerasfx.mp3'
import countdownSfx from '../assets/audio/countdown.mp3'
import CameraVideo from './CameraVideo';
//import html2canvas from 'html2canvas';

interface CameraProps {
    onCaptureComplete: (images: string[], done: boolean) => void;
    capturedImages: string[];
    isDone: boolean;
    images: string[];
    stopTimer: boolean;
}

export default function Camera( { onCaptureComplete, capturedImages, isDone, images, stopTimer }: CameraProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    // const [capturedImages, setCapturedImages] = useState<string[]>([]);
    const [countdown, setCountdown] = useState(5);
    const [isCounting, setIsCounting] = useState(false);
    // const [captureLimit, setCaptureLimit] = useState(1)
    // const [isDone, setIsDone] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);
    const [cameraSound] = useState(new Audio(cameraSfx))
    const [countDownSound] = useState(new Audio(countdownSfx))
    const [filter, setFilter] = useState('none')
    const isDoneRef = useRef(isDone)
    const cameraVideoRef = useRef<HTMLDivElement>(null);

    

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
                tracks.forEach(track => {
                    console.log(`Stopping track: ${track.kind}`);
                    track.stop(); // Stop each track to release the camera
                });
                videoRef.current.srcObject = null; // Clear the video source
            }
    
            // Pause and reset countDownSound
            countDownSound.pause();
            countDownSound.currentTime = 0;
        };
    }, [isDone, stopTimer, countDownSound]);

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

    // async function captureImage() {
    //     if (cameraVideoRef.current) {
    //         const canvas = await html2canvas(cameraVideoRef.current);
    //         const imageData = canvas.toDataURL('image/png');
    //         const newImages = [...capturedImages, imageData];
    //         onCaptureComplete(newImages, newImages.length === 4);
    //     }
    // }

    async function captureImage() {
        if (videoRef.current && cameraVideoRef.current) {
            const video = videoRef.current;
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
    
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Apply the filter to the canvas context
                ctx.filter = applyFilters(filter);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
                const imageData = canvas.toDataURL('image/png');
                const newImages = [...capturedImages, imageData];
                onCaptureComplete(newImages, newImages.length === 4);
            }
        }
    }

    useEffect(() => {
        if (stopTimer) {
            setIsCounting(false);
            countDownSound.pause();
            countDownSound.currentTime = 0;
        }
    },[stopTimer, countDownSound])


    // function stopCamera() {
    //     if (videoRef.current?.srcObject) {
    //         const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
    //         tracks.forEach(track => track.stop());
    //         videoRef.current.srcObject = null;
    //     }
    // }

    const filters = ['none', 'monochrome', 'sepia', 'monosepia', 'brightness']

    const applyFilters = (filter:string) => {
        switch (filter) {
            case 'monochrome':
                return ' grayscale(100%) contrast(90%) saturate(95%)';
            case 'sepia':
                return ' sepia(50%)';
            case 'monosepia':
                return ' grayscale(50%) sepia(25%) brightness(125%) saturate(110%)';
            case 'brightness': 
                return ' brightness(150%)';
            default:
                return 'brightness(100%)';
        }
    }


    return (
        <Container className='d-flex flex-column align-items-center reduceMarginTop'>
            <p className='text-light fw-bold fs-4 '>{countdown}</p>
            <div className='d-flex justify-content-center align-items-center align-items-md-start flex-column flex-md-row'>
                <div className='d-flex flex-column justify-content-center align-items-center cameraContainer'>
                    <CameraVideo ref = {cameraVideoRef} filter = {filter} applyFilters = {applyFilters} isFlashing={isFlashing} videoRef={videoRef}  />
                    <p className='text-light fw-bold text-end fs-6 align-self-end mx-1'>
                        {capturedImages.length}/4
                    </p>
                    <div className='d-flex justify-content-center mb-4'>
                        {
                            filters.map((filter) => (
                                <button onClick={()=> {setFilter(filter)}} className='selectFilterBtn btn square rounded-4 border border-2 m-1 mx-2 flex-wrap' style={{minWidth: "48px", filter: `${applyFilters(filter)}`, zIndex: "10"}}/>
                            ))
                        }
                    </div>
                </div>
                <div className='capturedImgContainer d-flex flex-md-column flex-row flex-wrap align-items-md-start align-items-center justify-content-center justify-content-md-start'>
                        {
                            images.map((image:string, index:number) => (
                                    <img key = {index} src= {image}  className='fourByThree tilt-in-fwd-bl imgPreview m-1 shadow mx-md-2 border bg-light border-5 pb-2 border-light'/>
                            ))
                        }
                </div>
            </div>
        </Container>
    )
}


  