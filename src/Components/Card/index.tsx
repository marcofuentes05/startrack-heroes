import React, {FC} from 'react'
import {connect} from 'react-redux';
import * as actions from '../../actions/liked';
import './styles.scss'
import fist from '../../assets/fist/fist.svg'
import smallHeart from '../../assets/small-heart/small-heart.svg'
import mediumFilledHeart from '../../assets/medium-filled-heart/medium-filled-heart.svg'
interface CardProps {
  id: number,
  name: string,
  real_name: string,
  rating: number,
  images: {
    xs: string,
    sm: string,
    md: string,
    lg: string,
  },
  likeHero: (id: number) => void,
  dislikeHero: (id: number) => void,
  liked: boolean,
  isLast: boolean,
}

const styles = (url:string) => ({
  backgroundImage: `url(${url})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
})

const Card:FC <CardProps> = (props) => {
  const {
    id,
    images,
    name,
    real_name,
    rating,
    likeHero,
    dislikeHero,
    liked,
    isLast,
  } = props;
  return (
    <div className="col-10 col-sm-6 col-md-4 col-lg-3 my-card-container" onClick={() => liked ? dislikeHero(id) : likeHero(id)}>
      {
        isLast && (
          <div className='is-last'>
            <p>
              Liked recently
            </p>
          </div>
        )
      }
      <div className="background" style={styles(images.lg)}>
        <div className="row g-0 my-card">
          <img className='img-thumbnail my-image' src={images.sm} alt="" />
          <img className='small-heart' src={liked ? mediumFilledHeart : smallHeart} alt="" />
          <div className="col g-0 my-card-text justify-content-center">
            <h6 className="name">{name}</h6>
            <p className="real-name">Real name: {real_name}</p>
            <p className="rating"><img src={fist} alt="" /><strong>{rating}</strong>/10</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    likeHero(id: number) {
      dispatch(actions.likeHero(id))
      window.scrollTo(0, 0)
    },
    dislikeHero(id: number) {
      dispatch(actions.dislikeHero(id))
    }
  })
)(Card);
