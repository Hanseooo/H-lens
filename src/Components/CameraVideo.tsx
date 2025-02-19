
interface CameraVideoProps {
  isFlashing: boolean,
  videoRef: React.RefObject<HTMLVideoElement | null>
}
export default function CameraVideo({
  isFlashing,
  videoRef
}: CameraVideoProps) {
  return <div className={`p-3 bg-light shadow ${isFlashing ? 'camera-flash' : ''}`}>
                <div className={`${isFlashing ? 'camera-flash fourByThree' : ''}`} style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 1,
      top: "50%",
      left: "50%",
      transform: 'translate(-50%, -50%)'
    }} />
                <video className='' ref={videoRef} autoPlay playsInline style={{
      width: '100%',
      maxWidth: '520px',
      transform: 'scaleX(-1)',
      objectFit: "cover"
    }} />
                </div>;
}
  