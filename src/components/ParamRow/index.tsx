import React from 'react';
import './paramRow.css';
import Name from '../Name';
import ParamStatus from "../ParamStatus";

type RowProps = {
  name: string;
  request: string;
  description: string;
  originalSetting?: string | number;
  currentSetting?: string | number;
  reading?: string | number;
  units?: string | number;
  status?: string;
  addRequest(newRequest: string): void;
}

const ParamRow: React.FC<RowProps> = (props) => {
  return (
    <div className="paramRow">
      <Name className="name" title={props.request} addRequest={props.addRequest}>{props.name}</Name>
      <span className="description">{props.description}</span>
      <div className="data">
        <span className="setting">{props.currentSetting}</span>
        <span className="dataValue">{props.reading}</span>
        <span className="units">{props.units}</span>
        <ParamStatus className="status">{props.status}</ParamStatus>
      </div>
    </div>
  );
}

export default ParamRow;
