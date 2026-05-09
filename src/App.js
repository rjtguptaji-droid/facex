import React, { useState } from 'react';
import './App.css';
import UploadZone from './components/UploadZone';
import ResultPanel from './components/ResultPanel';
import { detectFaces } from './api/faceDetect';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      <main className="main">
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
      </main>
    </div>
  );
}

export default App;