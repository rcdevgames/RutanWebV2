import React from "react";
import { withRouter } from "react-router-dom";
import { Command } from "react-feather";

const Sidebar = ({
  role,
  mainMenu,
  masterDataMenu,
  reportMenu,
  serviceRepairMenu,
  reportDataMenu,
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
            {mainMenu?.length > 0 && (
              <li class="nav-item nav-category">Main</li>
            )}
            {mainMenu?.length > 0 &&
              mainMenu.map((item, index) => (
                <li key={`sidebar-main-menu-${index}`} class="nav-item">
                  <a href={item.path} class="nav-link">
                    {item.icon}
                    <span class="link-title">{item.name}</span>
                  </a>
                </li>
              ))}
            {masterDataMenu?.length > 0 && (
              <li class="nav-item nav-category">Master Data</li>
            )}
            {masterDataMenu?.length > 0 &&
              masterDataMenu.map((item, index) => (
                <li key={`sidebar-master-data-${index}`} class="nav-item">
                  <a class="nav-link" href={item.path}>
                    {item.icon}
                    <span class="link-title">{item.name}</span>
                  </a>
                </li>
              ))}
            {serviceRepairMenu?.length > 0 && (
              <li class="nav-item nav-category">Service Repair</li>
            )}
            {serviceRepairMenu?.length > 0 &&
              serviceRepairMenu.map((item, index) => (
                <li key={`sidebar-master-data-${index}`} class="nav-item">
                  <a class="nav-link" href={item.path}>
                    {item.icon}
                    <span class="link-title">{item.name}</span>
                  </a>
                </li>
              ))}
            {reportMenu?.length > 0 && (
              <li class="nav-item nav-category">Monitoring</li>
            )}
            {reportMenu?.length > 0 &&
              reportMenu.map((item, index) => (
                <li key={`sidebar-master-data-${index}`} class="nav-item">
                  <a class="nav-link" href={item.path}>
                    {item.icon}
                    <span class="link-title">{item.name}</span>
                  </a>
                </li>
              ))}
            {reportDataMenu?.length > 0 && (
              <li class="nav-item nav-category">Laporan</li>
            )}
            {reportDataMenu?.length > 0 &&
              reportDataMenu.map((item, index) => (
                <li key={`sidebar-master-data-${index}`} class="nav-item">
                  <a class="nav-link" href={item.path}>
                    {item.icon}
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

export default withRouter(Sidebar);
