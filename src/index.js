//手动实现redux，redux三要素：reducer createStore renderApp
function reducer(state,action){
	if(!state){
		return {
			title:{
				text:'网站标题',
				color:'red'
			},
			content:{
				text:'网站内容',
				color:'blue'
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
			return{
				...state,
				title:{
					...state.title,
					color:action.color
				}
			}
		default:
			return state;
	}
}

function createStore(reducer){
	let state = null;
	//观察者模式修改state
	const listeners = [];
	const subscribe = (listener) => listeners.push(listener);
	const getState = ()=>state;
	const dispatch = (action)=>{
		state = reducer(state,action);
		listeners.forEach((listener)=>listener());
	}
	dispatch({}); //初始化state
	return {getState,dispatch,subscribe};
}

function renderApp(newAppState,oldAppState={}){
	if(newAppState == oldAppState) return;
	console.log("render app...");
	renderTitle(newAppState.title,oldAppState.title);
	renderContent(newAppState.content,oldAppState.content);	
}

function renderTitle(newTitle,oldTitle={}){
	if(newTitle === oldTitle) return;
	console.log('render title...');
	const titleDOM = document.getElementById('title');
	titleDOM.innerHTML = newTitle.text;
	titleDOM.style.color = newTitle.color;
}

function renderContent(newContent,oldContent={}){
	if(newContent === oldContent) return;
	console.log('render content...');
	const contentDOM = document.getElementById("content");
	contentDOM.innerHTML = newContent.text;
	contentDOM.style.color = newContent.color;
}

//创建store
const store = createStore(reducer);
let oldState = store.getState();// 缓存state
store.subscribe(()=>{
	const newState = store.getState();
	renderApp(newState,oldState);
	oldState = newState;
});

//首次渲染页面
renderApp(store.getState());
store.dispatch({type:'UPDATE_TITLE_TEXT',text:'修改过的网站标题'});
store.dispatch({type:'UPDATE_TITLE_COLOR',color:'pink'});