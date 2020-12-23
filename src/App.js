/* eslint-disable */
import './App.css';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

let containerCount = 0;

class CellContainer extends React.Component {
  constructor(args) {
      super(args);
      this._containerId = containerCount++;
  }
  render() {
      return <div {...this.props}>{this.props.children}<div>Cell Id: {this._containerId}</div></div>;
  }
}

/***
* To test out just copy this component and render in you root component
*/
export default class RecycleTestComponent extends React.Component {
  constructor(args) {
      super(args);

      let width = window.innerWidth;

      //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
      let dataProvider = new DataProvider((r1, r2) => {
          return r1 !== r2;
      });

      //Create the layout provider
      //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
      //Second: Given a type and object set the height and width for that type on given object
      //If you need data based check you can access your data provider here
      //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
      //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
      this._layoutProvider = new LayoutProvider(
          index => {
              if (index % 3 === 0) {
                  return ViewTypes.FULL;
              } else if (index % 3 === 1) {
                  return ViewTypes.HALF_LEFT;
              } else {
                  return ViewTypes.HALF_RIGHT;
              }
          },
          (type, dim) => {
              switch (type) {
                  case ViewTypes.HALF_LEFT:
                      dim.width = width / 2 - 0.0001;
                      dim.height = 160;
                      break;
                  case ViewTypes.HALF_RIGHT:
                      dim.width = width / 2;
                      dim.height = 160;
                      break;
                  case ViewTypes.FULL:
                      dim.width = width;
                      dim.height = 140;
                      break;
                  default:
                      dim.width = 0;
                      dim.height = 0;
              }
          }
      );

      this._rowRenderer = this._rowRenderer.bind(this);

      //Since component should always render once data has changed, make data provider part of the state
      this.state = {
          dataProvider: dataProvider.cloneWithRows(this._generateArray(300)),
      };
  }

  _generateArray(n) {
      let arr = new Array(n);
      for (let i = 0; i < n; i++) {
          arr[i] = i;
      }
      return arr;
  }

  //Given type and data return the view component
  _rowRenderer(type, data) {
      //You can return any view here, CellContainer has no special significance
      switch (type) {
          case ViewTypes.HALF_LEFT:
              return (
                  <CellContainer style={styles.containerGridLeft}>
                      <div>Data: {data}</div>
                  </CellContainer>
              );
          case ViewTypes.HALF_RIGHT:
              return (
                  <CellContainer style={styles.containerGridRight}>
                      <div>Data: {data}</div>
                  </CellContainer>
              );
          case ViewTypes.FULL:
              return (
                  <CellContainer style={styles.container}>
                      <div>Data: {data}</div>
                  </CellContainer>
              );
          default:
              return null;
      }
  }

  render() {
      return <RecyclerListView useWindowScroll={true} layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
  }
}
const styles = {
  container: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      border: '0.5px solid black',
  },
  containerGridLeft: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      border: '0.5px solid black',
  },
  containerGridRight: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      border: '0.5px solid black',
  },
};

// function Activity(props){
//   return (
//     <div className="">{props.text}</div>
//   );
// }

// function BgTimeGrid(props){
//   let hour = props.timeMinute / 60
//   let txt = (hour < 10 ? "0" + hour : hour) + ":00"
//   return (
//     <div>{txt}</div>
//   );
// }

// function TimeHighlightLine(props){
//   /* 时间线刻度 */
//   return (
//     <div class="time_now">
//       <div class="left_text_red">{props.text}</div>
//       <div class="left_text_radio"></div>
//       <div class="time_line"></div>
//     </div>
//   )
// }

// class TimeRangePanel extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       chronon: props.chronon,  // minute, height 20px
//       bgGridList: map(i=>{
//         let list = [];
//         for (let m = 0; m <= 60 * 24; m+=props.chronon) {
//           list.push(
//             <BgTimeGrid timeMinute={m} chronon={props.chronon} />
//           )
//         }
//         return list
//       }),
//       activityList: props.activities.map(i=>{
//         let [h, m] = item.startTime.substring(11, 16).split(":")
//         let [hE, mE] = item.endTime.substring(11, 16).split(":")
//         let top = time2y(h, m);
//         return {
//             activityName: item.activityName,
//             startTime: item.startTime.substring(11, 16),
//             endTime: item.endTime.substring(11, 16),
//             style: {
//               top: top + 'px',
//               height: (time2y(hE, mE) - top) + 'px',
//             },
//             bgClass: {
//               'blurBg': true,
//               'selected': false,
//             },
//             editing: false,
//             showDetail: false,
//         }
//       })
//     }
//   }

//   mouseEnter(e){

//   }

//   mouseLeave(e){

//   }

//   mouseMove(e){
//     e.preventDefault()
//   }

//   render() {
//     return (
//       <div className="dayTable" onScroll={scroll}>
//         <TimeHighlightLine />
//         {/* bg table */}
//         <div className="calendar_bg" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onMouseMove={mouseMove} onMouseUp={mouseUp}>
//           {this.state.bgGridList}
//         </div>

//         <div className="calendar_activity">
//           <div class="create_content_box" onClick={(e)=>selectActivity(index,e)}>
//             <div class="meeting_content_name">{item.activityName}</div>
//           </div>
//         </div>

         
//         <TimeHighlightLine />
//       </div>
//     );
//   }
// }


// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];
// const Item = ({ title }) => {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
// }
// function App() {
//   const renderItem = ({ item }) => (
//     <Item title={item.title} />
//   );

//   // const hhh = [{
//   //   activityName: "会议测试测试测试测试测试测试gggggggggggddddd会议测试测试测试测试测试测试gggggggggggddddd会议测试测试测试测试测试测试gggggggggggddddd",
//   //   startTime: "2020-12-09 06:00:00",
//   //   endTime: "2020-12-09 08:30:02",
//   // }, {
//   //   activityName: "其他人的会议",
//   //   startTime: "2020-12-09 04:15:00",
//   //   endTime: "2020-12-09 05:30:02",
//   // }, {
//   //   activityName: "测试讨论bugdfdfsdfdsf会议",
//   //   startTime: "2020-12-09 15:15:00",
//   //   endTime: "2020-12-09 15:30:02",
//   // }];
//   return (
//     <div className="App">
//       {/* <TimeRangePanel date="2020-12-09" activities={hhh} chronon={15} /> */}
//       <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>
//     </div>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });
// export default App;
