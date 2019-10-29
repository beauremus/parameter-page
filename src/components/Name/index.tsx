import React, { useState } from 'react';
import './name.css';

type NameProps = {
  addRequest(newRequest: string): void;
}

const Name: React.FC<NameProps & React.HTMLAttributes<HTMLInputElement>> = (props) => {
  const [focused, setFocused] = useState(false);
  const [name, setName] = useState(props.children as string);

  function updateRow() {
    setFocused(false);
    props.addRequest(name);
  }

  return (
    <>
      {focused
        ? <input
          ref={(input) => input ? input.focus() : ''}
          type="text"
          className={props.className}
          onBlur={updateRow}
          onKeyUp={(event) => {
            if (event.key === 'Enter') updateRow();
          }}
          onChange={(event) => setName(event.currentTarget.value)}
          value={name} />
        : <span
          className={props.className}
          title={props.title}
          onClick={() => setFocused(true)}
        >
          {props.children}
        </span>
      }
    </>
  );
}

export default Name;