import { forwardRef } from "react";


interface CameraVideoProps {
  isFlashing: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  filter: string;
  applyFilters: (filter: string) => string;
}
const CameraVideo = forwardRef<HTMLDivElement, CameraVideoProps>(({ isFlashing, videoRef, filter, applyFilters }, ref) => {
  return (
    <div
      ref={ref}
      className={`p-3 bg-light shadow ${isFlashing ? 'camera-flash' : ''}`}
      style={{ filter: applyFilters(filter) }} // Apply filter to the parent div
    >
      <div className={`${isFlashing ? 'camera-flash fourByThree' : ''}`} style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
      }} />
      <video
        className=''
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: '100%',
          maxWidth: '520px',
          transform: 'scaleX(-1)',
          objectFit: "cover"
        }}
      />
    </div>
  );
});

export default CameraVideo;