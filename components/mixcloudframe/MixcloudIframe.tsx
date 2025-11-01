"use client";

import { useEffect, useRef } from "react";

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
    play?: {
      on: (callback: () => void) => void;
    };
    pause?: {
      on: (callback: () => void) => void;
    };
  };
}

export const MixcloudIframe = ({ trackKey }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // 1. Load Mixcloud script if not already loaded
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

    // 2. Wait for iframe to load
    const handleLoad = () => {
      if (!iframe || !window.Mixcloud) return;

      const widget = window.Mixcloud.PlayerWidget(iframe);

      // Poll until events exist
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

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [trackKey]);

  return (
    <iframe
      ref={iframeRef}
      width="100%"
      height="120"
      src={`https://www.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(
        trackKey
      )}&autoplay=1`}
      frameBorder="0"
      allow="autoplay"
    ></iframe>
  );
};
