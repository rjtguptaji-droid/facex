import React from 'react';
import './ResultPanel.css';

function ResultPanel({ results }) {
  if (!results || results.length === 0) {
    return (
      <div className="no-faces">
        <span>😶</span>
        <p>No faces detected. Try another image!</p>
      </div>
    );
  }

  return (
    <div className="result-panel">
      <h2>{results.length} Face{results.length > 1 ? 's' : ''} Detected</h2>
      <div className="face-grid">
        {results.map((face, index) => (
          <div className="face-card" key={index}>
            <div className="face-number">Face {index + 1}</div>

            <div className="attr-row">
              <span className="attr-label">😄 Emotion</span>
              <span className="attr-value emotion">{face.emotion}</span>
            </div>

            <div className="attr-row">
              <span className="attr-label">🎂 Age</span>
              <span className="attr-value">{face.age}</span>
            </div>

            <div className="attr-row">
              <span className="attr-label">👤 Gender</span>
              <span className="attr-value">{face.gender}</span>
            </div>

            <div className="attr-row">
              <span className="attr-label">😊 Smile</span>
              <span className="attr-value">{face.smile}</span>
            </div>

            <div className="confidence-bar">
              <span className="attr-label">Confidence</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: face.confidence }}
                ></div>
              </div>
              <span className="confidence-num">{face.confidence}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultPanel;