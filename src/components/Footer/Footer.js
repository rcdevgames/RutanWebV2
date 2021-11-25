import React from "react";

const Footer = () => {
  return (
    <footer class="footer d-flex flex-column flex-md-row align-items-center justify-content-between">
      <p class="text-muted text-center text-md-left">
        Copyright © {new Date().getFullYear() + " "}
        <a href="#">Rutan Team</a>. All rights reserved
      </p>
      <p class="text-muted text-center text-md-left mb-0 d-none d-md-block">
        Handcrafted With{" "}
        <i class="mb-1 text-primary ml-1 icon-small" data-feather="heart"></i>
      </p>
    </footer>
  );
};

export default Footer;
