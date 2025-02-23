import 'bootstrap/dist/css/bootstrap.min.css';

interface AboutContentProps {
    header:string,
    body:string,
    italic: string,
    body2:string
}

export default function AboutContent( {header, body, italic, body2}:AboutContentProps ) {

    return (
        <div className='my-4'>
                <h2 className=' mt-4 pt-4 text-light focus-in-contract-bck text-center'>{header}</h2>
                <p className='text-light text-center text-focus-in' style={{maxWidth: "500px"}}>
                    {body} <span className='fst-italic'>{italic + ", "}</span> {body2}
                </p>
            </div>
    )
}