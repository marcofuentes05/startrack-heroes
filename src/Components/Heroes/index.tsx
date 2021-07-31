import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import * as selectors from '../../reducers';
import * as actions from '../../actions/heroes';
import { GeneralState } from '../../interfaces';
import { FixedSizeList as List } from 'react-window';
import Card from '../Card';
interface HeroesListProps {
  getHeroes: () => void,
  heroesList: [Object],
  heroesListIsFetching: boolean,
}

const CoreRow = ({ index, style, data }) => {
  const element = data[0];
  const {
    images,
    name,
    biography: {
      fullName,
    }
  } = element;
  const rating = 4;
  return (
    <div style={style}>
      <div className="row g-0">
        <Card images={images} name={name} real_name={fullName} rating={rating} />
        <Card images={images} name={name} real_name={fullName} rating={rating} />
        <Card images={images} name={name} real_name={fullName} rating={rating} />
      </div>
    </div>
  );
}

const Row = connect(
  (state: GeneralState) => ({
    data: selectors.getHeroesData(state),
  })
)(CoreRow)

const Heroes =(props: HeroesListProps) => {
  const {
    getHeroes,
    heroesList,
    heroesListIsFetching,
  } = props;
  useEffect(() => getHeroes(), [])
  return(
    <div className="container-fluid text-white">
      {
        heroesListIsFetching&&heroesList ? (
          <>
            <h1>
              Loading
            </h1>
          </>
        ) : (
          <List
            height={600}
            itemCount={heroesList.length / 4}
            itemSize={170}
            width={1300}
          >
            {Row}
          </List>
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