import React from "react";
import { Link } from "react-router-dom";
import history from "../../app/History";

const Sidebar = ({
  role,
  mainMenu,
  masterDataMenu,
  reportMenu,
  serviceRepairMenu,
}) => {
  return (
    <div>
      <nav class="sidebar">
        <div class="sidebar-header">
          <a href="#" class="sidebar-brand">
            Rutan<span>Admin</span>
          </a>
          <div class="sidebar-toggler not-active">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="sidebar-body">
          <ul class="nav">
            {mainMenu.length > 0 && <li class="nav-item nav-category">Main</li>}
            {mainMenu.length > 0 &&
              mainMenu.map((item, index) => (
                <li key={`sidebar-main-menu-${index}`} class="nav-item">
                  <a href={item.path} class="nav-link">
                    <i class="link-icon" data-feather={item.icon}></i>
                    <span class="link-title">{item.name}</span>
                  </a>
                </li>
              ))}
            {masterDataMenu.length > 0 && (
              <li class="nav-item nav-category">Master Data</li>
            )}
            {masterDataMenu.length > 0 &&
              masterDataMenu.map((item, index) => (
                <li key={`sidebar-master-data-${index}`} class="nav-item">
                  <a class="nav-link" href={item.path}>
                    <i class="link-icon" data-feather={item.icon}></i>
                    <span class="link-title">{item.name}</span>
                  </a>
                </li>
              ))}
            <li class="nav-item nav-category">Service Repair</li>
            {serviceRepairMenu.length > 0 &&
              serviceRepairMenu.map((item, index) => (
                <li key={`sidebar-master-data-${index}`} class="nav-item">
                  <a class="nav-link" href={item.path}>
                    <i class="link-icon" data-feather={item.icon}></i>
                    <span class="link-title">{item.name}</span>
                  </a>
                </li>
              ))}
            <li class="nav-item nav-category">Monitoring</li>
            {reportMenu.length > 0 &&
              reportMenu.map((item, index) => (
                <li key={`sidebar-master-data-${index}`} class="nav-item">
                  <a class="nav-link" href={item.path}>
                    <i class="link-icon" data-feather={item.icon}></i>
                    <span class="link-title">{item.name}</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
