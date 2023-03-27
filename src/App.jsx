import { Textarea, Stack, Button, Box, Flex } from '@chakra-ui/react'
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
        content: `Translate the Japanese text to ${language}:`,
      },
      { role: 'user', content: originalLanguageValue },
    ],
    max_tokens: 3000,
    temperature: 0.3,
  }

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
    <Flex m={10} justify='space-around'>
      <Box m={5}>
        <Textarea
          size='xl'
          columns={35}
          p={2}
          onChange={handleOriginalLanguageValue}
          resize='horizontal'
          value={originalLanguageValue}
        />

        <Stack spacing={4} direction='row' align='center' mt={10}>
          <Button
            colorScheme='teal'
            size='md'
            ml={1}
            isLoading={isLoading}
            onClick={handlePaste}
          >
            貼上
          </Button>
        </Stack>
      </Box>

      <Box m={5} mt={20}>
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
      </Box>

      <Box m={5}>
        {isLoading ? (
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        ) : (
          <Textarea
            size='xl'
            columns={35}
            p={2}
            resize='horizontal'
            onChange={handleTranslatorValue}
            value={translatorValue}
          />
        )}

        <Stack spacing={4} direction='row' align='center' mt={10}>
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
          >
            複製
          </Button>
        </Stack>
      </Box>
    </Flex>
  )
}

export default App
