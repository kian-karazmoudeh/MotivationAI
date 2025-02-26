import { HStack, Input, Textarea, VStack } from "@chakra-ui/react";

function Motivators({ formData, setFormData }) {
    return (
        <VStack spacing={3}>
            <Textarea placeholder="What's one big dream you are working towards?" 
                value={formData.bigDream}
                onChange={e => setFormData({ ...formData, bigDream: e.target.value})}/>
            <Textarea placeholder="Who or what inspires you?"
                value={formData.inspiration}
                onChange={e => setFormData({ ...formData, inspiration: e.target.value})} />
            
        </VStack>
    )
}

export default Motivators;