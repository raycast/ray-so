import { useEffect, useMemo, useState } from "react";

const isDev = process.env.NODE_ENV === "development";

const useAudio = (path: string): [boolean, () => void] => {
  let url: string;
  if (isDev) {
    url = `http://localhost:3000/${path}`;
  } else {
    url = `https://ray.so/${path}`;
  }

  const audio = useMemo(() => new Audio(url), [url]);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    const handleEnd = () => setPlaying(false);
    audio.addEventListener("ended", handleEnd);
    return () => {
      audio.removeEventListener("ended", handleEnd);
    };
  }, [audio]);

  return [playing, toggle];
};

export default useAudio;
