interface VideoViewProps {
  videoId: string;
}

const VideoView = ({ videoId }: VideoViewProps) => {
  return <div className="px-4 pt-2.5 max-w-screen">{videoId}</div>;
};

export default VideoView;
