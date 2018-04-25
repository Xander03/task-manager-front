import {fromJS} from "immutable";
import {put, call, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {SERVER_URI} from "../settings";

const TASKS_URI = SERVER_URI + "/tasks/";

const ADD_TASK_REQUEST = "ADD_TASK_REQUEST";
const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
const ADD_TASK_FAILED = "ADD_TASK_FAILED";

const GET_ALL_TASKS_REQUEST = "GET_ALL_TASKS_REQUEST";
const GET_ALL_TASKS_SUCCESS = "GET_ALL_TASKS_SUCCESS";
const GET_ALL_TASKS_FAILED = "GET_ALL_TASKS_FAILED";

const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST";
const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
const DELETE_TASK_FAILED = "DELETE_TASK_FAILED";

const UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST";
const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
const UPDATE_TASK_FAILED = "UPDATE_TASK_FAILED";

const CLEAR_TASKS_DATA = "CLEAR_TASKS_DATA";

const initialState = fromJS({
    tasks: [],
    loading: false,
    error: null
});

export const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TASK_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case ADD_TASK_SUCCESS:
            return state
                .set("loading", false);

        case ADD_TASK_FAILED:
            return state
                .set("loading", false)
                .set("error", action.payload);


        case GET_ALL_TASKS_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case GET_ALL_TASKS_SUCCESS:
            return state
                .set("tasks", action.payload)
                .set("loading", false);

        case GET_ALL_TASKS_FAILED:
            return state
                .set("loading", false)
                .set("error", action.payload);


        case DELETE_TASK_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case DELETE_TASK_SUCCESS:
            return state
                .updateIn(["tasks"], tasks => tasks.filter(task => task.id !== action.payload))
                .set("loading", false);

        case DELETE_TASK_FAILED:
            return state
                .set("loading", false)
                .set("error", null);


        case UPDATE_TASK_REQUEST:
            return state
                .set("loading", true)
                .set("error", null);

        case UPDATE_TASK_SUCCESS:
            return state
                .updateIn(["tasks"], tasks => tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task))
                .set("loading", false);

        case UPDATE_TASK_FAILED:
            return state
                .set("loading", false)
                .set("error", action.payload);


        case CLEAR_TASKS_DATA:
            return initialState;

        default:
            return state;
    }
};

export const addTask = (data) => ({
    type: ADD_TASK_REQUEST,
    payload: data
});

export const addTaskSuccess = (data) => ({
    type: ADD_TASK_SUCCESS,
    payload: data
});

export const addTaskFailed = (error) => ({
    type: ADD_TASK_FAILED,
    payload: error
});


export const getAllTasks = (data) => ({
    type: GET_ALL_TASKS_REQUEST,
    payload: data
});

export const getAllTasksSuccess = (data) => ({
    type: GET_ALL_TASKS_SUCCESS,
    payload: data
});

export const getAllTasksFailed = (error) => ({
    type: GET_ALL_TASKS_FAILED,
    payload: error
});


export const deleteTask = (data) => ({
    type: DELETE_TASK_REQUEST,
    payload: data
});

export const deleteTaskSuccess = (data) => ({
    type: DELETE_TASK_SUCCESS,
    payload: data
});

export const deleteTaskFailed = (error) => ({
    type: DELETE_TASK_FAILED,
    payload: error
});


export const updateTask = (data) => ({
    type: UPDATE_TASK_REQUEST,
    payload: data
});

export const updateTaskSuccess = (data) => ({
    type: UPDATE_TASK_SUCCESS,
    payload: data
});

export const updateTaskFailed = (error) => ({
    type: UPDATE_TASK_FAILED,
    payload: error
});


export const clearTasksData = () => ({
    type: CLEAR_TASKS_DATA
});


function* addTaskRequest(action) {
    try {
        yield call(axios, TASKS_URI, {
            method: "POST",
            data: {
                id: action.payload.id,
                user_id: action.payload.user_id,
                desc: action.payload.desc,
            }
        });
        yield put(addTaskSuccess(action.payload.user_id));
    } catch (e) {
        yield put(addTaskFailed(e));
    }
}

function* handleAddTaskSuccess(action) {
    yield put(getAllTasks(action.payload));
}

function* getAllTasksRequest(action) {
    try {
        const response = yield call(axios, TASKS_URI + action.payload, {
            method: "POST",
        });

        yield put(getAllTasksSuccess(response.data ? response.data : []));
    } catch (e) {
        yield put(getAllTasksFailed(e));
    }
}

function* deleteTaskRequest(action) {
    try {
        yield call(axios, TASKS_URI + action.payload, {
            method: "DELETE",
        });

        yield put(deleteTaskSuccess(action.payload));
    } catch (e) {
        yield put(deleteTaskFailed(e));
    }
}

function* updateTaskRequest(action) {
    try {
        yield call(axios, TASKS_URI, {
            method: "PUT",
            data: action.payload,
        });

        yield put(updateTaskSuccess(action.payload));
    } catch (e) {
        yield put(updateTaskFailed(e));
    }
}

export function* watchTasksActions() {
    yield takeEvery(ADD_TASK_REQUEST, addTaskRequest);
    yield takeEvery(GET_ALL_TASKS_REQUEST, getAllTasksRequest);
    yield takeEvery(DELETE_TASK_REQUEST, deleteTaskRequest);
    yield takeEvery(UPDATE_TASK_REQUEST, updateTaskRequest);

    yield takeEvery(ADD_TASK_SUCCESS, handleAddTaskSuccess);
}

export const selectTasksContainer = (state) => state.containers.tasks;
export const selectTasksData = (state) => selectTasksContainer(state).get("tasks");