import { Box, useRadio } from "@chakra-ui/react"


function RadioButton(props) {
    const { getInputProps, getRadioProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getRadioProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='2px'
          borderRadius='full'
          borderColor='blackAlpha.800'
          _checked={{
            bg: 'teal.600',
            color: 'white',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={5}
          py={2}
        >
          {props.children}
        </Box>
      </Box>
    )
  }

  export default RadioButton