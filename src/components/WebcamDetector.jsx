import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './WebcamDetector.css';

function WebcamDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    loadModels();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]);
      setLoading(false);
    } catch (err) {
      setError('Failed to load AI models. Please refresh.');
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        setStarted(true);
        startDetection();
      };
    } catch (err) {
      setError('Camera access denied. Please allow camera permission.');
    }
  };

  const startDetection = () => {
    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;
      if (videoRef.current.readyState !== 4) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({
          inputSize: 224,
          scoreThreshold: 0.5
        }))
        .withFaceExpressions()
        .withAgeAndGender();

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      detections.forEach((detection) => {
        const { x, y, width, height } = detection.detection.box;
        const emotion = getTopEmotion(detection.expressions);
        const age = Math.round(detection.age);
        const gender = detection.gender;

        ctx.strokeStyle = '#4f8ef7';
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        const label = `${emotion} | ${gender} | ${age}y`;
        ctx.font = 'bold 14px Segoe UI';
        const textWidth = ctx.measureText(label).width;

        ctx.fillStyle = '#4f8ef7';
        ctx.fillRect(x, y - 30, textWidth + 12, 30);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, x + 6, y - 10);
      });
    }, 200);
  };

  const getTopEmotion = (expressions) => {
    return Object.entries(expressions)
      .sort((a, b) => b[1] - a[1])[0][0];
  };

  return (
    <div className="webcam-container">
      {error && <p className="webcam-error">{error}</p>}

      {loading ? (
        <div className="webcam-loading">
          <div className="spinner"></div>
          <p>Loading AI models...</p>
        </div>
      ) : !started ? (
        <div className="webcam-start">
          <span className="webcam-icon">📷</span>
          <p>Real-time face detection using your camera</p>
          <button className="start-btn" onClick={startWebcam}>
            ⚡ Start Camera
          </button>
        </div>
      ) : null}

      <div className="video-wrapper" style={{ display: started ? 'block' : 'none' }}>
        <video ref={videoRef} className="webcam-video" muted playsInline />
        <canvas ref={canvasRef} className="webcam-canvas" />
      </div>
    </div>
  );
}

export default WebcamDetector;