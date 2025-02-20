import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useRef } from 'react';

export default function Instructions() {

    const videoRef = useRef<HTMLVideoElement>(null);

    const startCamera = async () => {
        try {
            const constraints = { video: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Camera access is required for this feature. Please enable camera permissions in your browser settings.');
        }
    };

    useEffect(() => {
        startCamera();
    }, []);
    
    return(
        <div className='text-light scale-in-ver-top instructions p-4 rounded-4 border border-2 darkTransparentBg' style={{ maxWidth: '450px' }}>
        <h4 className='fw-bold'>Instructions</h4>
        <p className='border-top border-2 pt-2'> Press the <span className='fst-italic fw-semibold'>Start Button </span>  
        when you are ready. Make sure you allow camera access to take photos. The Camera will start taking photos after 5 secs.</p>
        <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
        </div>
    )
}