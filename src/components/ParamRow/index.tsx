import React from 'react';
import './paramRow.css';

type RowProps = {
  name: string;
  request: string;
  description: string;
  originalSetting?: string | number;
  currentSetting?: string | number;
  reading?: string | number;
  units?: string | number;
  status?: string;
}

const ParamRow: React.FC<RowProps> = (props) => {
  return (
    <div className="paramRow">
      <span className="name" title={props.request}>{props.name}</span>
      <span className="description">{props.description}</span>
      <div className="data">
        <span className="setting">{props.currentSetting}</span>
        <span className="dataValue">{props.reading}</span>
        <span className="units">{props.units}</span>
      </div>
    </div>
  );
}

export default ParamRow;
