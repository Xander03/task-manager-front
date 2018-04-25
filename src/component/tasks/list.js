import React, {Component} from "react";
import {TasksListElementComponent} from "./list_element";

class TasksList extends Component {
    render() {
        return(
            <div>
                <ul>{this.props.tasks.map(TasksList.createListElement.bind(this))}</ul>
            </div>
        )
    }

    static createListElement(task) {
        return <TasksListElementComponent
            key={task.id}
            task={task}
            handleUpdate={this.props.handleUpdate}
            handleDelete={this.props.handleDelete}
            handleChecked={this.props.handleChecked}
        />
    }
}

export const TasksListComponent = TasksList;