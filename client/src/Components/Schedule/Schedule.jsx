import React, { Component } from "react";
import MyTable from "./Table/Table";

import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import General from "./Tabs/General/General";
import Personal from "./Tabs/Prsonal/Personal";

function ScheduleTabManager(props) {
	if (props.data.activeItem === "Default Schedule") {
		return <General />;
	} else if (props.data.activeItem === "Personal Schedule") {
		return <Personal />;
	}
}

export default class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: "Default Schedule",
		};
	}
	handleItemClick = (e, { name }) => this.setState({ activeItem: name });
	render() {
		return (
			<div>
				<Menu tabular className="MainTabMenu ">
					<Menu.Item
						name="Default Schedule"
						active={this.state.activeItem === "Default Schedule"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name="Personal Schedule"
						active={this.state.activeItem === "Personal Schedule"}
						onClick={this.handleItemClick}
					/>
				</Menu>
				<ScheduleTabManager data={this.state}/>
			</div>
		);
	}
}
