import { HStack, VStack } from "@chakra-ui/react";
import FormField from "../FormField";

function PersonalDetails() {
    return (
        <VStack spacing={3}>
            <HStack spacing={3} width="100%">
                <FormField 
                    name="firstname"
                    placeholder="Firstname" 
                />
                <FormField 
                    name="lastname"
                    placeholder="Lastname" 
                />
            </HStack>
            <FormField 
                name="about"
                placeholder="What does your daily routine look like?"
                isTextarea={true}
                h="200px"
            />
        </VStack>
    )
}

export default PersonalDetails;