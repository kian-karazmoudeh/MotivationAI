import { Box, Button, Center, Heading, useRadioGroup, VStack, HStack } from "@chakra-ui/react";
import RadioButton from "./RadioButton";
import { useState } from "react";
import axios from "axios";

function Main() {
  const options = ['happy', 'sad', 'tired', 'angry', 'stressed', 'excited', 'relaxed', 'bored', 'anxious', 'confused'];
  const [mood, setMood] = useState("");

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'mood',
    value: mood,
    onChange: setMood,
  });

  const group = getRootProps();

  async function handleMotivate() {
    // send a request to /motivate with the mood and jwt token
    try {
      const response = await axios.get("http://localhost:5000/motivate/" + mood,
       {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      
      console.log(response.data);
      // Redirect or update state after successful login
    } catch (err) {
      console.log(err)
      alert("error")
    }
  }

  return (
    <Center h="100vh" w="100vw">
      <VStack>
        <Heading>
          How are you feeling today?
        </Heading>
        
        <HStack {...group}>
          {options.map((value) => {
            const radio = getRadioProps({ value });
            return (
              <RadioButton key={value} {...radio}>
                {value}
              </RadioButton>
            );
          })}
        </HStack>
        <Button disabled={mood === "" ? true : false} onClick={handleMotivate}>Motivate me!</Button>
      </VStack>
    </Center>
  );
}

export default Main;
