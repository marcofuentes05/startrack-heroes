import React, {FC} from 'react'
import './styles.scss'

interface Props {
  data: string
}

const Card:FC <Props> = (props) => {
  return (
    <>
      <h1>
        Hola test
      </h1>
    </>
  )
}

export default Card;
