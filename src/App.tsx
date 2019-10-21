import React, { useState } from 'react';
import { ACNET } from "@fnal/acnet";
import DPM, { DPMContext, RequestMap } from "@fnal/app-framework/components/DPM";
import './App.css';
import Panel from './components/Panel';
import ParamRow from './components/ParamRow';
import ParamInput from './components/ParamInput';
import { useFetch } from "./components/hooks";
import ParamNav from './components/ParamNav';
import usePages from './components/usePages';

type AppProps = {
  acnet: ACNET;
}

function generateQuery(page: React.SetStateAction<string>, subPage: number, tab: number) {
  return JSON.stringify({
    query: `{
              paramPage(indexPage: "${page}", subpage: ${subPage}, tabIndex: ${tab}) {
                  rownum
                  di
                  sf
                  devtxt
              }
          }`
  });
}

const App: React.FC<AppProps> = (props) => {
  const [requestList, setRequestList] = useState([] as string[]);
  const [paramRows, setParamRows] = useState(Array(30).fill({ name: '' }));
  const [currentPage, setCurrentPage] = useState('');
  const possiblePages = usePages();
  const [pageTitle, setPageTitle] = useState('');
  const [tabs, setTabs] = useState(["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"]);
  const [subPage, setSubPage] = useState(1);
  const [currentTab, setCurrentTab] = useState(0);
  const [config, setConfig] = useState({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: generateQuery(currentPage, subPage, currentTab)
  })
  const [fetchData, fetchLoading]: any[] = useFetch('http://vclx3.fnal.gov:4000', config);

  if (!fetchLoading) {
    const newRequests: any[] = [];
    console.log(fetchData);
    console.log(currentPage);
    if (fetchData.data.paramPage !== null) {
      fetchData.data.paramPage.forEach((row: any, index: number) => {
        paramRows[index] = {
          name: `0:${row.di}`
        };
        newRequests.push(`0:${row.di}`);
        newRequests.push(`0:${row.di}.SETTING`);
      });
      setRequestList(newRequests);
      setParamRows(paramRows);
    }
  }

  interface PageUpdate {
    page: string;
    subPage: number;
    tab: number;
  }

  const updatePage = (update: PageUpdate) => {
    console.log(update);
    setCurrentPage(update.page);
    setSubPage(update.subPage);
    setCurrentTab(update.tab);
  }

  const addRequest = (requestIndex: number) => {
    return (newRequest: string) => {
      console.log(newRequest);
      setRequestList([...requestList, newRequest, `${newRequest}.SETTING`]);
      paramRows[requestIndex] = {
        name: newRequest
      };
      setParamRows(paramRows);
    }
  }

  return (
    <DPM acnet={props.acnet} drf={requestList}>
      <Panel>
        <ParamNav
          page={currentPage}
          possiblePages={possiblePages}
          title={pageTitle}
          subPage={subPage}
          tabs={tabs}
          tab={currentTab}
          updatePage={updatePage}>
        </ParamNav>
        <DPMContext.Consumer>
          {
            dpmContext => {
              const localContext = dpmContext as RequestMap;
              if (localContext) {
                return paramRows.map((request, requestIndex) => {
                  let setting = '';
                  let reading = '';

                  if (localContext[`${request.name}.SETTING`]) {
                    const data = localContext[`${request.name}.SETTING`].data.data as string | number;

                    if (typeof data === 'string') {
                      setting = data;
                    } else {
                      setting = data.toFixed(2);
                    }
                  }

                  if (localContext[request.name]) {
                    const data = localContext[request.name].data.data as string | number;

                    if (typeof data === 'string') {
                      reading = data;
                    } else {
                      reading = data.toFixed(2);
                    }
                  }

                  return localContext[request.name]
                    ? <ParamRow
                      key={requestIndex}
                      name={localContext[request.name].info.name}
                      description={localContext[request.name].info.description}
                      currentSetting={setting}
                      reading={reading}
                      units={localContext[request.name].info.units}
                    />
                    : <ParamInput
                      key={requestIndex}
                      row={requestIndex}
                      addRequest={addRequest(requestIndex)} />
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
