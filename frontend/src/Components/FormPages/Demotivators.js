import { Textarea, VStack } from "@chakra-ui/react";

function Demotivators({ formData, setFormData }) {
    return (
    <VStack spacing={3}>
        <Textarea placeholder="What are the 3 biggest Obstacles in your life right now?"
            value={formData.obstacles}
            onChange={e => setFormData({ ...formData, obstacles: e.target.value})}/>
        <Textarea placeholder="What are your biggest fears?"
            value={formData.fears}
            onChange={e => setFormData({ ...formData, fears: e.target.value})}/>
        <Textarea placeholder="What are your biggest regrets?"
            value={formData.regrets}
            onChange={e => setFormData({ ...formData, regrets: e.target.value})} />
    </VStack>)
}

export default Demotivators;