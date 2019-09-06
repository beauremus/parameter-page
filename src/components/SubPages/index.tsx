import React from 'react';
import './subPages.css';

type props = {
  pages: string[];
  currentPage: number;
  setCurrentPage(currentPage: number): void;
}

const SubPages: React.FC<props> = (props) => {
  function handleClick(index: number) {
    return () => props.setCurrentPage(index)
  }

  return (
    <div className="subPages">
      {props.pages.map((page, index) => {
        return <div key={index} className={`subPage${index === props.currentPage ? ' selected' : ''}`} onClick={handleClick(index)}>{page}</div>
      })}
    </div>
  );
}

export default SubPages;