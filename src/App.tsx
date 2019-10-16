import React, { useState } from 'react';
import { ACNET } from "@fnal/acnet";
import DPM, { DPMContext, RequestMap } from "@fnal/app-framework/components/DPM";
import './App.css';
import Title from './components/Title';
import SubPages from './components/SubPages';
import Panel from './components/Panel';
import ParamRow from './components/ParamRow';
import ParamInput from './components/ParamInput';
import usePages from "./components/usePages";

let possiblePages = [];

type AppProps = {
  acnet: ACNET;
}

const App: React.FC<AppProps> = (props) => {
  const [requestList, setRequestList] = useState([] as string[]);
  const [paramRows, setParamRows] = useState(Array(30).fill({ name: '' }));
  const [currentPage, setCurrentPage] = useState('R192');
  const [pageTitle, setPageTitle] = useState('');
  const [subPages, setSubPages] = useState(["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"]);
  const [currentSubPage, setCurrentSubPage] = useState(0);

  possiblePages = usePages();

  return (
    <DPM acnet={props.acnet} drf={requestList}>
      <Panel>
        <Title title={pageTitle} page={currentPage} newPageTrigger={setCurrentPage} possiblePages={possiblePages} />
        <SubPages pages={subPages} currentPage={currentSubPage} setCurrentPage={setCurrentSubPage} />
        <DPMContext.Consumer>
          {
            dpmContext => {
              const localContext = dpmContext as RequestMap;
              if (localContext) {
                return paramRows.map((request, requestIndex) => {
                  return localContext[request.name]
                    ? <ParamRow key={requestIndex} row={requestIndex} details={
                      {
                        reading: localContext[request.name],
                        setting: localContext[`${request.name}.SETTING`]
                      }
                    } />
                    : <ParamInput
                      key={requestIndex}
                      row={requestIndex}
                      addRequest={(newRequest: string) => {
                        setRequestList([...requestList, newRequest, `${newRequest}.SETTING`]);
                        paramRows[requestIndex] = {
                          name: newRequest
                        };
                        setParamRows(paramRows);
                      }} />
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
