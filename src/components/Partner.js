import React from 'react';

function Partner() {
  const containerStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '80px', // Imposta il margine superiore a 50px
  };

  const partnerImageStyle = {
    maxWidth: '150px',
    margin: '0 10px',
  };

  const textStyle = {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle} className="partner-list">
        <div className="partner-item">
          <img src="/partner1.png" alt="Partner 1" style={partnerImageStyle} />
        </div>
        <div className="partner-item">
          <img src="/partner2.png" alt="Partner 2" style={partnerImageStyle} />
        </div>
        {/* Aggiungi altri partner qui */}
    </div>
  );
}

export default Partner;
