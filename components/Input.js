import React from 'react';

const Input = ({ label, ...rest }) => {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <input className="form-control" {...rest} />
    </div>
  );
};

export default Input;
