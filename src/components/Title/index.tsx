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
  title: string;
  page: string;
  newPageTrigger: React.Dispatch<React.SetStateAction<string>>;
}

const Title: React.FC<TitleProps> = (props) => {
  const [page, setPage] = useState(props.page);

  return (
    <div className="App">
      <input
        type="text"
        style={style}
        onKeyUp={event => {
          event.persist()
          if (event.key === 'Enter') {
            props.newPageTrigger(page)
          }
        }}
        onChange={event => {
          event.persist();
          setPage(event.target.value);
        }}
        value={page}>
      </input>
      <span className="title">{props.title}</span>
    </div>
  );
}

export default Title;
