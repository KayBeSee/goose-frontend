export const getTrackIdsFromVideo = (video) => {
  const trackIds = [];
  video && video.tracks.forEach((track) => {
    trackIds.push(track.id);
  });
  return trackIds;
}

export const getVideoByVideoId = (targetVideoId, videos) => {
  if (targetVideoId) {
    let selectedVideo = null;
    videos.forEach((video) => {
      if (video.videoId === targetVideoId) {
        selectedVideo = video;
      }
    });
    return selectedVideo;
  }
}