import { Modal } from "antd";
interface CustomModalProps {
    open: boolean;
    hideModal: () => void;
    performAction: () => void;
    title: string;
}
function CustomModal(props: CustomModalProps) {
    const { open, hideModal, performAction, title } = props;
  return (
    <Modal
        title={'Confirmation'}
        open={open}
        onOk={performAction}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
    >
        <p>{title}</p>

    </Modal>
  )
}

export default CustomModal