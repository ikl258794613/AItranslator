import { ListItem } from './ListIten'
import { useEffect, useState } from 'react'
import { Text, Button } from '@chakra-ui/react'

// interface props {
//   list :{name:string,id:number}[]
//   header:string
// }

export function List({ list, header }) {
  const [listValue, setListValue] = useState(list)

  const handleDelect = (id) => {
    const _listValue = listValue.filter((item) => {
      return item.id !== id
    })

    setListValue(_listValue)
  }

  const handleAddItem = () => {
    const _listValue = [...listValue, { name: '', id: +new Date() }]
    setListValue(_listValue)
  }

  return (
    <>
      {header && <Text>{header}</Text>}
      {listValue.map((item, index) => {
        return <ListItem listItem={item} key={index} deleteFc={handleDelect} />
      })}
      <Button onClick={handleAddItem}>新增</Button>
    </>
  )
}
