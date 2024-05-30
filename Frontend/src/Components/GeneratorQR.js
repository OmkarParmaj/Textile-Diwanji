import React from 'react';
import QRCode from 'qrcode.react';

const GeneratorQR = ({ value }) => {
  return (
    <div>
      <h2>QR Code</h2>
      <QRCode value={value} />
    </div>
  );
};

export default GeneratorQR;
