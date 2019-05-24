import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import "./Styles/App.css";
import Schedule from "./Components/Schedule/Schedule";

import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { setSeconds } from "date-fns";

class ScheduleMenu extends Component {
	constructor(props) {
		super(props);
		this.state = ""
		console.log(this.props);
	}
	render() {
		if (this.props.data.schedule === true) {
			return (
				<Button.Group className="HeaderPageButtons activated">
					<Button secondary className="HeaderBgCollor">
						Schedule
					</Button>
				</Button.Group>
			);
		} else {
			return (
				<Button.Group className="HeaderPageButtons">
					<Button secondary className="HeaderBgCollor">
						Schedule
					</Button>
				</Button.Group>
			);
		}
	}
}

class GlobalSchedule extends Component {
	constructor(props) {
		super(props);
		this.state = ""
		console.log(this.props);
	}
	render() {
		if (this.props.data.global === true) {
			return (
				<Button.Group className="HeaderPageButtons actiivated ">
					<Button secondary className="HeaderBgCollor">
						Global Schedule
					</Button>
				</Button.Group>
			);
		} else {
			return (
				<Button.Group className="HeaderPageButtons">
					<Button secondary className="HeaderBgCollor">
						Global Schedule
					</Button>
				</Button.Group>
			);
		}
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			schedule: true,
			global: false,
		};
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img
						src="https://cdn.worldvectorlogo.com/logos/react-native-firebase-1.svg"
						className="App-logo"
						alt="logo"
					/>
					<ScheduleMenu data={this.state} change={this.SwapActive}/>
					<GlobalSchedule data={this.state} change={this.SwapActive} />
				</header>
				{/* <Table table = {this.state.table} ></Table> */}
				<Schedule />
			</div>
		);
	}
}
export default App;
