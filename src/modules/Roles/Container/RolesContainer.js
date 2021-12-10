import { Space } from "antd";
import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import RolesComponent from "../Component/RolesComponent";
import * as RolesActions from "../Store/RolesActions";
import * as ComponentActions from "../../App/Store/ComponentAction";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CButtonAntd from "../../../components/CButton/CButtonAntd";

const RolesContainer = (props) => {
  const {
    getListRoles,
    handlePressEdit,
    handlePressDelete,
    roles: { listRoles },
  } = props;

  if (listRoles.length > 0) {
    listRoles.map((item, index) => {
      listRoles[index] = { ...item, no: index + 1 };
    });
  }

  const headers = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: "30%",
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: "Nama Roles",
      dataIndex: "description",
      key: "description",
      width: "30%",
      sorter: (a, b) => a.description.length - b.description.length,
    },
  ];

  const renderActionTable = (text, record) => (
    <Space size="middle">
      <CButtonAntd
        onClick={() => handlePressEdit(record.id)}
        type="primary"
        icon={<EditOutlined />}
        size="middle"
      />
      <CButtonAntd
        onClick={() => handlePressDelete(record.id)}
        type="primary"
        icon={<DeleteOutlined />}
        size="middle"
        danger
      />
    </Space>
  );

  React.useEffect(() => {
    getListRoles();
  }, []);

  return (
    <RolesComponent
      headers={headers}
      listRoles={listRoles}
      renderActionTable={renderActionTable}
    />
  );
};

const mapStateToProps = (state) => ({
  roles: state.roles,
});
const mapDispatchToProps = (dispatch) => ({
  getListRoles: () => RolesActions.getListRolesRequested(),
  handlePressEdit: (roleId) => {
    dispatch(RolesActions.setSelectedRoleId(roleId));
    dispatch(ComponentActions.setGlobalModal(true));
  },
  handlePressDelete: async (roleId) => {
    await dispatch(RolesActions.setSelectedRoleId(roleId));
    RolesActions.deleteRoleRequested(roleId);
  },
});

const EnhanceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RolesContainer);

export default reduxForm({
  form: "rolesForm",
})(EnhanceContainer);
