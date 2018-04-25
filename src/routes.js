import React from "react";
import {Switch} from "react-router-dom";
import {Route} from "react-router";
import {Tasks} from "./container/tasks";

export const routes =
    <Switch>

        <Route exact path="/tasks" component={Tasks}/>

    </Switch>;