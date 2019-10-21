import React from 'react';
import './subPages.css';

type SubPages = {
  subPage: number;
  tab: number;
}

type SubPageProps = {
  subPage: number;
  tabs: string[];
  tab: number;
  changeSubPage(subPages: SubPages): void;
}

const SubPages: React.FC<SubPageProps> = (props) => {
  return (
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
  );
}

export default SubPages;