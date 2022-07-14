import React from 'react';
import Home from './src/page/Home';
import Test from "./src/page/Test";
import Header from "./src/component/Header";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            {/* ㅍㅔ이지 변경시, Routes 내에서 스위칭이 이루어짐 */}
            <Header></Header>
            <Routes>
                <Route path="/">
                    <Route path="home" element={<Home/>}/>
                    <Route path="test" element={<Test/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
