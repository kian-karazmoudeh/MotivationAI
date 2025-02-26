import {
  Box,
  Button,
  Center,
  Heading,
  useRadioGroup,
  VStack,
  HStack,
} from "@chakra-ui/react";
import RadioButton from "./RadioButton";
import { useState } from "react";
import axios from "axios";
import MotivateInput from "./MotivateInput";
import MotivationOutput from "./MotivationOutput";
import ProtectedRoute from "./ProtectedRoute";

function Main() {
  const [quote, setQuote] = useState("");

  return (
    <ProtectedRoute>
      <Box maxW={"400px"}>
        {quote.length == 0 ? (
          <MotivateInput quote={quote} setQuote={setQuote} />
        ) : (
          <MotivationOutput quote={quote} setQuote={setQuote} loading={false} />
        )}
      </Box>
    </ProtectedRoute>
  );
}

export default Main;
