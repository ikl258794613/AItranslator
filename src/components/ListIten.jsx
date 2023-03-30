import { Button, Flex, Input, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { copy } from '../hook/common'

export function ListItem({ deleteFc, listItem }) {
  const [inputValue, setInputValue] = useState('')
  const [id, setId] = useState(0)

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  //handleDelete function由父元件傳下來
  const handleDelete = (id) => {
    deleteFc(id)
  }

  const handleCopy = () => {
    copy(inputValue)
  }

  const handle = () => {
    console.log(id)
  }

  useEffect(() => {
    setInputValue(listItem.name)
    setId(listItem.id)
  }, [])

  return (
    <>
      <Flex marginTop={2}>
        <Box width='150px' marginRight={10}>
          <Input value={inputValue} size='sm' onChange={handleChange} />
        </Box>

        <Button
          marginRight={1}
          colorScheme='blue'
          size='md'
          onClick={handleCopy}
        >
          複製
        </Button>
        <Button
          marginRight={1}
          colorScheme='red'
          size='md'
          onClick={() => {
            handleDelete(id)
          }}
        >
          刪除
        </Button>
        <Button marginRight={1} size='md' onClick={handle}></Button>
      </Flex>
    </>
  )
}
