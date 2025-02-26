import { HStack, Input, Textarea, VStack } from "@chakra-ui/react";

function PersonalDetails({ formData, setFormData }) {
    return (
        <VStack spacing={3}>
            <HStack spacing={3}>
                <Input placeholder="Firstname" value={formData.firstname} onChange={e => setFormData({ ...formData, firstname: e.target.value})} />
                <Input placeholder="Lastname" value={formData.lastname} onChange={e => setFormData({ ...formData, lastname: e.target.value})} />
            </HStack>
            <Textarea h="200px" placeholder="What does your daily routine look like?"
                value={formData.about} 
                onChange={e => setFormData({ ...formData, about: e.target.value })}/>
            
        </VStack>
    )
}

export default PersonalDetails;