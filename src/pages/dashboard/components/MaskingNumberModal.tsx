import { Button, Text, Stack, CopyButton } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

interface MaskingNumberModalProps {
  number: string;
  isLoading: boolean;
  onClose: () => void;
}

function MaskingNumberModal({
  number,
  isLoading,
  onClose,
}: MaskingNumberModalProps) {
  return (
    <Stack gap="xs">
      {/* Main statement */}
      <Text fw={600} size="sm" ta="center">
        Call Number
      </Text>

      {/* Display the masking number */}
      <div className="bg-gray-100 rounded-md p-3 text-center">
        <Text fw={700} size="lg" c="dark">
          {number}
        </Text>
      </div>

      {/* Description */}
      <Text size="xs" c="dimmed" ta="center">
        Your private number is ready. Copy and use it for the call.
      </Text>

      {/* Actions */}
      <Stack gap={6} mt="sm">
        <CopyButton value={number} timeout={2000}>
          {({ copied, copy }) => (
            <Button
              color={copied ? "green" : "black"}
              fullWidth
              radius="md"
              onClick={copy}
              loading={isLoading}
              // Set a fixed height or min-width to prevent the button
              // from "breathing" during the transition
              className="transition-colors duration-300 min-h-[42px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={copied ? "copied" : "copy"}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          )}
        </CopyButton>

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

export default MaskingNumberModal;
