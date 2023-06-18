import React from "react";
import Classes from './Welcome.module.css'
import Totalexpense from "./Totalexpense";
import Profile from "./Profile";

import Profeature from "./Profeature";

import TableData from "./Table/Table";

const Welcome = ()=>{
    return(
    <div className={Classes.container}>
        <div className={Classes.component}>
            <Profile/>
            <Totalexpense/>
            <Profeature/>
        </div>
        <div className={Classes.table}>
            <TableData/>
        </div>
    </div>
    )
}
export default Welcome;