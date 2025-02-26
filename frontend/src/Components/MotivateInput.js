import { Box, Button, Center, Heading, useRadioGroup, VStack, HStack } from "@chakra-ui/react";
import RadioButton from "./RadioButton";
import axios from "axios";
import { useState } from "react";

function MotivateInput({ quote, setQuote}) {
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
          
          setQuote(response.data.choices[0].message.content);
          // Redirect or update state after successful login
        } catch (err) {
          console.log(err)
          alert("error")
        }
      }

    return (
        <VStack>
            <Heading>How are you feeling today?</Heading>
            
            <HStack {...group}>
            {options.map((value) => {
                const radio = getRadioProps({ value });
                return <RadioButton key={value} {...radio}>{value}</RadioButton>;
            })}
            </HStack>

            <Button disabled={mood === "" ? true : false} onClick={handleMotivate}>Motivate me!</Button>
        </VStack>
    )
}

export default MotivateInput;