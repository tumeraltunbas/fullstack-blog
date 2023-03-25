import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from '../../Footer/index.jsx';
import Header from '../../Header/index.jsx';
import Main from '../../Main/index.jsx';

function Layout() {
  return (
    <>
        <Header />
        <Main>
            <Outlet />
        </Main>
        <Footer />
    </>
    )
}

export default Layout;