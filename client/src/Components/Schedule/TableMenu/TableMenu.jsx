import React, { Component } from "react";
import { Input, Label, Menu, Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Personal extends Component {
	constructor(props) {
		super(props);
		this.state = ""
	}
	render() {
		if (this.props.props === true) {
			console.log("Personal!");
			return (
				<div>
					<Button positive className="PaddedButtonsTable">
						Edit Schedule
					</Button>
					<Button negative className="PaddedButtonsTable">
						Reset Schedule
					</Button>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default class TableMenu extends Component {
	constructor(props) {
		super(props);
	}
	state = { activeItem: "inbox" };

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;

		return (
			<Menu vertical className="ScheduleTableMenu">
				<Menu.Item>
					<Input icon="search" placeholder="Search class..." />
				</Menu.Item>
				<Menu.Item name="Monday" active={activeItem === "Monday"} onClick={this.handleItemClick}>
					<Label>1</Label>
					Monday
				</Menu.Item>

				<Menu.Item name="Tuesday" active={activeItem === "Tuesday"} onClick={this.handleItemClick}>
					<Label>51</Label>
						Tuesday
					</Menu.Item>

				<Menu.Item name="Wednesday" active={activeItem === "Wednesday"} onClick={this.handleItemClick}>
					<Label>1</Label>
					Wednesday
				</Menu.Item>

				<Menu.Item name="Thursday" active={activeItem === "Thursday"} onClick={this.handleItemClick}>
					<Label>1</Label>
					Thursday
				</Menu.Item>

				<Menu.Item name="Friday" active={activeItem === "Friday"} onClick={this.handleItemClick}>
					<Label>1</Label>
					Friday
				</Menu.Item>

				<Menu.Item name="Saturday" active={activeItem === "Saturday"} onClick={this.handleItemClick}>
					<Label color="teal">1</Label>
					Saturday
				</Menu.Item>

				<Menu.Item name="Sunday" active={activeItem === "Sunday"} onClick={this.handleItemClick}>
					<Label color="red">1</Label>
					Sunday
				</Menu.Item>
				<Personal props={this.props.personal} />
			</Menu>
		);
	}
}
