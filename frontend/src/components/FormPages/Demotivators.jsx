import { VStack } from "@chakra-ui/react";
import FormField from "../FormField";

function Demotivators() {
    return (
    <VStack spacing={3}>
        <FormField 
            name="obstacles"
            placeholder="What are the 3 biggest Obstacles in your life right now?"
            isTextarea={true}
        />
        <FormField 
            name="fears"
            placeholder="What are your biggest fears?"
            isTextarea={true}
        />
        <FormField 
            name="regrets"
            placeholder="What are your biggest regrets?"
            isTextarea={true}
        />
    </VStack>)
}

export default Demotivators;