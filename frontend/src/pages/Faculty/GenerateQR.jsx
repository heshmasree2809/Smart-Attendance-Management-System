import React, { useRef, useState } from "react";
import QRCode from "qrcode";

export default function GenerateQR() {
  const canvasRef = useRef(null);
  const [classId, setClassId] = useState("");

  const generateQRHandler = async () => {
    if (!classId) return alert("Enter class or period");

    const data = JSON.stringify({
      classId,
      timestamp: Date.now(),
    });

    await QRCode.toCanvas(canvasRef.current, data, { width: 250 });
  };

  return (
    <div>
      <h1 className="section-title">Generate QR</h1>

      <div className="card-soft space-y-4">
        <input
          className="input"
          placeholder="Enter Class / Period"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />

        <button className="btn btn-primary" onClick={generateQRHandler}>
          Generate QR
        </button>

        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
