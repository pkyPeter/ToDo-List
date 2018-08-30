// import React, { Component } from "react";
import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";

class ThingsList extends React.Component {

  render(){
    return <div key={this.props.key} index={this.props.index}>
      {this.props.text}
      <input type="checkbox" onChange={this.props.completedHandler} checked={this.props.checked} />
      <input type="submit" value="刪除" key={this.props.key} index={this.props.index} onClick={this.props.deleteHandler} />
     </div>;
  }
  // alterChecked() {
  //   this.setState( (currentProps, currentState) => ({checked : !currentProps.checked}))
  // }

}


class ThingsToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      lists: [],
      completeFilter: false,
      incompleteFilter: true,
      completeList: [],
      text:"",
      listLength: 0,
    }
  }
  render(){
let test;
test=this.state.lists
// console.log(test)
//   console.log(this.state.lists);
    return (
      <div>
        <div>
          <input type="button" value="全部" onClick={this.showall.bind(this)}/>
          <input type="button" value="已完成" onClick={this.showCompletedTask.bind(this)}/>
          <input type="button" value="未完成" onClick={this.showIncompleteTask.bind(this)}/>
        </div>
        <input type="text" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
        <input type="submit" value="新增" onClick={this.handleSubmit.bind(this)}/>
        <div className="thingsList">
          { //這邊用雙重filter，並且有兩個不同filter控制判斷complete與否
            this.state.lists.filter( list => !this.state.completeFilter || list.isCompleted ).filter( list => this.state.incompleteFilter || !list.isCompleted ).map((value, index) => {
              console.log(value);
              console.log(index);
              return <ThingsList text={value.text} key={index} index={index} deleteHandler={()=>{this.handleRemoveItem(index)}} completedHandler={()=>{this.handleCompleteStage(index)}}
              checked= {value.isCompleted}
              />
            })
          }
        </div>

      </div>
    )
  }
  handleTextChange(e) {
    this.setState({text: e.currentTarget.value});
  }
  handleSubmit(e) {
    let listItem;
    listItem = { text: this.state.text, isCompleted: false }
    this.state.lists.unshift(listItem);
    this.setState({lists: this.state.lists});

    // let newList = this.state.lists.unshift(listItem);
    // this.setState({lists: newList}); //這個方式不對

    // let newList = this.state.lists.slice(0);
    // newList.unshift(listItem);
    // this.setState({lists: newList}); //如果要寫另外命名一個新的，要這樣寫

    this.setState({text: ""});
    // console.log(listItem);
    // console.log(this.state.lists);
  }
  handleRemoveItem(index) {
    let oldItems = this.state.lists;
    let removeItems = this.state.lists.splice(index,1);    //這邊的Remove是被刪掉的那個item
    this.setState({
      lists: this.state.lists,    //整個陣列重新更新
    })
  }
  handleCompleteStage(index) {
    this.state.lists[index].isCompleted = !this.state.lists[index].isCompleted;
    this.setState({lists: this.state.lists});
    console.log(this.state.lists);
  }
  showall(){
    this.setState({completeFilter: false, incompleteFilter: true});
  }
  showCompletedTask(){
    this.setState({completeFilter: true, incompleteFilter: true});
  }
  showIncompleteTask(){
    this.setState({completeFilter: false, incompleteFilter: false})
  }
}


ReactDOM.render(<ThingsToDo />, document.querySelector("body"));
