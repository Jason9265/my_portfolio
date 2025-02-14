import Header from "@/components/header";
import LiveStreamPlayer from "@/components/LiveStreamPlayer";

const About = () => {
  return (
    <>
      <Header />
      <p>About Page</p>
      <LiveStreamPlayer playbackUrl="https://2701edd366b5.ap-south-1.playback.live-video.net/api/video/v1/ap-south-1.239859454249.channel.kBBfMhSitD3c.m3u8" />
    </>
  );
};

export default About;
