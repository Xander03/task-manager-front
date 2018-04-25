import React, {Component} from "react";
import {connect} from "react-redux";
import {addTask, deleteTask, getAllTasks, selectTasksData, updateTask} from "../module/tasks";
import {bindActionCreators} from "redux";
import {TasksListComponent} from "../component/tasks/list";
import {TaskFormComponent} from "../component/tasks/task_form";

class TasksContainer extends Component {
    componentWillMount() {
        this.props.actions.getAllTasks("5adb6a8301d0db40206294e6");
    }

    handleChecked(task) {
        const {
            id,
            user_id,
            desc,
            is_done
        } = task;

        this.props.actions.updateTask({
            id: id,
            user_id: user_id,
            desc: desc,
            is_done: !is_done
        });
    }

    handleUpdate(task) {
        this.props.actions.updateTask(task);
    }

    handleDelete(id) {
        this.props.actions.deleteTask(id);
    }

    handleCreate(task) {
        this.props.actions.addTask({
            user_id: "5adb6a8301d0db40206294e6",
            desc: task.desc,
            is_done: false
        });
    }

    render() {
        let code;

        if (this.props.tasks.length === 0) {
            code = <p>Nothing to show</p>;
        } else {
            code = <TasksListComponent
                tasks={this.props.tasks}
                handleChecked={this.handleChecked.bind(this)}
                handleDelete={this.handleDelete.bind(this)}
                handleUpdate={this.handleUpdate.bind(this)}
            />;
        }

        return(
            <div>
                {code}
                <TaskFormComponent handleCreate={this.handleCreate.bind(this)} />
            </div>
        )
    }
}

export const Tasks = connect(
    (state) => ({
        tasks: selectTasksData(state)
    }),
    (dispatch) => ({
        actions: bindActionCreators({
            addTask,
            getAllTasks,
            deleteTask,
            updateTask,
        }, dispatch)
    })
)(TasksContainer);