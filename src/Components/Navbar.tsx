import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCamera, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

    return(
        <Nav className='bg-transparent navBubble d-flex'>
            <div className='darkTransparentBg border border-2 rounded-5 p-2 mt-2 d-flex align-items-center justify-content-center'>
                <Nav.Link href='#' className='text-white navButton'><FontAwesomeIcon icon={faHouse} /></Nav.Link>
                <Nav.Link href='#' className='text-white navButton'><FontAwesomeIcon icon={faCamera} /></Nav.Link>
                <Nav.Link href='#' className='text-white navButton'><FontAwesomeIcon icon={faCircleQuestion} /></Nav.Link>
            </div>
        </Nav>
    )
}