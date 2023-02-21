import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { useEffect } from 'react';
import UserData from './components/UserData';
import {useState } from "react";


//const API = "https://api.spoonacular.com/recipes/661447/information?apiKey=5828cde1106e400b9469ae1a2f9732ee"

//const App = () => {

//    const [users, setUsers] = useState({});
//    const fetchUsers = async (url) => {
//        try {
//            const res = await fetch(url);
//            const data = await res.json();
//            if (data.length > 0) {

//                setUsers(data);
//            }
//            //console.log(data);
//        } catch (e) {
//            console.error(e)
//        }
//    }
//    useEffect(() => {
//        fetchUsers(API);
//    }, )
//    return <>
//        <table>
//            <thead>
//            <tr>
//                <th>ID</th>
//                <th>Title</th>
//                <th>SourceURL</th>
//            </tr>
//            </thead>
            
//            <tbody>
//                <UserData users={users}/>
//            </tbody>
//        </table>
//    </>
//}

//export default App;




export default class App extends Component {
  static displayName = App.name;

  render() {
      return (
          <><Layout>
              <Routes>
                  {AppRoutes.map((route, index) => {
                      const { element, ...rest } = route;
                      return <Route key={index} {...rest} element={element} />;
                  })}
              </Routes>
          </Layout></>
    );
  }
}
