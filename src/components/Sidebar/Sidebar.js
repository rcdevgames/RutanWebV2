import React from "react";
import { Link } from "react-router-dom";
import "../../style/globalStyle.css";

const Sidebar = ({
  role,
  mainMenu,
  masterDataMenu,
  reportMenu,
  serviceRepairMenu,
  reportDataMenu,
}) => {
  return (
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

      <div class="sidebar-container">
        <div class="scrolled-content">
          <div class="sidebar-body">
            <ul class="nav">
              {mainMenu?.length > 0 && (
                <li class="nav-item nav-category">Main</li>
              )}
              {mainMenu?.length > 0 &&
                mainMenu.map((item, index) => (
                  <li key={`sidebar-main-menu-${index}`} class="nav-item">
                    <Link class="nav-link" to={item.path}>
                      {item.icon}
                      <span class="link-title">{item.name}</span>
                    </Link>
                  </li>
                ))}
              {masterDataMenu?.length > 0 && (
                <li class="nav-item nav-category">Master Data</li>
              )}
              {masterDataMenu?.length > 0 &&
                masterDataMenu.map((item, index) => (
                  <li key={`sidebar-master-data-${index}`} class="nav-item">
                    <Link class="nav-link" to={item.path}>
                      {item.icon}
                      <span class="link-title">{item.name}</span>
                    </Link>
                  </li>
                ))}
              {serviceRepairMenu?.length > 0 && (
                <li class="nav-item nav-category">Service Repair</li>
              )}
              {serviceRepairMenu?.length > 0 &&
                serviceRepairMenu.map((item, index) => (
                  <li key={`sidebar-master-data-${index}`} class="nav-item">
                    <Link class="nav-link" to={item.path}>
                      {item.icon}
                      <span class="link-title">{item.name}</span>
                    </Link>
                  </li>
                ))}
              {reportMenu?.length > 0 && (
                <li class="nav-item nav-category">Monitoring</li>
              )}
              {reportMenu?.length > 0 &&
                reportMenu.map((item, index) => (
                  <li key={`sidebar-master-data-${index}`} class="nav-item">
                    <Link class="nav-link" to={item.path}>
                      {item.icon}
                      <span class="link-title">{item.name}</span>
                    </Link>
                  </li>
                ))}
              {reportDataMenu?.length > 0 && (
                <li class="nav-item nav-category">Laporan</li>
              )}
              {reportDataMenu?.length > 0 &&
                reportDataMenu.map((item, index) => (
                  <li key={`sidebar-master-data-${index}`} class="nav-item">
                    <Link class="nav-link" to={item.path}>
                      {item.icon}
                      <span class="link-title">{item.name}</span>
                    </Link>
                  </li>
                ))}
              <li key={`sidebar-master-data-null}`} class="nav-item">
                <div class="nav-link">
                  <span class="link-title"></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
