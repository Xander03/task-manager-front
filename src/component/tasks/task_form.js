import React from "react";
import {Field, Form} from "react-final-form";

const TaskForm = (props) => {
    const onSubmit = (data) => {
        props.handleCreate(data)
    };

    return(
        <Form
            onSubmit={onSubmit}
            render={({handleSubmit, submitting}) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        name="desc"
                        component="input"
                        type="text"
                        placeholder="Description"
                    />
                    <button type="submit" disabled={submitting}>
                        Ok
                    </button>
                </form>
            )}
        />
    )
};

export const TaskFormComponent = TaskForm;