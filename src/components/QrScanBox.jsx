import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";

const QrScanBox = () => {
  let navigate = useNavigate();
  const [camera, setCamera] = useState(false);

  useEffect(async () => {
    try {
      const hasCamera = await QrScanner.hasCamera();
      setCamera(hasCamera);
      if (hasCamera) {
        const qrScanBox = document.getElementById("qrScanBox");
        const qrScanner = new QrScanner(
          qrScanBox,
          (result) => {
            renderQrResult(result, qrScanner);
          },
          { highlightScanRegion: true }
        );
        qrScanner.start();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const renderQrResult = (result, qrScanner) => {
    if (result.data) {
      qrScanner.stop();
      navigate("/", {
        state: {
          qrId: result.data,
        },
      });
    }
  };

  return (
    <div>
      {camera ? (
        <video className="qrScanBox" id="qrScanBox"></video>
      ) : (
        <p>No camera</p>
      )}
    </div>
  );
};

export default QrScanBox;
