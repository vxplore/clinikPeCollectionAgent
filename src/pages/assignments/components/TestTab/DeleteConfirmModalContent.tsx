import { Button, Text, Stack } from "@mantine/core";

interface DeleteConfirmModalContentProps {
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  testName?: string;
}

function DeleteConfirmModalContent({
  isLoading = false,
  onClose,
  onConfirm,
  testName = "this test",
}: DeleteConfirmModalContentProps) {
  return (
    <Stack gap="xs">
      {/* Main statement */}
      <Text fw={600} size="sm" ta="center">
        Delete {testName}?
      </Text>

      {/* Description */}
      <Text size="xs" c="dimmed" ta="center">
        This action cannot be undone.
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
          Delete
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

export default DeleteConfirmModalContent;
