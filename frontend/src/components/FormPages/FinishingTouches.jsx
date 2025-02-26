import { VStack } from "@chakra-ui/react";
import FormField from "../FormField";

function FinishingTouches() {
    return (
        <VStack spacing={3}>
            <FormField 
                name="email"
                placeholder="Email"
                type="email"
            />
            <FormField 
                name="password"
                placeholder="Password"
                type="password"
            />
            <FormField 
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
            />
        </VStack>)
}

export default FinishingTouches;