/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import React from 'react';
// import { VariableSizeList as List } from 'react-window';
import { Button } from 'antd';
import moment from 'moment';
import Storage from './leancloud'
import { mockComponent } from 'react-dom/test-utils';

const BackgroundRow = function({height}){
  console.log(height)
  return (
    <div style={{backgroundColor:'#aaa',height: height}}></div>
  );
}

const KarmaRow = function({k, height}){
  console.log(k, height)
  const s = {height};
  s.backgroundColor='#ccf'
  let begin = moment(k.tbegin)
  let finish = moment(k.tend)
  return (
  <div style={s}>{begin.hour()}:{begin.minute()}-{finish.hour()}:{finish.minute()} {k.title}</div>
  );
};

function heightCalc(tStart, tEnd, unitTime){
  let m = moment(tEnd).diff(moment(tStart), 'm') / unitTime
  return 16 * m
}

function klist2data(klist, unitTime, tStart, tEnd){
  const result = [];
  var tLast = tStart
  var id = 49
  for(var k of klist){
    if(k.tbegin>tLast){
      result.push(<BackgroundRow key={id} height={heightCalc(tLast, k.tbegin, unitTime)}/>)
      id++
    }
    result.push(<KarmaRow key={k.id} k={k} height={heightCalc(k.tbegin, k.tEnd, unitTime)} />)
    tLast = k.tend
    if(tLast>=tEnd) return result;
  }
  result.push(<BackgroundRow key={id} height={heightCalc(tLast, tEnd, unitTime)}/>)
  return result;
}

class KarmaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      klist: klist2data(props.data, props.unit, props.begin, props.end),
      height: 600,
    }
  }

  render() {
    return (
      <div style={{height: this.state.height}}>
        {this.state.klist}
      </div>
    );
  }
}


const App = function(){
  return (<KarmaList data={[
    {id:1, title:'asdjflsjdfaj',tbegin: moment().subtract(360,'m').toDate(), tend:moment().subtract(300,'m').toDate()},
    {id:2, title:'lksjdflkjasldfj',tbegin: moment().subtract(250,'m').toDate(), tend:moment().subtract(160,'m').toDate()},
    {id:3, title:'jdfalksjdflkjasldfj',tbegin: moment().subtract(160,'m').toDate(), tend:moment().subtract(100,'m').toDate()},
    {id:4, title:'sldfj',tbegin: moment().subtract(40,'m').toDate(), tend:moment().subtract(10,'m').toDate()},
  ]} 
    unit={5}
    begin={moment().subtract(400,'m').toDate()}
    end={moment().subtract(4,'m').toDate()}
  />);
}

export default App;
