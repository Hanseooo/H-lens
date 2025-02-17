import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import BackgroundBtn from './BackgroundBtn';

export default function Photo( props:any )  {
    
    return(
        <Container className='containers mt-4'>
            <Row className='' style={{height: "80%"}}>
                <Col sm = {6} className='d-flex justify-content-center'>
                    <div className='photoStrip bg-light'>
                        
                    </div>
                </Col>
                <Col className=' d-flex flex-column justify-content-center'>
                <div className='text-light border rounded-2  darkTransparentBg p-2' >
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
                <div className='d-flex justify-content-evenly mt-2'>
                <Button className='border-2 border-light bg-transparent p-2'>Retake</Button>
                <Button className='darkTransparentBg border-2 border-light p-2'>Download</Button>
                </div>
                </Col>
            </Row>
        </Container>
    )
}