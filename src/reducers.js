import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as tasksReducer} from "./module/tasks";

const containersReducer = {
    containers: combineReducers({
        tasks: tasksReducer,
    })
};

const globalReducer =
    combineReducers({
        ...containersReducer,
        target: routerReducer,
    });

export default globalReducer