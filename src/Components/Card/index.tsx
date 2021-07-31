import React, {FC} from 'react'
import './styles.scss'
import fist from '../../assets/fist/fist.svg'
interface CardProps {
  name: string,
  real_name: string,
  rating: number,
  images: {
    xs: string,
    sm: string,
    md: string,
    lg: string,
  }
}

const styles = (url:string) => ({
  backgroundImage: `url(${url})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
})

const Card:FC <CardProps> = (props) => {
  const {
    images,
    name,
    real_name,
    rating,
  } = props;
  return (
    <div className="col-6 col-md-3 my-card-container" style={styles(images.lg)}>
      <div className="row g-0 my-card">
        <img className='img-thumbnail my-image' src={images.sm} alt="" />
        <div className="col g-0 my-card-text">
          <h5 className="name">{name}</h5>
          <p className="real-name">Real name: {real_name}</p>
          <p className="rating"><img src={fist} alt="" /><strong>{rating}</strong>/10</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
