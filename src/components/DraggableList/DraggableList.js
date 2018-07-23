import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default class DraggableList extends Component {
	constructor(props) {
		super(props);
	}

	reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	onDragEnd = result => {
		if (!result.destination) {
			return;
		}

		const items = this.reorder(
			this.props.items,
			result.source.index,
			result.destination.index
		);
		this.props.setItems(items);
	};

	render() {
		const Item = this.props.itemComponent;
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
						>
							{this.props.items.map((item, index) => (
								<Draggable
									key={item.id}
									draggableId={item.id}
									index={index}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={provided.draggableProps.style}
										>
											<Item isDragging={snapshot.isDragging}>
												{item.name}
											</Item>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}
