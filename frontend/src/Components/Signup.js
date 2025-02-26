import { Box, Button, FormControl, Heading, HStack, Step, StepIcon, StepIndicator, Stepper, StepSeparator, StepStatus, VStack } from "@chakra-ui/react";
import { useState } from "react";
import PersonalDetails from "./FormPages/PersonalDetails";
import Motivators from "./FormPages/Motivators";
import Demotivators from "./FormPages/Demotivators";
import FinishingTouches from "./FormPages/FinishingTouches";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schema/signupSchema";

function Signup() {
    const signIn = useSignIn();
    const [ page, setPage ] = useState(0);
    
    const methods = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
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
        },
        mode: "onChange"
    });
    
    const steps = [
        {
            title: "About yourself",
            body: <PersonalDetails />
        },
        {
            title: "What Motivates you",
            body: <Motivators />
        },
        {
            title: "What Demotivates you",
            body: <Demotivators />
        },
        {
            title: "Finishing Touches",
            body: <FinishingTouches />
        }
    ];

    async function handleSignup(data) {
        try {
            const response = await axios.post("http://localhost:5000/signup", data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            
            if (response.data.token) {
                signIn({
                    auth: {
                        token: response.data.token,
                        type: "Bearer"
                    },
                    userState: { email: data.email }
                });
                alert("Signup successful");
            }
        } catch (err) {
            console.log(err);
            alert("error");
        }
    }

    const nextPage = () => {
        setPage(prev => prev + 1);
    };

    const prevPage = () => {
        setPage(prev => prev - 1);
    };

    return (
        <FormProvider {...methods}>
            <FormControl as="form" maxW='500px' onSubmit={methods.handleSubmit(handleSignup)}>
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
                        onClick={prevPage}
                        disabled={page === 0}
                        hidden={page === 0}
                        >Previous</Button>
                    <Button
                        onClick={nextPage}
                        disabled={page === steps.length - 1}
                        hidden={page === steps.length - 1}
                        >Next</Button>
                    <Button
                        type="submit"
                        onClick={methods.handleSubmit(handleSignup)}
                        disabled={page !== steps.length - 1}
                        hidden={page !== steps.length - 1}>
                        Submit
                    </Button>
                </HStack>
            </FormControl>
        </FormProvider>
    );
}

export default Signup;