import { Modal } from "antd";
import React from "react";

interface IProps {
  visible: boolean;
  content: any;
  footer: any;
  onCancel: any;
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

  // const handleCancel = () => {
  //   setVisible(false)
  // };

  return (
    <Modal
      visible={props.visible}
      footer={props.footer}
      onCancel={props.onCancel}
      // footer={[
      //   <Button key="back" onClick={handleCancel}>
      //     Return
      //   </Button>,
      //   <Button
      //     key="submit"
      //     type="primary"
      //     loading={loading}
      //     onClick={handleOk}
      //   >
      //     Submit
      //   </Button>,
      //   <Button
      //     key="link"
      //     href="https://google.com"
      //     type="primary"
      //     loading={loading}
      //     onClick={handleOk}
      //   >
      //     Search on Google
      //   </Button>,
      // ]}
    >
      {props.content}
    </Modal>
  );
};

export default CModal;
