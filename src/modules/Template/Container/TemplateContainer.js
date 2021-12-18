import React from "react";
import { compose } from "redux";

import TemplateComponent from "../Component/TemplateComponent";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as authActions from "../../Auth/Store/AuthAction";
import * as AuthSelector from "../../Auth/Selector/AuthSelector";
import * as AppSelector from "../../App/Selector/AppSelector";

const TemplateContainer = (props) => {
  const [role, setRole] = React.useState("");
  const { userDetail } = props;

  React.useEffect(() => {
    if (userDetail && userDetail.role) {
      setRole(userDetail.role[0].name);
    }
  }, [userDetail]);

  const getIconName = (menu) => {
    switch (menu) {
      case "/dashboard":
        return "command";

      case "/admin":
        return "user";

      case "/cabang":
        return "link";

      case "/employees":
        return "users";

      case "/customer":
        return "users";

      case "/division":
        return "briefcase";

      case "/role":
        return "key";

      case "/tools":
        return "tool";

      case "/machine":
        return "settings";

      case "/jobforms":
        return "file-text";

      case "/category":
        return "file-text";

      case "/unit":
        return "box";

      case "/internal-service":
        return "file-plus";

      case "/external-service":
        return "file-plus";

      case "/monitoring_karyawan":
        return "monitor";

      default:
        return "command";
    }
  };

  const mainMenu = [];
  const masterDataMenu = [];
  const reportMenu = [];
  const serviceRepairMenu = [];
  if (userDetail) {
    userDetail.menus.map((item, index) => {
      let menu = {};
      menu.icon = getIconName(item.path);
      menu.name = item.menu;
      menu.path = item.path;

      if (
        item.path === "/admin" ||
        item.path === "/cabang" ||
        item.path === "/employees" ||
        item.path === "/customer" ||
        item.path === "/division" ||
        item.path === "/role" ||
        item.path === "/tools" ||
        item.path === "/machine" ||
        item.path === "/jobforms" ||
        item.path === "/category" ||
        item.path === "/unit"
      ) {
        masterDataMenu.push(menu);
      } else if (
        item.path === "/internal-service" ||
        item.path === "/external-service"
      ) {
        serviceRepairMenu.push(menu);
      } else if (item.path === "/monitoring_karyawan") {
        reportMenu.push(menu);
      } else {
        mainMenu.push(menu);
      }
    });
  }

  return (
    <TemplateComponent
      role={role}
      mainMenu={mainMenu}
      masterDataMenu={masterDataMenu}
      reportMenu={reportMenu}
      serviceRepairMenu={serviceRepairMenu}
      {...props}
    />
  );
};
const mapStateToProps = createStructuredSelector({
  isGlobalLoading: AppSelector.IsGlobalLoading(),
  userDetail: AuthSelector.UserDetail(),
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    authActions.doLogout(dispatch);
  },
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TemplateContainer);
