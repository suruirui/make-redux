// const appState = {
//   title: {
//     text: '网站标题',
//     color: 'red',
//   },
//   content: {
//     text: '网站内容',
//     color: 'blue'
//   }
// }
//定义dispatch专门修改函数
//修改stateChanger 性能优化
//将state和stateChanger合并
//此时stateChanger已经是一个reducer 纯函数
function stateChanger(state,action){
	if (!state) {
	    return {
	      title: {
		    text: '网站标题',
		    color: 'red',
  		  },
		  content: {
		    text: '网站内容',
		    color: 'blue'
		  }
	    }
    }
	switch(action.type){
		case 'UPDATE_TITLE_TEXT':
			return{
				...state,
				title:{
					...state.title,
					text:action.text
				}
			}
		case 'UPDATE_TITLE_COLOR':
			return { // 构建新的对象并且返回
		        ...state,
		        title: {
	         	 ...state.title,
          		 color: action.color
        	}
      }
		default:
			return state;
	}
}
//定义createStore函数 ，同时具备数据状态和更改的方法
function createStore(stateChanger){
	let state = null;
	//使用观察者模式修改createStore 
	const listeners = [];
	//通过 subscribe 传入数据变化的监听函数
	const subscribe = (listener) => listeners.push(listener);
	const getState = () => state;
	const dispatch =(action) => {
		state = stateChanger(state,action);  //修改数据 覆盖原对象
		listeners.forEach((listener)=>listener());
	}
	dispatch({});// 初始化 state
	return {getState,dispatch,subscribe};
}

function renderApp(newAppState,oldAppState={}){
	if(newAppState === oldAppState) return;  //数据没有变化就不渲染了
	console.log('render app');
	renderTitle(newAppState.title,oldAppState.title);
	renderContent(newAppState.content,oldAppState.content);
}

function renderTitle(newTitle,oldTitle = {}){
	if(newTitle === oldTitle) return;
	console.log('render title');
	const titleDOM = document.getElementById("title");
	titleDOM.innerHTML = newTitle.text;
	titleDOM.style.color = newTitle.color;
}

function renderContent(newContent,oldContent = {}){
	if(newContent === oldContent) return;
	console.log('render content');
	const contentDOM = document.getElementById("content");
	contentDOM.innerHTML = newContent.text;
	contentDOM.style.color = newContent.color;
}
const store = createStore(stateChanger);
let oldState = store.getState() // 缓存旧的 state
store.subscribe(()=>{
	const newState = store.getState(); // 数据可能变化，获取新的 state
	renderApp(newState,oldState); // 把新旧的 state 传进去渲染
	oldState = newState; //渲染完以后新的newState变成了旧的oldState
});
//首次渲染页面
renderApp(store.getState());

store.dispatch({type:'UPDATE_TITLE_TEXT',text:'修改过的网站标题'});
store.dispatch({type:'UPDATE_TITLE_COLOR',color:'skyblue'});
// appState.title.text = '我就随便改下';
//渲染新的数据
// renderApp(store.getState());















//--------------es6浅拷贝demo--------------
function es6Demo(){
	const obj = {a:2,b:1};
	const obj2 = { ...obj,b:3,c:4};
	return obj2;
}
console.log(es6Demo());