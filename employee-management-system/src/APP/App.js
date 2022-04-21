
import React from 'react';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import XDrawer from '../components/layout/XDrawer'
import {routes} from '../components/route/routes'
//, Route, Routes
export default function App() {
  return (
    <>
    <BrowserRouter>
    <XDrawer>
      <Routes>
        {routes.map((route)=>(
          <Route
          key={route.label}
                path={route.path}
                element={route.component}
          />
        ))}

      </Routes>
     
    </XDrawer>

   
    </BrowserRouter>
    
    </>
  );
}
