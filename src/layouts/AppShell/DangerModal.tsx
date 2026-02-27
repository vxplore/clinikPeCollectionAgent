import { Modal } from "@mantine/core";
import { type ReactNode } from "react";

interface LogoutConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  children?: ReactNode;
}

function LogoutConfirmModal({
  opened,
  onClose,
  children,
}: LogoutConfirmModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      radius="lg"
      padding="lg"
      size="xs"
      styles={{
        content: {
          backgroundColor: "#F9FAFB",
          maxWidth: 220,
        },
      }}
      overlayProps={{
        opacity: 1,
        blur: 0,
      }}
    >
      {children}
    </Modal>
  );
}

export default LogoutConfirmModal;
