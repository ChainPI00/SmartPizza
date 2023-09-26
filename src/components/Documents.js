import React from 'react';

function Documents() {
  return (
    <div style={{ padding: '20px', height: '100vh' }}>
      <object
        data="/WHITEPAPER.PDF"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>
          It seems like your browser doesn't support PDF viewer. 
          <a href="/WHITEPAPER.PDF">Click here to download the PDF</a>.
        </p>
      </object>
    </div>
  );
}

export default Documents;
