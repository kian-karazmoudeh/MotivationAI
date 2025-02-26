import { Input, Textarea, VStack } from "@chakra-ui/react";


function FinishingTouches({ formData, setFormData }) {
    return (
        <VStack spacing={3}>
            <Input placeholder="Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value})}/>
            <Input placeholder="Password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value})}/>
            <Input placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value})} />
        </VStack>)
}

export default FinishingTouches;