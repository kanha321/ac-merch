import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [stage, setStage] = useState("loading"); // "loading" | "error" | "video"
  const [videoEnded, setVideoEnded] = useState(false);
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
    setVideoEnded(false);

    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.currentTime = 0;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Autoplay error:", err);
        });
      }
    }
  };

  const handleReplay = () => {
    setVideoEnded(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <>
      {/* STAGE 3: Video Stage with Smooth Post-Video Transition */}
      <div
        className={ideo-stage-container }
        style={{ display: stage === "video" ? "flex" : "none" }}
      >
        {/* Video Wrapper (Translates Left on Desktop, Top on Mobile) */}
        <div className="video-viewport-wrapper">
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}ruko_zara.mp4`}
            playsInline
            webkit-playsinline="true"
            preload="auto"
            onEnded={() => setVideoEnded(true)}
            className="fullscreen-video"
          />
        </div>

        {/* Revealed Text Section (Right on Desktop, Bottom on Mobile) */}
        <div className="merch-reveal-section">
          <div className="merch-reveal-box">
            <div className="reveal-tag">*** NOTICE ***</div>

            <h1 className="reveal-title">
              WAIT TILL YOU
              <br />
              GET YOUR MERCH
            </h1>

            <div className="reveal-divider">-----------------</div>

            <p className="reveal-subtitle">
              OFFICIAL DROP DROPPING SOON
            </p>

            <button onClick={handleReplay} className="nes-replay-btn">
              ↺ WATCH AGAIN
            </button>

            <div className="reveal-footer">
              &lt;APPLICATION_CLUB_MNNIT/&gt;
            </div>
          </div>
        </div>
      </div>

      {/* Main UI (Stage 1 Loading & Stage 2 Fullscreen Error) */}
      {stage !== "video" && (
        <div className="main-viewport">
          {/* STAGE 1: Centered Breathing Logo Loading */}
          {stage === "loading" && (
            <div className="loading-box">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Application Club"
                className="ac-logo"
              />
              <div className="loading-text">LOADING DROP PREVIEW...</div>
              <div className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}

          {/* STAGE 2: Full-screen 8-Bit NES Error Screen */}
          {stage === "error" && (
            <div className="nes-fullscreen-error">
              <div className="scanlines"></div>

              {/* DESKTOP ERROR VIEW */}
              <div className="nes-desktop-layout">
                <div className="nes-border-box">
                  <div className="nes-header-line">
                    <span className="nes-blink-star">***</span>
                    <span className="nes-main-title">APPLICATION CLUB MNNIT</span>
                    <span className="nes-blink-star">***</span>
                  </div>

                  <div className="nes-error-banner">
                    SYSTEM ERROR: 503 // ASSETS CORRUPTED
                  </div>

                  <div className="nes-terminal-log">
                    <p className="log-item">{">"} SYSTEM CHECK: MNNIT_SERVER_OK</p>
                    <p className="log-item">{">"} FETCHING MERCHANDISE PACKAGES...</p>
                    <p className="log-item red">{">"} ERROR: 0x503_DROP_UNRESOLVED</p>
                    <p className="log-item">{">"} SECRET_DROP_PROTOCOL: ENCRYPTED</p>
                    <p className="log-item">{">"} PREVIEW_DECRYPTION: REJECTED</p>
                    <p className="log-item yellow">{">"} SYSTEM HALTED: MANUAL RELOAD REQUIRED</p>
                  </div>

                  <div className="nes-action-section">
                    <button
                      id="reloadBtnDesktop"
                      onClick={handleReload}
                      className="nes-retro-btn"
                    >
                      {">"} RELOAD PAGE {"<"}
                    </button>
                    <div className="nes-subhint">
                      [ PRESS BUTTON TO RETRY ]
                    </div>
                  </div>

                  <div className="nes-footer-line">
                    <span>CODE . CREATE . CONQUER</span>
                    <span>APPLICATION CLUB MNNIT</span>
                  </div>
                </div>
              </div>

              {/* MOBILE ERROR VIEW */}
              <div className="nes-mobile-layout">
                <div className="nes-mobile-box">
                  <div className="nes-mobile-tag">[ AC-MNNIT OS ]</div>

                  <div className="nes-mobile-title">
                    *** ERROR 503 ***
                  </div>

                  <div className="nes-mobile-msg">
                    DROP ASSETS
                    <br />
                    FAILED TO LOAD
                  </div>

                  <div className="nes-mobile-log">
                    <div className="log-row">
                      <span>STATUS:</span>
                      <span className="red">HALTED</span>
                    </div>
                    <div className="log-row">
                      <span>CODE:</span>
                      <span>0x503</span>
                    </div>
                    <div className="log-row">
                      <span>ASSET:</span>
                      <span className="yellow">TIMEOUT</span>
                    </div>
                  </div>

                  <button
                    id="reloadBtn"
                    onClick={handleReload}
                    className="nes-mobile-btn"
                  >
                    ▶ RELOAD PAGE ◀
                  </button>

                  <div className="nes-mobile-hint">
                    TAP TO RETRY<span className="cursor">_</span>
                  </div>

                  <div className="nes-mobile-footer">
                    &lt;MNNIT_ALLAHABAD/&gt;
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
