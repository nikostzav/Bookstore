import React from 'react';
import { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarSubMenu
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const tempAuthors = ['Goggins','Rollin','John Carter'];

const Sidebar = () => {

  const [showAuthors,setShowAuthors] = useState(false);

  const authorsHandler = () => {
    showAuthors ? setShowAuthors(false) :  setShowAuthors(true);
    console.log(showAuthors);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', position:'fixed',zIndex:'1' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Categories</CDBSidebarMenuItem>
            </NavLink>
            
              <CDBSidebarMenuItem icon="table" onClick={authorsHandler}>Authors</CDBSidebarMenuItem>
              {showAuthors ? <></> : <div className='border border-white m-3'> {tempAuthors.map( (autho) =>  <p className='p-1 m-3 border-bottom  text-start lead fs-6 bg-dark'>{autho}</p> )}</div> }
            
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>

       
              {/* <CDBSidebarSubMenu title="sidemenu" icon="th">
                  <CDBSidebarMenuItem>
                    submenu 1
                  </CDBSidebarMenuItem>
              </CDBSidebarSubMenu> */}
  

            {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
            </NavLink> */}

            {/* <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Bookstore
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;