import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  blurSrc: string;
  alt: string;
}

export default function ProgressiveImage({ src, blurSrc, alt }: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Blur Image */}
      <img
        src={blurSrc}
        alt=""
        aria-hidden
        className={`
          absolute inset-0
          w-full h-full
          object-cover
          transition-all duration-1000 ease-out
          ${
            loaded
              ? "opacity-0 scale-100 blur-0"
              : "opacity-100 scale-110 blur-xl"
          }
        `}
      />

      {/* Real Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => {
          setLoaded(true);
        }}
        className={`
          absolute inset-0
          w-full h-full
          object-cover
          transition-all duration-1000 ease-out
          ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
        `}
      />
    </div>
  );
}
