import 'bootstrap/dist/css/bootstrap.min.css';
// import BackgroundBtn from './BackgroundBtn';
import { Button } from 'react-bootstrap'

interface SelectBgContainerProps {
    handleSetBackground: (type:string, value:string) => void;
}

export default function SelectBgContainer({ handleSetBackground }: SelectBgContainerProps) {

    const colors = ['white', 'black', '#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#c9c9ff']
    const backgrounds = [
        '/assets/blob-scene-haikei.svg',
        '/assets/blurry-gradient-haikei.svg',
        '/assets/circle-scatter-haikei.svg',
        '/assets/layered-steps-haikei.svg',
        '/assets/layered-waves-haikei.svg',
        '/assets/symbol-scatter-haikei.svg',
        '/assets/wave-haikei.svg'
    ];

  return <div className='text-light border rounded-4  darkTransparentBg p-2 bgBtnContainer'>
                <h4 className='text-center fw-bold'>Select Background</h4>
                <div className='d-flex flex-wrap justify-content-center'>
                    {
                        colors.map((color) => (
                             <Button onClick={() => handleSetBackground('color', color)} className='square rounded-circle border border-2 mt-2 mx-1' style={{minWidth: "48px", backgroundColor: `${color}`}} />
                        ))
                    }
                    {
                        backgrounds.map((bg) => (
                            <Button onClick={() => handleSetBackground('background', bg)} className='bgImgDefault square rounded-circle border border-2 mt-2 mx-1' style={{minWidth: "48px", objectFit: "cover", backgroundPosition: "bottom" , backgroundImage: `url(${bg})`}} />
                        ))
                    }
                </div>
        </div>;
}
  