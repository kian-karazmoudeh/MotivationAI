import { Button, FormControl, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { redirect } from "react-router";


function Login() {
    // const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    // useEffect(() => {
    //     console.log(isAuthenticated);
    //     if (isAuthenticated) {
    //         redirect("/signup");
    //     }
    // }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:5000/authenticate", {
              email,
              password,
            }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              });
            console.log(signIn);
            if (response.data.token) {
                signIn({
                    auth: {
                        token: response.data.token,
                        type: "Bearer"
                    },
                    userState: { email }
                });
                alert("Login successful!");
              }
            // Redirect or update state after successful login
          } catch (err) {
            console.log(err)
            alert("error")
          }
    }

    return (
        <FormControl>
            <Input value={email} onChange={e => setEmail(e.target.value)}/>
            <Input value={password} onChange={e => setPassword(e.target.value)}/>
            <Button onClick={handleSubmit}>Login</Button>
        </FormControl>
    )
}

export default Login;