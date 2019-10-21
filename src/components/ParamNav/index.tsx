import React, { useState } from 'react'
import ParamTitle from '../ParamTitle'
import SubPages from '../SubPages'

interface NavState {
    page: string;
    subPage: number;
    tab: number;
}

type NavProps = {
    page: string;
    possiblePages: string[];
    title: string;
    subPage: number;
    tabs: string[];
    tab: number;
    updatePage(update: NavState): void;
}

const ParamNav: React.FC<NavProps> = (props) => {
    const changePage = (page: string) => {
        props.updatePage({
            page: page,
            subPage: props.subPage,
            tab: props.tab
        });
    }

    type SubPages = {
        subPage: number;
        tab: number;
    }

    const changeSubPage = (subPages: SubPages) => {
        props.updatePage({
            page: props.page,
            subPage: subPages.subPage,
            tab: subPages.tab
        });
    }

    return (
        <div>
            <ParamTitle
                page={props.page}
                possiblePages={props.possiblePages}
                title={props.title}
                changePage={changePage}
            />
            <SubPages
                subPage={props.subPage}
                tabs={props.tabs}
                tab={props.tab}
                changeSubPage={changeSubPage}
            />
        </div>
    )
}

export default ParamNav

