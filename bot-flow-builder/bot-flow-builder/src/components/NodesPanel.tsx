import { Button, HStack } from "@chakra-ui/react";

const NodesPanel = ({
  addTextNode,
  handleSubmit,
  isNotValid,
}: {
  addTextNode: () => void;
  handleSubmit: () => void;
  isNotValid: boolean;
}) => {
  return (
    <HStack w="full" zIndex={2} justify="flex-end" position="relative">
      <Button
        top="30px"
        position="absolute"
        right="200px"
        color="white"
        bgColor="violet"
        variant="outline"
        isDisabled={!isNotValid}
        _hover={{
          bgColor: "violet",
          boxShadow: "md",
        }}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
      <Button
        top="30px"
        position="absolute"
        right="30px"
        variant="outline"
        bgColor="blue.500"
        color="white"
        _hover={{
          bgColor: "blue.600",
          boxShadow: "md",
        }}
        onClick={addTextNode}
      >
        Add Text Node
      </Button>
    </HStack>
  );
};

export default NodesPanel;
