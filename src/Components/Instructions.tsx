import 'bootstrap/dist/css/bootstrap.min.css';

export default function Instructions() {

    return(
        <div className='text-light instructions p-4 rounded-4 border border-2 darkTransparentBg'>
            <h4 className='fw-bold'>Instructions</h4>
            <p className=' border-top border-2 pt-2'> Press the <span className='fst-italic fw-semibold'>Start Button </span>  
        when you are ready. The Camera will start taking photos after 5 secs.</p>
        </div>
    )
}