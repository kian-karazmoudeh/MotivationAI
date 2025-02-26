import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

function FormField({ name, label, placeholder, type = "text", isTextarea = false, ...rest }) {
  const { register, formState: { errors } } = useFormContext();
  
  const InputComponent = isTextarea ? Textarea : Input;
  
  return (
    <FormControl isInvalid={!!errors[name]}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputComponent
        id={name}
        placeholder={placeholder}
        {...register(name)}
        type={type}
        {...rest}
      />
      <FormErrorMessage>
        {errors[name]?.message}
      </FormErrorMessage>
    </FormControl>
  );
}

export default FormField; 