import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import BackgroundBtn from './BackgroundBtn';

interface PhotoProps {
    images: string[]
}


export default function Photo( {images}: PhotoProps)  {
    
    return(
        <Container className='containers mt-4'>
            <Row className='' style={{height: "80%"}}>
                <Col sm = {6} className='d-flex justify-content-center mb-2'>
                    <div className='photoStrip bg-light d-flex flex-column align-items-center pt-1'>
                        {
                            images.map((image:string, index:number) => (
                                    <img key = {index} src= {image}  className='fourByThree m-1' style={{width: "200px", transform: 'scaleX(-1)'}}/>
                            ))
                        }
                        <h2 className='text-center poppins-light-italic m-3'>H-Lens</h2>
                    </div>
                </Col>
                <Col className=' d-flex flex-column justify-content-center align-items-center my-5 my-sm-0'>
                <div className='text-light border rounded-2  darkTransparentBg p-2 bgBtnContainer' >
                    <h4 className='text-center fw-bold'>Select Background</h4>
                    <div className='d-flex flex-wrap justify-content-center'>
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                        <BackgroundBtn />
                    </div>
                </div>
                <div className='d-flex justify-content-evenly mt-2 bgBtnContainer'>
                <Button className='darkTransparentBg border-2 border-light p-2 mb-5 mb-sm-0'>Retake</Button>
                <Button className='darkTransparentBg border-2 border-light p-2 mb-5 mb-sm-0'>Download</Button>
                </div>
                </Col>
            </Row>
        </Container>
    )
}