import React, {Component} from "react";

class TasksListElement extends Component {

    render() {
        let task = this.props.task;
        return(
            <div>
                <input
                    type="checkbox"
                    checked={task.is_done}
                    onChange={() => this.props.handleChecked(task)}
                />
                <input
                    type="text"
                    style={{textDecoration: `${task.is_done ? "line-through" : "none"}`}}
                    disabled={task.is_done}
                    defaultValue={task.desc}
                    onChange={event => task.desc = event.target.value}
                    onBlur={() => this.props.handleUpdate(task)}
                />
                <button onClick={() => this.props.handleDelete(task.id)}>Delete</button>
            </div>
        )
    }
}

export const TasksListElementComponent = TasksListElement;