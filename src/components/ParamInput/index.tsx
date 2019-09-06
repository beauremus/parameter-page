import React, { useState } from 'react';
import './paramInput.css';

const ParamInput: React.FC<any> = (props) => {
  const [param, setParam] = useState('');
  return (
    <div className="paramRow" id={`param-row-${props.row}`}>
      <input
        type="text"
        className="paramInput"
        id={`param-input-${props.row}`}
        value={param}
        onChange={event => {
          event.persist();
          setParam(event.target.value);
        }}
        onKeyUp={event => {
          event.persist();
          if (event.key === 'Enter') {
            props.addRequest(param);
          }
        }}
      />
    </div>
  );
}

export default ParamInput;

// newInput.addEventListener('keyup', ({ code, target }) => {
//   if (code === 'Enter') determineRequest(target);
// });
// newRow.appendChild(newInput);
