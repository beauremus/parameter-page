import React, { useState } from 'react';
import { ACNET } from "@fnal/acnet";
import DPM, { DPMContext, RequestMap } from "@fnal/app-framework/components/DPM";
import './App.css';
import Title from './components/Title';
import SubPages from './components/SubPages';
import Panel from './components/Panel';
import ParamRow from './components/ParamRow';
import ParamInput from './components/ParamInput';

type AppProps = {
  acnet: ACNET;
}

const App: React.FC<AppProps> = (props) => {
  const [requestList, setRequestList] = useState(["D:OUTTMP@P,15H", "G:SCTIME@P,15H"]);
  const [paramRows, setParamRows] = useState(Array(30).fill({param: ''}));
  const [currentPage, setCurrentPage] = useState('R192');
  const [pageTitle, setPageTitle] = useState('');
  const [subPages, setSubPages] = useState(["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"]);
  const [currentSubPage, setCurrentSubPage] = useState(0);

  return (
    <DPM acnet={props.acnet} drf={requestList}>
      <Panel>
        <Title title={pageTitle} page={currentPage} newPageTrigger={setCurrentPage}/>
        <SubPages pages={subPages} currentPage={currentSubPage} setCurrentPage={setCurrentSubPage}/>
        <DPMContext.Consumer>
          {
            dpmContext => {
              const localContext = dpmContext as RequestMap;
              if (localContext) {
                return paramRows.map((request, requestIndex) => {
                  return localContext[request.param]
                  ? <ParamRow key={requestIndex} row={requestIndex}/>
                  : <ParamInput key={requestIndex} row={requestIndex} addRequest={(newRequest: string) => {setRequestList([...requestList, newRequest]);paramRows[requestIndex] = newRequest;setParamRows(paramRows)}}/>
                })
              }
              return 'loading...'
            }
          }
        </DPMContext.Consumer>
      </Panel>
    </DPM>
  )
}

export default App;
