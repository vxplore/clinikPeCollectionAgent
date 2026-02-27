import { Button, Text, Stack } from "@mantine/core";

interface LogoutConfirmModalContentProps {
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function LogoutConfirmModalContent({
  isLoading,
  onClose,
  onConfirm,
}: LogoutConfirmModalContentProps) {
  return (
    <Stack gap="xs">
      {/* Main statement */}
      <Text fw={600} size="sm" ta="center">
        Log out of your account?
      </Text>

      {/* Description */}
      <Text size="xs" c="dimmed" ta="center">
        You can log back in anytime using your credentials.
      </Text>

      {/* Actions */}
      <Stack gap={6} mt="sm">
        <Button
          color="red"
          fullWidth
          radius="md"
          onClick={onConfirm}
          loading={isLoading}
        >
          Log out
        </Button>

        <Button
          variant="subtle"
          color="gray"
          fullWidth
          radius="md"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}

export default LogoutConfirmModalContent;
