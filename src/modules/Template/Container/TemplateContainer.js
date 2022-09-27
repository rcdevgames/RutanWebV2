import React from "react";
import { compose } from "redux";

import TemplateComponent from "../Component/TemplateComponent";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import * as authActions from "../../Auth/Store/AuthAction";
import * as AuthSelector from "../../Auth/Selector/AuthSelector";
import * as AppSelector from "../../App/Selector/AppSelector";
import {
  Box,
  Briefcase,
  Clock,
  Command,
  FilePlus,
  FileText,
  Key,
  Link,
  List,
  Monitor,
  Settings,
  Tool,
  User,
  Users,
} from "react-feather";

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
        return <Command size={14} style={{ marginRight: -15 }} />;

      case "/admin":
        return <User size={14} style={{ marginRight: -15 }} />;

      case "/cabang":
        return <Link size={14} style={{ marginRight: -15 }} />;

      case "/employees":
        return <Users size={14} style={{ marginRight: -15 }} />;

      case "/customer":
        return <Users size={14} style={{ marginRight: -15 }} />;

      case "/division":
        return <Briefcase size={14} style={{ marginRight: -15 }} />;

      case "/role":
        return <Key size={14} style={{ marginRight: -15 }} />;

      case "/tools":
        return <Tool size={14} style={{ marginRight: -15 }} />;

      case "/machine":
        return <Settings size={14} style={{ marginRight: -15 }} />;

      case "/jobforms":
        return <FileText size={14} style={{ marginRight: -15 }} />;

      case "/category":
        return <FileText size={14} style={{ marginRight: -15 }} />;

      case "/unit":
        return <Box size={14} style={{ marginRight: -15 }} />;

      case "/internal-service":
        return <FilePlus size={14} style={{ marginRight: -15 }} />;

      case "/external-service":
        return <FilePlus size={14} style={{ marginRight: -15 }} />;

      case "/list_service":
        return <List size={14} style={{ marginRight: -15 }} />;

      case "/monitoring-employee":
        return <Monitor size={14} style={{ marginRight: -15 }} />;

      case "/identification":
        return <List size={14} style={{ marginRight: -15 }} />;

      case "/report_trans":
        return <List size={14} style={{ marginRight: -15 }} />;

      case "/report_identification":
        return <List size={14} style={{ marginRight: -15 }} />;

      case "/report_employee":
        return <List size={14} style={{ marginRight: -15 }} />;

      case "/working-hours":
        return <Clock size={14} style={{ marginRight: -15 }} />;

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
        item.path === "/report_identification" ||
        item.path === "/working-hours"
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
