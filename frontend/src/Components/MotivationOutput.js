import { Box, Button, HStack, SkeletonText, Stack, Text } from "@chakra-ui/react";


function MotivationOutput({ quote, setQuote, loading }) {
    return (
        <Stack spacing={5}>
            {loading ? <SkeletonText noOfLines={4} /> : (
                <>
                    <Text fontSize="2xl" borderLeftWidth='3px' borderColor='gray.900'px={5} >{quote}</Text>
                    <Button onClick={() => setQuote("")}>Get another quote</Button>
                </>
                
            )}
        </Stack>
    );
};

export default MotivationOutput;