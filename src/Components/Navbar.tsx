import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCamera, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

export default function Navbar( { onChangeView } ) {

    return(
        <Nav className='bg-transparent navBubble d-flex' style={{zIndex:0}}>
            <div className='darkTransparentBg border border-2 rounded-5 p-2 mt-2 d-flex align-items-center justify-content-center'>
                <Button onClick={() => onChangeView('home')} className='text-white navButton bg-transparent border-0 m-1 fs-5'><FontAwesomeIcon icon={faHouse} /></Button>
                <Button onClick={() => onChangeView('photobooth')} className='text-white navButton bg-transparent border-0 m-1 fs-5'><FontAwesomeIcon icon={faCamera} /></Button>
                <Button className='text-white navButton bg-transparent border-0 m-1 fs-5'><FontAwesomeIcon icon={faCircleQuestion} /></Button>
            </div>
        </Nav>
    )
}