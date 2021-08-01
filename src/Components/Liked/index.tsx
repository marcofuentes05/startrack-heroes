import React, { FC } from 'react';
import './styles.scss'
import { connect } from 'react-redux'
import * as selectors from '../../reducers';

import * as actions from '../../actions/liked';
import { GeneralState } from '../../interfaces';
import { Collapse } from 'react-collapse';
import Card from '../Card';

import { FixedSizeList as List } from 'react-window';
import mediumHeart from '../../assets/medium-heart/medium-heart.svg'
import arrowUp from '../../assets/arrow-up/arrow-up.svg'
import bigHeart from '../../assets/big-heart/big-heart.svg'
import { useWindowDimensions, calculatePowerScore } from '../../utils';

interface LikedProps{
  liked: Object,
  likedLength: number,
  collapsed: boolean,
  notCollapse: () => void,
}

const CoreRow = ({ index, style, data }) => {
  const dataRow = data.slice(index * 4, index * 4 + 4);
  return (
    <div style={style}>
      <div className="row g-0 my-row-heroes">
        {
          dataRow.map((value, insideIndex) => (
            <Card
              images={value.images}
              name={value.name}
              real_name={value.biography.fullName}
              rating={calculatePowerScore(value.powerstats)}
              id={value.id}
              liked={true}
              isLast={index*4+insideIndex === dataRow.length-1}
            />
          ))
        }
      </div>
    </div>
  );
}

const Row = connect(
  (state: GeneralState) => ({
    data: selectors.getLikedObjects(state),
  })
)(CoreRow)

const CoreLiked:FC<LikedProps> = (props) => {
  const {
    likedLength,
    collapsed,
    notCollapse
  } = props;
  const {width, height} = useWindowDimensions();
  return (
    <div className={`row liked-container ${!collapsed && 'collapsed'}`}>
      <div className="col">
        <div className="row title">
          <div className="col-1 title-heart" >
            <img src={mediumHeart} alt="" />
          </div>
          <div className="col-2 text-white text-left title-text">
            <h1>Liked</h1>
          </div>
          <div className="col-1 offset-8">
            <img src={arrowUp} alt="" className={`${collapsed ? 'normal-arrow' : 'inverted-arrow'}`} onClick={() => notCollapse()} />
          </div>
        </div>
        <Collapse isOpened={collapsed}>
          <div className="row body">
            {
              likedLength === 0 ? (
                <div className="col">
                  <img src={bigHeart} alt="" className="big-heart" />
                  <p className="empty-text">You haven't like any superhero yet</p>
                </div>
              ) : (
                <div className="col">
                  <div className="row">
                    <List
                      height={height * 3 / 4}
                      itemCount={(likedLength/4)+1}
                      itemSize={height * 2 / 7}
                      width={width * 5 / 6}
                    >
                      {Row}
                    </List>
                  </div>
                </div>
              )
            }
          </div>
        </Collapse>
      </div>
    </div>
  )
}

export default connect(
  (state: GeneralState) => ({
    likedLength: selectors.getLikedLength(state),
    collapsed: selectors.getCollapsed(state),
  }),
  (dispatch) => ({
    notCollapse() {
      dispatch(actions.collapseLiked())
    }
  }),
)(CoreLiked);