import { Modal } from "antd";
import React from "react";

interface IProps {
  visible: boolean;
  content: any;
  footer: any;
  onCancel: any;
  width: any;
}

const CModal: React.FC<IProps> = (props) => {
  // const showModal = () => {
  //   setVisible(true)
  // };

  // const handleOk = () => {
  //   setLoading(true)
  //   setTimeout(() => {
  //     setLoading(false)
  //     setVisible(false)
  //   }, 3000);
  // };

  return (
    <Modal
      visible={props.visible}
      footer={props.footer}
      destroyOnClose
      onCancel={props.onCancel}
      width={props.width ? props.width : 600}
    >
      {props.content}
    </Modal>
  );
};

export default CModal;
