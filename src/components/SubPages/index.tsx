import React, { useState, useEffect } from 'react';
import './subPages.css';

const style: React.CSSProperties = {
  borderRadius: "0.2rem",
  backgroundColor: "inherit",
  borderStyle: "solid",
  width: "4ch",
  font: "inherit",
  color: "inherit",
  textAlign: "center"
}

type SubPages = {
  subPage: number;
  tab: number;
}

type SubPageProps = {
  subPage: number;
  subPageCount: number;
  tabs: string[];
  tab: number;
  changeSubPage(subPages: SubPages): void;
}

const SubPages: React.FC<SubPageProps> = (props) => {
  const [subPage, setSubPage] = useState(props.subPage);
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      setSubPage(props.subPage);
    }

    return () => { ignore = true; };
  }, [props.subPage])

  const onInput = (event: React.FormEvent<HTMLInputElement>) => {
    let newSubPage = Number(event.currentTarget.value);
    if (newSubPage < 1 || newSubPage > 99) {
      setSubPage(newSubPage);
    }

    try {
      props.changeSubPage({ subPage: newSubPage, tab: props.tab });
    } catch (e) {
      console.log(`Page ${event.currentTarget.value} is not a valid parameter page`)
    }
  }

  return (
    <>
      <input
        type="number"
        min={1}
        max={props.subPageCount || 99}
        style={style}
        onInput={onInput}
        onChange={event => { setSubPage(Number(event.target.value)) }}
        value={subPage}>
      </input>
      <div className="subPages">
        {props.tabs.map((tab, index) => {
          return (
            <div
              key={`${index}${tab}`}
              className={`subPage${index === props.tab ? ' selected' : ''}`}
              onClick={() => props.changeSubPage({ subPage: props.subPage, tab: index })}
            >
              {tab}
            </div>
          )
        })}
      </div>
    </>
  );
}

export default SubPages;