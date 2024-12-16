import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel} from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast ,Divider,Box,Flex,Link} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import Text_Box from "../Elements/text_box";
import RememberMe from "./remember";
import GoogleLoginButton from "./loginwithgoogle";
const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5001,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/workspace");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel display="inline-flex"><Text_Box children="Email"/></FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
          bg="white"                          
          color="black"                        
          _placeholder={{ color: 'gray.500' }} 
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel display="inline-flex"><Text_Box children="Password"/></FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
            bg="white"                          
            color="black"                        
            _placeholder={{ color: 'gray.500' }} 
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}
            border="gray.700">
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
    
      <Text_Box children="By signing up, you are creating a COMCONNECT account, and you agree to COMCONNECT’s Term of Use and Privacy Policy."/>
      <RememberMe />
      <Button
        colorScheme="#FBB03B;
"
        color="#04539D"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Flex align="center" my={1} width="100%">
        <Divider orientation="horizontal" flex="1" borderColor="#E2E8F0" borderWidth={"1px"} />
        <Box 
          as="span" 
          color="#7E8B9E" 
          fontSize="sm" 
          lineHeight="1.2" 
          mx={2} // Increased margin for clearer visibility
        >
          OR
        </Box>
        <Divider orientation="horizontal" flex="1" borderColor="#E2E8F0" />
      </Flex>
      <GoogleLoginButton />
      <Box mt={4} display="flex" alignItems="center" justifyContent="center">
        <Text_Box fontSize="sm" color="gray.600" >
          Don’t have an account? 
          <Link href="/signup" color="#7E8B9E" ml={1} fontWeight="500">
            Sign Up here!
          </Link>
        </Text_Box>
      </Box>
      </FormControl>


      {/* <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button> */}
    </VStack>
  );
};

export default Login;
