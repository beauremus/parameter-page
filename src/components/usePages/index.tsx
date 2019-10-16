import { useState, useEffect } from 'react';

const pagesUrl = "/pp/catalog?xml=true";
const xmlParser = new DOMParser();

function usePages(): string[] {
  const [possiblePages, setPossiblePages] = useState();

  async function getData() {
    const response = await fetch(pagesUrl);
    const rawCatalog = await response.text();
    const xmlIndexPages = xmlParser.parseFromString(rawCatalog, 'application/xml');
    const indexPages = xmlIndexPages.querySelector('pages');
    let possiblePages: string[] = [];

    if (indexPages) {
      indexPages.childNodes.forEach((node: ChildNode) => {
        node.childNodes.forEach((node: ChildNode) => {
          possiblePages = [...possiblePages, node.nodeName];
        })
      });
    }

    setPossiblePages(possiblePages);
  }

  useEffect(() => {
    getData();
  }, []);

  return possiblePages;
}

export default usePages;