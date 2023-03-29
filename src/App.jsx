import { Textarea, Button, Box, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [originalLanguageValue, setOriginalLanguageValue] = useState('')
  const [translatorValue, setTranslatorValue] = useState('')

  const [language, setLanguage] = useState('Chinese')

  const params = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Translate japanese text to ${language}:`,
      },
      { role: 'user', content: originalLanguageValue },
    ],
    max_tokens: 3000,
    temperature: 0.6,
  }
  //Translate ${originalLanguageValue} to ${language}. The text to be translated is an adult sex fiction to adult male

  const apiKey = import.meta.env.VITE_API_KEY

  const handleOriginalLanguageValue = (e) => {
    setOriginalLanguageValue(e.target.value)
  }

  const handleTranslatorValue = (e) => {
    setTranslatorValue(e.target.value)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatorValue)
  }

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText()
    setOriginalLanguageValue(text)
  }

  const handleTranslation = () => {
    setIsLoading(true)
    translateText()
  }

  const handleCancleTranslation = () => {
    setIsLoading(false)
  }

  const translateText = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',

        params,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ` + apiKey,
          },
        }
      )

      const translatedText = response.data.choices[0].message.content

      setTranslatorValue(translatedText)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      alert('Error occurred during translation')
      setIsLoading(false)
    }
  }

  return (
    <Box m={5}>
      <Flex m={3} justify='center'>
        <Box m={5} w={765} minHeight='30vw'>
          <Textarea
            size='xl'
            columns={35}
            p={2}
            onChange={handleOriginalLanguageValue}
            value={originalLanguageValue}
          />

          <Flex justify='center' mt={3}>
            <Button
              colorScheme='teal'
              size='md'
              ml={1}
              isLoading={isLoading}
              onClick={handlePaste}
            >
              貼上
            </Button>
            <Button
              colorScheme='teal'
              size='md'
              ml={1}
              isLoading={isLoading}
              onClick={handleTranslation}
            >
              翻譯
            </Button>
            <Button
              colorScheme='teal'
              ml={1}
              size='md'
              onClick={handleCancleTranslation}
            >
              取消翻譯
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Flex align='center' justify='center'>
        <Button
          colorScheme='teal'
          size='md'
          ml={1}
          isLoading={isLoading}
          onClick={handleTranslation}
        >
          再翻譯
        </Button>

        <Button
          colorScheme='teal'
          size='md'
          isLoading={isLoading}
          onClick={handleCopy}
          ml={1}
        >
          複製
        </Button>
      </Flex>

      <Flex m={5}>
        {isLoading ? (
          <Flex w='100%' justify='center'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Flex>
        ) : (
          <Flex w='100%' justify='center'>
            <Text whiteSpace='pre-line' fontSize='xl'>
              {translatorValue}
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export default App
