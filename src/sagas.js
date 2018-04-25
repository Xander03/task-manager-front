import {all, fork} from "redux-saga/effects";
import {watchTasksActions} from "./module/tasks";

const sagas = [
    watchTasksActions,
];

export default function* globalSagas() {
    const globalSagasForks = sagas.map(saga => fork(saga));

    yield all([...globalSagasForks]);
}