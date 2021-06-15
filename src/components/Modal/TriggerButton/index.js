import React from 'react';
const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button
      className="btn-white loginSignbtn color-blue-dark"
      ref={buttonRef}
      onClick={showModal}
      style={{width: '100%', border: 'none'}}
    >
      {triggerText}
    </button>
  );
};
export default Trigger;
