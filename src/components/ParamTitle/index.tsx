import React, { useState } from 'react';
import './title.css';

const style: React.CSSProperties = {
  borderRadius: "0.2rem",
  backgroundColor: "inherit",
  borderStyle: "solid",
  width: "4ch",
  font: "inherit",
  color: "inherit",
  textAlign: "center"
}

type TitleProps = {
  page: string;
  possiblePages: string[];
  title: string;
  changePage(update: string): void;
}

const ParamTitle: React.FC<TitleProps> = (props) => {
  const [page, setPage] = useState(props.page);

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (props.possiblePages.includes(event.currentTarget.value)) {
        props.changePage(page);
      } else {
        console.log(`Page ${event.currentTarget.value} is not a parameter page`)
      }
    }
  }

  return (
    <div>
      <input
        type="text"
        style={style}
        onKeyUp={onKeyUp}
        onChange={event => { setPage(event.target.value) }}
        value={page}>
      </input>
      <span className="title">{props.title}</span>
    </div>
  );
}

export default ParamTitle;
