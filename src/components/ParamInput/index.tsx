import React, { useState } from 'react';
import './paramInput.css';

const ParamInput: React.FC<any> = (props) => {
  const [param, setParam] = useState('');

  function focusNextInput(input: HTMLInputElement) {
    if (input.parentElement) {
      if (input.parentElement.nextElementSibling) {
        if (input.parentElement.nextElementSibling.firstElementChild) {
          const sibling = input.parentElement.nextElementSibling.firstElementChild;

          if (sibling instanceof HTMLInputElement) {
            sibling.focus();
          }
        }
      }
    }
  }

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
            props.addRequest(param, props.row);
            focusNextInput(event.target as HTMLInputElement);
          }
        }}
      />
    </div>
  );
}

export default ParamInput;
