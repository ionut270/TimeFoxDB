import React, { Component } from "react";
import MyTable from "../../Table/Table";
import TableMenu from "../../TableMenu/TableMenu"

import "semantic-ui-css/semantic.min.css";

export default class General extends Component {
    constructor(props){
        super(props);
        /**TODO
         * READ COOKIES TO GET ID AND GROUP
         * FETCH THE DATA
         * PRINT IT
         */
        this.state = [{
            id:"1",
            startTime:"1",
            endTime:"1",
            title:"1",
            type:"1",
            room:"1",
            teacher:"1",
            frequency:"1",
            packet:"1",
        }]
    }
    render(){
        return(
            <div className="ScheduleGeneral">
                <TableMenu personal={false}/>
                <MyTable table={this.state}></MyTable>
            </div>
        )
    }
}