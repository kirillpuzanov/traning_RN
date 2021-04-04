import React from 'react';
import {AppNavigation} from "./src/nav/appNav";
import {Provider} from "react-redux";
import {store} from "./src/bll/store";

export default function App() {

   return (
       <Provider store={store}>
          <AppNavigation/>
       </Provider>
   )
}



