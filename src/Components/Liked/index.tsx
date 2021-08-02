import React, { FC } from 'react';
import './styles.scss'
import { connect } from 'react-redux'
import * as selectors from '../../reducers';

import * as actions from '../../actions/liked';
import { GeneralState } from '../../interfaces';
import { Collapse } from 'react-collapse';
import Card from '../Card';

import { FixedSizeGrid as Grid } from 'react-window';
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

const CoreCell = ({ columnIndex, rowIndex, style, data }) => {
  const {width} = useWindowDimensions();
  const value = data.likedHeroes[rowIndex * (width<=1440 ? 4 : 5) + columnIndex];
  return (
    value ? <div style={style}>
      <Card
        images={value.images}
        name={value.name}
        real_name={value.biography.fullName}
        rating={calculatePowerScore(value.powerstats)}
        id={value.id}
        liked={true}
        isLast={rowIndex*4 + columnIndex === data.likedHeroes.length -1}
      />
    </div> : <></>
  )
}

const CoreLiked:FC<LikedProps> = (props) => {
  const {
    likedLength,
    collapsed,
    data,
    notCollapse
  } = props;
  const {width, height} = useWindowDimensions();
  const colCount = width<=1440 ? 4 : 5
  const rowCount = ((likedLength/colCount) + 1)|0
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
                      <Grid
                        columnCount={colCount}
                        columnWidth={colCount===4 ? width * 0.19 : width*0.15}
                        height={height /3}
                        rowCount={rowCount}
                        rowHeight={colCount ===4 ? height * 2 / 7 : height*0.15}
                        width={width * 5 / 5}
                        itemData={{
                          likedHeroes: data,
                        }}
                      >
                        {CoreCell}
                      </Grid>
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
    data: selectors.getLikedObjects(state),
    likedLength: selectors.getLikedLength(state),
    collapsed: selectors.getCollapsed(state),
  }),
  (dispatch) => ({
    notCollapse() {
      dispatch(actions.collapseLiked())
    }
  }),
)(CoreLiked);