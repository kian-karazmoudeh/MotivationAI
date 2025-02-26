import { VStack } from "@chakra-ui/react";
import FormField from "../FormField";

function Motivators() {
    return (
        <VStack spacing={3}>
            <FormField 
                name="bigDream"
                placeholder="What's one big dream you are working towards?"
                isTextarea={true}
            />
            <FormField 
                name="inspiration"
                placeholder="Who or what inspires you?"
                isTextarea={true}
            />
        </VStack>
    )
}

export default Motivators;