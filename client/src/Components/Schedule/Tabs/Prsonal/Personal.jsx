import React, { Component } from "react";
import MyTable from "../../Table/Table";
import TableMenu from "../../TableMenu/TableMenu"

import "semantic-ui-css/semantic.min.css";

export default class Personal extends Component {
	constructor(props) {
		super(props);
		/**TODO
		 * READ COOKIES
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
	render() {
		return (
			<div className="SchedulePersonal">
				<TableMenu personal={true}/>
				<MyTable table={this.state} />
			</div>
		);
	}
}
