import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class MyTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="Table-Frame ScheduleGeneralTable">
				<Table celled padded selectable>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell singleLine>Starts</Table.HeaderCell>
							<Table.HeaderCell>Ends</Table.HeaderCell>
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Type</Table.HeaderCell>
							<Table.HeaderCell>Room</Table.HeaderCell>
							<Table.HeaderCell>Teacher</Table.HeaderCell>
							<Table.HeaderCell>Frequency</Table.HeaderCell>
							<Table.HeaderCell>Packet</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>

						{this.props.table.map(data => {
                            return(
							<Table.Row key={data.id.toString()}>
								<Table.Cell singleLine>{data.startTime}</Table.Cell>
								<Table.Cell singleLine>{data.endTime}</Table.Cell>
								<Table.Cell singleLine>{data.title}</Table.Cell>
								<Table.Cell singleLine>{data.type}</Table.Cell>
								<Table.Cell singleLine>{data.room}</Table.Cell>
								<Table.Cell singleLine>
									<a>{data.teacher}</a>
								</Table.Cell>
								<Table.Cell singleLine>{data.frequency} </Table.Cell>
								<Table.Cell singleLine>{data.packet}</Table.Cell>
							</Table.Row>
                            )
                        })}
                        
					</Table.Body>
				</Table>
			</div>
		);
	}
}
