import React, { useState, useEffect } from 'react';
import { ACNET } from "@fnal/acnet";
import DPM, { DPMContext, RequestMap } from "@fnal/app-framework/components/DPM";
import './App.css';
import Panel from './components/Panel';
import ParamRow from './components/ParamRow';
import ParamInput from './components/ParamInput';
import ParamNav from './components/ParamNav';
import usePages from './components/usePages';

type AppProps = {
  acnet: ACNET;
}

const App: React.FC<AppProps> = (props) => {
  const [requestList, setRequestList] = useState([] as string[]);
  const [paramRows, setParamRows] = useState(Array(30).fill({ name: '' }));
  const [currentPage, setCurrentPage] = useState('R192');
  const possiblePages = usePages();
  const [pageTitle, setPageTitle] = useState('');
  const [tabs, setTabs] = useState(["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"]);
  const [subPage, setSubPage] = useState(1);
  const defaultMaxSubPages = 99;
  const [subPageCount, setSubPageCount] = useState(defaultMaxSubPages);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function fetchUrl() {
      const response = await fetch('http://vclx3.fnal.gov:4000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `{
            paramTabs(indexPage: "${currentPage}") {
              subPageCount
              tabs
            }
          }`
        })
      });
      const json = await response.json();
      const paramTabs = json.data.paramTabs;
      if (!ignore) {
        setTabs(paramTabs.tabs);
        setSubPageCount(paramTabs.subPageCount);
        setCurrentTab(0);

        if (subPage > paramTabs.subPageCount) {
          setSubPage(paramTabs.subPageCount);
        }
      }
    }

    fetchUrl();
    return () => { ignore = true; }
  }, [currentPage]);

  useEffect(() => {
    let ignore = false;

    async function fetchUrl() {
      const response = await fetch('http://vclx3.fnal.gov:4000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `{
                  paramPage(indexPage: "${currentPage}", subpage: ${subPage}, tabIndex: ${currentTab}) {
                    title
                    subPageCount
                    rows {
                      rownum
                      di
                      sf
                      devtxt
                      offsett
                    }
                  }
              }`
        })
      });
      const json = await response.json();

      if (!ignore) {
        const paramPage = json.data.paramPage;

        setPageTitle(paramPage ? paramPage.title : '');
        setSubPageCount(paramPage ? paramPage.subPageCount : defaultMaxSubPages);

        const paramPageRows = paramPage === null || paramPage.rows === null || paramPage.rows.length < 30
          ? Array(30).fill({ name: '' })
          : paramPage.rows

        setParamRows(paramPageRows
          .map((row: any) => {
            return row.di === 0
              ? { name: '' }
              : { name: `0:${row.di}${row.offsett !== 0 ? `[${row.offsett}]` : ''}` }
          }));
        const filteredRows = paramPageRows.filter((row: any) => row.di);
        setRequestList([
          ...filteredRows
            .map((row: any) => `0:${row.di}${row.offsett !== 0 ? `[${row.offsett}]` : ''}`),
          ...filteredRows
            .map((row: any) => `0_${row.di}${row.offsett !== 0 ? `[${row.offsett}]` : ''}`)
        ]);
      }
    }

    fetchUrl();
    return () => { ignore = true; }
  }, [currentPage, subPage, currentTab]);

  interface PageUpdate {
    page: string;
    subPage: number;
    tab: number;
    rows: any[];
  }

  const updatePage = (update: PageUpdate) => {
    if (update.page !== currentPage)
      setCurrentPage(update.page);
    if (update.subPage !== subPage)
      setSubPage(update.subPage);
    if (update.tab !== currentTab)
      setCurrentTab(update.tab);
  }

  const addRequest = (requestIndex: number) => {
    return (newRequest: string) => {
      setRequestList([...requestList, newRequest, `${newRequest.replace(':', '_')}`]);
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
          subPageCount={subPageCount}
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
                  let name = '';
                  let description = '';
                  let setting = '';
                  let reading = '';
                  let units = '';

                  const settingParam = request.name.replace(':', '_');

                  if (localContext[settingParam]) {
                    name = localContext[settingParam].info.name;
                    description = localContext[settingParam].info.description;
                    units = localContext[settingParam].info.units || '';
                    const data = localContext[settingParam].data.data as string | number;

                    if (typeof data === 'string') {
                      setting = data;
                    } else {
                      setting = data.toFixed(2);
                    }
                  }

                  if (localContext[request.name]) {
                    name = localContext[request.name].info.name;
                    description = localContext[request.name].info.description;
                    units = localContext[request.name].info.units || '';
                    const data = localContext[request.name].data.data as string | number;

                    if (typeof data === 'string') {
                      reading = data;
                    } else {
                      reading = data.toFixed(2);
                    }
                  }

                  return localContext[request.name] || localContext[settingParam]
                    ? <ParamRow
                      key={requestIndex}
                      request={request.name}
                      name={name}
                      description={description}
                      currentSetting={setting}
                      reading={reading}
                      units={units}
                      addRequest={addRequest(requestIndex)}
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
