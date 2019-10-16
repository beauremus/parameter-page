import React from 'react';
import './paramRow.css';

const ParamRow: React.FC<any> = (props) => {
  const { reading, setting } = props.details;
  return (
    <div className="paramRow">
      <span className="name">{reading.info.name}</span>
      <span className="description">{reading.info.description}</span>
      <div className="data">
        <span className="setting">{setting.data.data.toFixed(2)}</span>
        <span className="dataValue">{reading.data.data.toFixed(2)}</span>
        <span className="units">{reading.info.units}</span>
      </div>
    </div>
  );
}

export default ParamRow;
