import React, { useState } from 'react';
import './App.css';
import UploadZone from './components/UploadZone';
import ResultPanel from './components/ResultPanel';
import WebcamDetector from './components/WebcamDetector';
import { detectFaces } from './api/faceDetect';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('upload');

  const handleImage = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResults(null);
    setError(null);
  };

  const handleDetect = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    try {
      const data = await detectFaces(image);
      setResults(data);
    } catch (err) {
      setError('Detection failed. Check your API key.');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Face<span>X</span></h1>
        <p>AI-powered face detection & emotion analysis</p>
      </header>

      <div className="mode-switcher">
        <button
          className={`mode-btn ${mode === 'upload' ? 'active' : ''}`}
          onClick={() => setMode('upload')}
        >
          📤 Upload Image
        </button>
        <button
          className={`mode-btn ${mode === 'live' ? 'active' : ''}`}
          onClick={() => setMode('live')}
        >
          📷 Live Camera
        </button>
      </div>

      <main className="main">
        {mode === 'upload' ? (
          <>
            <UploadZone onImage={handleImage} preview={preview} />
            {preview && (
              <button
                className={`detect-btn ${loading ? 'loading' : ''}`}
                onClick={handleDetect}
                disabled={loading}
              >
                {loading ? 'Analysing...' : '⚡ Detect Faces'}
              </button>
            )}
            {error && <p className="error">{error}</p>}
            {results && <ResultPanel results={results} />}
          </>
        ) : (
          <WebcamDetector />
        )}
      </main>
    </div>
  );
}

export default App;