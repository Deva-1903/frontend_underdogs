import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRCodeScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(onScanSuccess, onScanFailure);
    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(error => {
        console.error('Failed to clear html5QrcodeScanner. ', error);
      });
    };
  }, []);

  const onScanSuccess = (decodedText, decodedResult) => {
    setScanResult(decodedText);
    console.log(decodedText)
    // Send the scanned data to the backend for attendance logging
    fetch('/attendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ qrData: decodedText })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Attendance logged successfully!');
    })
    .catch(error => console.error('Error:', error));
  };

  const onScanFailure = (error) => {
    // handle scan failure, usually better to ignore and keep scanning
    console.warn(`QR Code no longer in front of camera.`, error);
  };

  return (
    <div>
      <h2>Scan your QR Code</h2>
      <div id="qr-reader" style={{ width: '300px' }}></div>
      <p>{scanResult}</p>
    </div>
  );
};

export default QRCodeScanner;
