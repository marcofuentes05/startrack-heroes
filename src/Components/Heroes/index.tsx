import React, {useEffect, useState, FC} from 'react';
import './styles.scss'
import {connect} from 'react-redux'
import * as selectors from '../../reducers';
import * as actions from '../../actions/heroes';
import { GeneralState } from '../../interfaces';
import { FixedSizeList as List } from 'react-window';
import ContentLoader from '../ContentLoader';
import Card from '../Card';
import search from '../../assets/search/search.svg';
import { calculatePowerScore, useWindowDimensions } from '../../utils';

interface HeroesListProps {
  getHeroes: () => void,
  heroesList: [Object],
  heroesListIsFetching: boolean,
}

const CoreRow = ({ index, style, data }) => {
  const dataRow = data.heroesList.slice(index*4, index*4+4);
  return (
    <div style={style}>
      <div className="row g-0 my-row-heroes">
        {
          dataRow.map(value => (
            <Card 
              images={value.images}
              name={value.name} 
              real_name={value.biography.fullName}
              rating={calculatePowerScore(value.powerstats)}
              id={value.id}
              liked={false}
            />
          ))
        }
      </div>
    </div>
  );
}

const Row = connect(
  (state: GeneralState) => ({
    // data: selectors.getHeroesData(state),
  })
)(CoreRow)

const Heroes:FC<HeroesListProps> =(props) => {
  const {
    getHeroes,
    heroesList,
    heroesListIsFetching,
  } = props;
  useEffect(() => getHeroes(), [])
  const [searchText, setSearchText] = useState('')
  let heroesListFiltered = heroesList.filter(
    (element) => element.name.toUpperCase().indexOf(searchText.toUpperCase()) >= 0 || element.biography.fullName.toUpperCase().indexOf(searchText.toUpperCase()) >= 0 )
  const { width, height } = useWindowDimensions();
  return(
    <div className="row my-list-container">
      {
        heroesListIsFetching && heroesList ? (
          <ContentLoader />
        ) : (
          <div className="col">
            <div className="row">
              <h1 className="col-4 text-white">
                All Superheros
              </h1>
              <div className="col-3 offset-5">
                <div className="row search-container">
                  <img
                    src={search}
                    alt=""
                    className="search-icon" />
                  <input
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
              </div>
            </div>
            <div className="row">
              <List
                height={height * 3/4}
                itemCount={(heroesList.length/4)+1}
                itemSize={height * 2 / 7}
                width={width * 5/6}
                data={heroesList}
                itemData={{
                  heroesList: heroesListFiltered
                }}
                >
                {Row}
              </List>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default connect(
  (state: GeneralState)=> ({
    heroesList: selectors.getHeroesData(state),
    heroesListIsFetching: selectors.getHeroesIsFetching(state)
  }),
  (dispatch)=> ({
    getHeroes(){
      dispatch(actions.fetchHeroesStarted())
    },
  }),
)(Heroes);