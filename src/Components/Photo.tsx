import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import SelectBgContainer from './SelectBgContainer';
import { useCallback, useEffect, useState } from 'react';


interface PhotoProps {
    images: string[],
    handleRetake: () => void
}


export default function Photo( {images, handleRetake}: PhotoProps)  {

    const [photoBackground, setPhotoBackground] = useState({type: 'color', value: 'white'})
    const [currentPhotoBg, setCurrentPhotoBg] = useState({})

    const handleDownload = async () => {
        const photoStrip = document.querySelector('.photoStrip') as HTMLElement;
        if (!photoStrip) return;
        photoStrip.classList.remove('tilt-in-tl');

    
        try {
            const canvas = await html2canvas(photoStrip, {
                scale: 2, // Increase for higher quality
                useCORS: true, // Handle external images
                allowTaint: true, // Allow cross-origin images
                logging: true, // Helpful for debugging
                backgroundColor: '#ffffff' // Match your background
            });
    
            // Trigger download
            const link = document.createElement('a');
            link.download = 'h-lens-photobooth.png';
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
        } catch (error) {
            console.error('Error generating canvas:', error);
        }
        finally {
        photoStrip.classList.add('jello-horizontal');
    }
    };

    const handleSetBackground = (setType:string, setValue:string) => {
        setPhotoBackground({type: setType, value: setValue})
    }

    const stylePhotoBg = useCallback(() => {
        if (photoBackground.type === 'color') {
            return {backgroundColor: photoBackground.value}
        }
        else {
            return {backgroundImage: `url(${photoBackground.value})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}
        }
    }, [photoBackground])

    useEffect(() => {
        setCurrentPhotoBg(stylePhotoBg())
    },[photoBackground, stylePhotoBg])


    
    return(
        <Container className='containers mt-4'>
            <Row className='' style={{height: "80%"}}>
                <Col sm = {6} className='d-flex justify-content-center mb-2'>
                    <div className='photoStrip tilt-in-tl d-flex flex-column align-items-center p-1' style={currentPhotoBg}>
                        {
                            images.map((image: string, index: number) => (
                                <img 
                                    key={index} 
                                    src={image}  
                                    className='fourByThree m-1' 
                                    style={{
                                        width: "200px", 
                                        height: "auto", 
                                        transform: 'scaleX(-1)', 
                                        objectFit: "cover", 
                                        backgroundPosition: "center"
                                    }} 
                                />
                            ))
                        }
                        {/* <h2 className='text-center poppins-light-italic m-3'>H-Lens</h2> */}
                    </div>
                </Col>
                <Col className=' d-flex flex-column justify-content-center align-items-center my-5 my-sm-0'>
                    <SelectBgContainer  handleSetBackground = {handleSetBackground}   />
                    <div className='d-flex justify-content-center mt-2 bgBtnContainer mb-5 mb-sm-0'>
                        <Button onClick={() => handleRetake()} className='darkTransparentBg border-2 mx-2 border-light p-2 mb-5 mb-sm-0'>Retake</Button>
                        <Button onClick={handleDownload} className='darkTransparentBg jello-horizontal border-2 mx-2 border-light p-2 mb-5 mb-sm-0'>Download</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}