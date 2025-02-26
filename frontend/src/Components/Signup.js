import { Box, Button, FormControl, Heading, HStack, Step, StepIcon, StepIndicator, Stepper, StepSeparator, StepStatus, VStack } from "@chakra-ui/react";
import { useState } from "react";
import PersonalDetails from "./FormPages/PersonalDetails";
import Motivators from "./FormPages/Motivators";
import Demotivators from "./FormPages/Demotivators";
import FinishingTouches from "./FormPages/FinishingTouches";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";


function Signup() {
    const signIn = useSignIn();
    const [ formData, setFormData ] = useState({
        firstname: "",
        lastname: "",
        about: "",
        bigDream: "",
        inspiration: "",
        obstacles: "",
        fears: "",
        regrets: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [ page, setPage ] = useState(0);
    const steps =[
        {
            title: "About yourself",
            body: <PersonalDetails formData={formData} setFormData={setFormData} />
        },
        {
            title: "What Motivates you",
            body: <Motivators formData={formData} setFormData={setFormData} />
        },
        {
            title: "What Demotivates you",
            body: <Demotivators formData={formData} setFormData={setFormData} />
        },
        {
            title: "Finishing Touches",
            body: <FinishingTouches formData={formData} setFormData={setFormData} />
        }
    ]

    
    async function handleSignup(e) {
        e.preventDefault();

        // some validation comes here

        try {
            const response = await axios.post("http://localhost:5000/signup", formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              });
            
            if (response.data.token) {
                signIn({
                    auth: {
                        token: response.data.token,
                        type: "Bearer"
                    },
                    userState: { email: formData.email }
                });
                alert("Signup successful");
              }
            // Redirect or update state after successful login
          } catch (err) {
            console.log(err)
            alert("error")
          }
    }


    return (
        <FormControl maxW='500px'>
            <Stepper size='sm' index={page} gap='0' m={1.5}>
                {steps.map((step, index) => (
                <Step key={index} gap='0'>
                    <StepIndicator>
                    <StepStatus complete={<StepIcon />} />
                    </StepIndicator>
                    <StepSeparator _horizontal={{ ml: '0' }} />
                </Step>
                ))}
            </Stepper>
            <Heading m={3}>{steps[page].title}</Heading>
            <Box m={3}>{steps[page].body}</Box>
            <HStack m={3}>
                <Button 
                    onClick={() => setPage(prev => prev - 1)}
                    disabled={page === 0}
                    hidden={page === 0}
                    >Previous</Button>
                <Button
                    onClick={() => setPage(prev => prev + 1)}
                    disabled={page === steps.length - 1}
                    hidden={page === steps.length - 1}
                    >Next</Button>
                <Button
                    onClick={handleSignup}
                    disabled={page != steps.length - 1}
                    hidden={page != steps.length - 1}>
                    Submit
                </Button>
            </HStack>
        </FormControl>
    )
}

export default Signup;