export function VideoResult({ selectedVideo, video, onSelectVideo, idx }) {
    const classVideo = (selectedVideo === idx && video.title) ? 'video-res mark-video' : 'video-res';
    return (
        <div className={classVideo} onClick={() => { onSelectVideo(video.videoId, idx) }} >
            <small>{video.title.substring(0, 35)}</small>
        </div>
    )
}