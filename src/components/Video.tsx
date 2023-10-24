import React from 'react';

interface VideoProps {
 className: string
  title: string;
  src: string;
  poster: string
  captionSrc: string
}

function Video({
  className = '', title = '', src = '', poster = '', captionSrc = '',
} : VideoProps) {
  return src.includes('youtube')
    ? (
      <iframe
        style={{ border: 'none', width: '100%', aspectRatio: '16/9' }}
        data-testid="video"
        src={`${src}?autoplay=0&muted=0&controls=1`}
        title={title}
        allow="autoplay"
        width="100%"
        className="w-full aspect-video"
        allowFullScreen
      />
    )
    : (
      <video
        style={{
          border: 'none', width: '100%', aspectRatio: '16/9', objectFit: 'cover',
        }}
        poster={poster}
        className={className}
        data-testid="video"
        autoPlay={false}
        src={src}
        title={title}
        controls
      >
        <track kind="captions" label="Captions" src={captionSrc} srcLang="en" default={captionSrc > ''} />
        <source title={title} type="mp4" src={src} />
        Your browser does not support this kind of video.
      </video>
    );
}
export default Video;
