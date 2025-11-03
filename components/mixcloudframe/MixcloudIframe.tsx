"use client";

import { useEffect, useRef } from "react";
import "./MixcloudIframe.css";

type Props = {
  trackKey: string;
};

declare global {
  interface Window {
    Mixcloud: {
      PlayerWidget: (iframe: HTMLIFrameElement) => MixcloudWidget;
    };
  }
}

interface MixcloudWidget {
  events?: {
    play?: { on: (callback: () => void) => void };
    pause?: { on: (callback: () => void) => void };
  };
}

export const MixcloudIframe = ({ trackKey }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    if (
      !document.querySelector(
        'script[src="https://widget.mixcloud.com/media/js/widgetApi.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const handleLoad = () => {
      if (!iframe || !window.Mixcloud) return;

      const widget = window.Mixcloud.PlayerWidget(iframe);

      const interval = setInterval(() => {
        if (widget.events?.play && widget.events?.pause) {
          widget.events.play.on(() =>
            window.dispatchEvent(new Event("mixcloudPlay"))
          );
          widget.events.pause.on(() =>
            window.dispatchEvent(new Event("mixcloudPause"))
          );
          clearInterval(interval);
        }
      }, 100);
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [trackKey]);

  return (
    <div className="mixcloud-player-wrapper">
      <iframe
        ref={iframeRef}
        src={`https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(
          trackKey
        )}&hide_cover=1&light=0&mini=0`}
        frameBorder="0"
        allow="autoplay"
        className="mixcloud-player"
        title="Mixcloud Player"
      ></iframe>
    </div>
  );
};
