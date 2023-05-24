import { Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
      bottom={0}
    >
      <hr />
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "1"]}
          >
            We are the best crypto trading service provider in india, we prove
            our guidance at a very reasonable price.
          </Text>
          <Text color={"gray.500"} fontSize={"sm"}>
            &copy; 2023 Xcrypto, Inc. All rights reserved.
          </Text>
        </VStack>
        {/* <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} />
          <Text>Our Founder</Text>
        </VStack> */}
      </Stack>
    </Box>
  );
};

export default Footer;
