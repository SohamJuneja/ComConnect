import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import "./home.css";
import Wave from "../components/Elements/wave";
import Spring from "../components/Elements/spring";
import BackgroundComponent from "../components/Elements/background";
import Text_Box from "../components/Elements/text_box";

function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/workspace");
  }, [navigate]);

  return (
    <BackgroundComponent>
<Box
        d="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh">
        <Box p={2} width="100%" className="container" >
          <Box className="left-box" flex="1" display="flex" flexDirection="column" bottom="0px">
            <Box position="relative" mb="0px">
              <Text
                fontFamily="Inter"
                fontWeight="700"
                lineHeight={{ base: "40px", md: "55px", lg: "66.65px" }}
                fontSize={{ base: "24px", md: "34px", lg: "44.43px" }}
                textAlign="left"
                color="#FAFAFC"
                mb={{ base: "4px", md: "6px", lg: "8px" }}
              >
                Hey, <br />
                Welcome Back!
              </Text>
            </Box>
            <Box position="relative" mt="0px">
              <Text_Box children="We are very happy to see you again!" />
            </Box>

            <Tabs isFitted variant="soft-rounded">
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
          <Box className="right-box">
            <img src="images/Frame.png" alt="Decorative" padding="auto"/>
          </Box>
        </Box>
      </Box>
    </BackgroundComponent>
  );
}

export default Homepage;
