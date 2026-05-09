import React, { useRef } from 'react';
import './UploadZone.css';

function UploadZone({ onImage, preview }) {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onImage(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onImage(file);
  };

  return (
    <div
      className="upload-zone"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      {preview ? (
        <div className="preview-wrapper">
          <img src={preview} alt="preview" className="preview-img" />
          <p className="change-text">Click to change image</p>
        </div>
      ) : (
        <div className="upload-placeholder">
          <span className="upload-icon">📸</span>
          <p>Drag & drop an image here</p>
          <span>or click to browse</span>
        </div>
      )}
    </div>
  );
}

export default UploadZone;