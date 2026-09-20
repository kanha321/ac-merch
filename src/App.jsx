import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [stage, setStage] = useState("loading"); // "loading" | "error" | "video"
  const videoRef = useRef(null);

  useEffect(() => {
    // Preload video in background
    if (videoRef.current) {
      videoRef.current.load();
    }

    // Transition from loading to error screen after 2.3 seconds
    const timer = setTimeout(() => {
      setStage("error");
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setStage("video");

    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.currentTime = 0;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Autoplay play error:", err);
        });
      }
    }
  };

  return (
    <>
      {/* Fullscreen Video Stage (No logo, edge-to-edge) */}
      <div
        className="fullscreen-video-container"
        style={{ display: stage === "video" ? "flex" : "none" }}
      >
        <video
          ref={videoRef}
          src={`${import.meta.env.BASE_URL}ruko_zara.mp4`}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          loop
          className="fullscreen-video"
        />
      </div>

      {/* Main Centered UI (Stage 1 & Stage 2) */}
      {stage !== "video" && (
        <div className="app-container">
          {stage === "loading" && (
            <div className="loading-box">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Application Club" className="ac-logo" />
              <div className="loading-label">Loading Drop Preview...</div>
            </div>
          )}

          {stage === "error" && (
            <div className="error-wrapper">
              <div className="error-card">
                {/* On-theme status badge */}
                <div className="status-pill">
                  <span className="status-dot"></span>
                  <span>AC-NET // 503 SERVICE TEMPORARILY UNAVAILABLE</span>
                </div>

                {/* Minimalist SVG Alert Icon */}
                <div className="error-icon-box">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>

                <h2 className="error-title">Unable to Fetch Preview</h2>
                
                <p className="error-desc">
                  An unexpected network interruption occurred while decrypting the exclusive merchandise assets.
                </p>

                {/* On-theme Reload Button with crisp SVG */}
                <button
                  id="reloadBtn"
                  onClick={handleReload}
                  className="reload-btn"
                >
                  <svg
                    className="reload-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M21 21v-5h-5" />
                  </svg>
                  <span>Reload Page</span>
                </button>

                <div className="error-meta">
                  <span>ERR_CONNECTION_TIMED_OUT</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
