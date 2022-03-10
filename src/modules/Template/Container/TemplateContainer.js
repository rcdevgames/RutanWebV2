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

      case "/list_service":
        return "list";

      case "/monitoring-employee":
        return "monitor";

      case "/identification":
        return "list";

      case "/report_trans":
        return "list";

      case "/report_identification":
        return "list";

      case "/report_employee":
        return "list";

      default:
        return "command";
    }
  };

  const mainMenu = [];
  const masterDataMenu = [];
  const reportMenu = [];
  const serviceRepairMenu = [];
  const reportDataMenu = [];

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
        item.path === "/unit" ||
        item.path === "/identification"
      ) {
        masterDataMenu.push(menu);
      } else if (
        item.path === "/internal-service" ||
        item.path === "/external-service" ||
        item.path === "/list_service"
      ) {
        serviceRepairMenu.push(menu);
      } else if (item.path === "/monitoring-employee") {
        reportMenu.push(menu);
      } else if (
        item.path === "/report_trans" ||
        item.path === "/report_employee" ||
        item.path === "/report_identification"
      ) {
        reportDataMenu.push(menu);
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
      reportDataMenu={reportDataMenu}
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
