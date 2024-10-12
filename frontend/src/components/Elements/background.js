import { Box, Text, Flex, Grid, Container } from "@chakra-ui/react";
import Wave from "./wave";
import Spring from "./spring";
import Thunder from "./thunder";
import Semi from "./semi";

const BackgroundComponent = ({ children, ...props }) => {
  return (
    <Box
      position="relative"
      bg="#04539D"
      bgSize="cover"
      //   bgPosition="center"
      minHeight="100vh"
      width="100%"
      overflow="hidden"
      {...props}
    >
      <Wave
        top="3.3vh"
        left="4vw"
        height="4.75vh"
        width="8.25vw"
        filter="drop-shadow(0px 2.85px 10.67px rgba(0, 0, 0, 0.5))"
      />
      <Wave top="9.2vh" left="7.5vw" height="4.75vh" width="8.25vw" />

      <Spring
        top="55.4vh"
        left="95vw"
        height="25.03vh"
        width="9.54vw"
        // filter="drop-shadow(0px 2.85px 10.67px rgba(0, 0, 0, 0.5))"
      />
      <Semi
        bottom="0vh"
        left="-3vh"
        height="9.55vh"
        width="8.25vw"
        filter="drop-shadow(0px 2.85px 10.67px rgba(0, 0, 0, 0.5))"
      />




      <Flex
        direction="column"
        height="100vh"
        alignItems="center"
        px={4}
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Flex
            position={"absolute"}
            top="5.56vh"
            left="0"
            right="0"
            margin="0 auto"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              fontFamily="Arial"
              fontSize={["8vw", "6vw", "120px"]}
              fontWeight="900"
              lineHeight={["9vw", "7vw", "180px"]}
              textAlign="left"
              bg="linear-gradient(0deg, rgba(0, 122, 255, 0.15), rgba(0, 122, 255, 0.15)), linear-gradient(0deg, #CBDCF3, #CBDCF3)"
              bgClip="text"
              color="transparent"
              zIndex={2}
            >
              COM
            </Text>
            <Text
              fontFamily="Arial"
              fontSize={["8vw", "6vw", "120px"]}
              fontWeight="900"
              lineHeight={["9vw", "7vw", "180px"]}
              textAlign="left"
              color="transparent"
              padding="0 8px"
              sx={{
                WebkitTextStroke: "2.47px rgba(203, 220, 243, 1)",
                WebkitTextFillColor: "transparent",
              }}
              zIndex={2}
            >
              CONNECT
            </Text>
            <Thunder top="17.25vh" height="10.03vh" width="9.54vw" zIndex={1} />
          </Flex>
        </Box>

        <Box
          borderRadius="10px"
          p={5}
          width={["90%", "80%", "60%"]}
          position="relative" 
          top="19vh"
          zIndex={3}
          className="translucent-box"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default BackgroundComponent;
