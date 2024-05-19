import { useEffect, useState } from "react";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Textarea,
} from "@chakra-ui/react";

import { Node } from "reactflow";

const SettingsPanel = ({
  selectedNode,
  updateTextChange,
}: {
  selectedNode: Node;
  updateTextChange: (e: string, node: Node) => void;
}) => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const [text, setText] = useState<string>(selectedNode.data.label);

  const handleSubmit = () => {
    updateTextChange(text, selectedNode);
    setOpen(false);
  };

  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.label);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedNode]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => setOpen(false)}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit Message</DrawerHeader>
        <DrawerBody>
          <Textarea
            placeholder="Enter Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={handleSubmit} colorScheme="blue">
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsPanel;
