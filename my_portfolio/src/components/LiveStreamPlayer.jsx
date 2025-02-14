"use client"
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";


const LiveStreamPlayer = ({ playbackUrl }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        liveui: true,
        sources: [{ src: playbackUrl, type: "application/x-mpegURL" }]
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [playbackUrl]);

  return <video ref={videoRef} className="video-js vjs-default-skin" />;
};

export default LiveStreamPlayer;
