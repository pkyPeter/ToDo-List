
let reducer = function(state, action) {
  switch(action.type){

    case "handleTextChange":
      let textContent = action.e.currentTarget.value;
      return Object.assign({}, state, {
        text: textContent
      });

    case "handleSubmit":
      let listItem;
      let newList;
      listItem = { text: state.text, isCompleted: false }
      console.log(state);
      if ( state.lists != undefined ) {
        newList = state.lists.slice(0);
        newList.unshift(listItem);
      } else {
        newList = [];
        newList.unshift(listItem);
      }
      return Object.assign({}, state, {
        lists: newList
      });

    case "handleRemoveItem":
      let listForRenew = state.lists;
      //這邊的removeItems是被刪掉的那個item，請注意splice的回傳值
      let removeItems = state.lists.splice(action.index,1);
      console.log(oldItems);
      return Object.assign({}, state, {
        lists: listForRenew
      });

      case "handleCompleteStage":
      let itemForRenew = state.lists;
      itemForRenew[action.index].isCompleted = !itemForRenew[action.index].isCompleted;
        return Object.assign({}, state, {
          lists: itemForRenew
        });

      case "showall":
        return Object.assign({}, state, {
          completeFilter: action.completeFilter,
          incompleteFilter: action.incompleteFilter
        });

      case "showCompletedTask":
        return Object.assign({}, state, {
          completeFilter: action.completeFilter,
          incompleteFilter: action.incompleteFilter
        });

      case "showIncompleteTask":
        return Object.assign({}, state, {
          completeFilter: action.completeFilter,
          incompleteFilter: action.incompleteFilter
        });


    default:
      return state;
  }
}


export default reducer;
