import 'bootstrap/dist/css/bootstrap.min.css';
import rotatePhone from '../assets/rotatePhone.png'

export default function RotatePhone() {

    return(
        <div className='containers scale-in-ver-top darkTransparentBg d-flex flex-column align-items-center justify-content-center'>
                <img className='rotatePhone' src={rotatePhone} style={{width: "300px"}}></img>
                <h2 className='scale-in-ver-top text-light fw-bold fs-1' style={{animationDelay: "0.25s"}}>Rotate Phone</h2>
                <h3 className='scale-in-ver-top text-light text-center p-2' style={{animationDelay: "0.45s"}}>For Mobile users, please use<span className='fw-bold text-decoration-underline'> landscape</span> mode for better image quality</h3>
                <p className='scale-in-ver-top text-light text-center p-2 fw-light m-2' style={{animationDelay: "0.75s"}}>enable auto-rotate if necessary</p>
         </div>
    )
}
