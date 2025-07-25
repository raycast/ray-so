import { useEffect, useMemo, useState } from "react";

const useAudio = (path: string): [boolean, () => void] => {
  const audio = useMemo(() => new Audio(`/${path}`), [path]);
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
