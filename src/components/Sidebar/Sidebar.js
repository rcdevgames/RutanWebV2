import React from "react";
import { Link } from "react-router-dom";
import history from "../../app/History";

const Sidebar = () => {
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
            <li class="nav-item nav-category">Main</li>
            <li class="nav-item">
              <a href="/" class="nav-link">
                <i class="link-icon" data-feather="command"></i>
                <span class="link-title">Dashboard</span>
              </a>
            </li>
            <li class="nav-item nav-category">Master Data</li>
            <li class="nav-item">
              <a class="nav-link" href="/admin">
                <i class="link-icon" data-feather="user"></i>
                <span class="link-title">Admin</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/branch" class="nav-link">
                <i class="link-icon" data-feather="link"></i>
                <span class="link-title">Cabang</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/employee" class="nav-link">
                <i class="link-icon" data-feather="users"></i>
                <span class="link-title">Karyawan</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/customer" class="nav-link">
                <i class="link-icon" data-feather="users"></i>
                <span class="link-title">Customer</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/division" class="nav-link">
                <i class="link-icon" data-feather="briefcase"></i>
                <span class="link-title">Divisi</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/role" class="nav-link">
                <i class="link-icon" data-feather="key"></i>
                <span class="link-title">Role</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/tools" class="nav-link">
                <i class="link-icon" data-feather="tool"></i>
                <span class="link-title">Peralatan</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/engine-configuration" class="nav-link">
                <i class="link-icon" data-feather="settings"></i>
                <span class="link-title">Konfigurasi Mesin</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/job-form" class="nav-link">
                <i class="link-icon" data-feather="file-text"></i>
                <span class="link-title">Job Forms</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="/category-form" class="nav-link">
                <i class="link-icon" data-feather="file-text"></i>
                <span class="link-title">Kategori Form</span>
              </a>
            </li>
            <li class="nav-item nav-category">Service Repair</li>
            <li class="nav-item">
              <a
                class="nav-link"
                onClick={() => {
                  history.push("/new-internal-service");
                  window.location.reload();
                }}
              >
                <i class="link-icon" data-feather="file-plus"></i>
                <span class="link-title">Internal Service</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/new-external-service">
                <i class="link-icon" data-feather="file-plus"></i>
                <span class="link-title">External Service</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/list-services">
                <i class="link-icon" data-feather="list"></i>
                <span class="link-title">List Service</span>
              </a>
            </li>
            <li class="nav-item nav-category">Monitoring</li>
            <li class="nav-item">
              {/* <Link to="/monitoring-employee"> */}
              <a class="nav-link" href="/monitoring-employee">
                <i class="link-icon" data-feather="monitor"></i>
                <span class="link-title">Monitoring Karyawan</span>
              </a>
              {/* </Link> */}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
