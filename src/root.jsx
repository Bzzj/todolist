import React,{useState,useEffect} from 'react';

import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Checkbox from '@mui/material/Checkbox';

import Modal from '@mui/material/Modal';

//取得日期
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

export default function Nav(){

	const [openChangeHeader, setOpenChangeHeader] = useState(false);
	const [selectedHeader, setSelectedHeader] = useState(1);
	const [dialogType, setDialogType] = useState(null); 
	const [showRemind, setShowRemind] = useState(false);

	const [todolist, setTodolist] = useState([]);

	const handleClickOpenChangeHeader = (type) => {
	    setOpenChangeHeader(true);
	    setDialogType(type);
	};
	const handleCloseChangeHeader = () => {
	    setOpenChangeHeader(false);
	    setDialogType(null);
	};


	const headerImages = [
	    'member1.png',
	    'member2.png',
	    'member3.png',
	    'member4.png',
	    'member5.png',
	];

	const isSelectHeader = (headerNo) => {
    	setSelectedHeader(headerNo); 
    	handleCloseChangeHeader();
  	};


  	const label = { inputProps: { 'aria-label': 'Checkbox demo' }};

  	const [state, setState] = useState({
	  	'red': { color: '#be1521', selected: true, backcolor:'#feeae9' },
	  	'yellow': { color: '#fac000', selected: false, backcolor:'#fdfee9' },
	  	'green': { color: '#449631', selected: false ,backcolor:'#f2fee9'},
	  	'blue': { color: '#0061b0', selected: false ,backcolor:'#e9f8fe'},
	  	'purple': { color: '#9964a5', selected: false ,backcolor:'#EDE9FE'},
	  	'white': { color: '#ffffff', selected: false ,backcolor:'#f5f5f2'},
	});

	const [selectedItem, setSelectedItem] = useState(null);

	const today = dayjs();

	const [inputValue, setInputValue] = useState({
		'todolistTitle':"",
		'todolistContent':"",
		'todolistDate': today.format('YYYY-MM-DD'),
		'todolistDuedate':""
	});



	const ColorSelected = (colorType) =>{
		setState((prev)=>{
			const newState = {};
			for (const key in prev){
				newState[key]={
					...prev[key],
					selected:key===colorType,
				}
			}
			return(newState);
			
		});
	
	};

	

	//check有沒有輸入title
	const [titleError, setTitleError] = useState(false);

	const AddTodolist = () =>{

		//先檢查有沒有輸入好title
		if(inputValue.todolistTitle.trim().length === 0){
			setTitleError(true);
			return false;
		}

		//選顏色給新增的程式知道使用者選了什麼顏色
		const findSelectColor = Object.keys(state).find((key)=>state[key].selected);

		const newItem = {
			id:todolist.length + 1,
			//date:today,
			itemcolor:findSelectColor,
			...inputValue, //抓出使用者在待辦事項輸入的訊息
			colorNum:state[findSelectColor].backcolor
		};

		

		setTodolist((prev)=>[...prev,newItem]);

		console.log(newItem);

		//紀錄完這次新增的輸入後清空，不然下次新增會記錄到上次
		setInputValue({
			'todolistTitle':"",
			'todolistContent':"",
			'todolistDate': today.format('YYYY-MM-DD'),
			'todolistDuedate':""
		});
		setTitleError(false); 

		return true;

	}

	const [openModal, setOpenModal] = useState(false);
  	const handleModalOpen = () => setOpenModal(true);
  	const handleModalClose = () => setOpenModal(false);
	
	const modalStyle = (color) => {
		const style ={
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: 400,
			bgcolor: state[color].backcolor,
			boxShadow: 24,
		 	p: 4,
		 	borderRadius: '12px',
	 	}
	 	return style;
	}

	return(
		<>
		<div className="flex w-full h-full">
			{/*左半*/}
			<div className="w-1/3 bg-purple-100 border-r-2 flex flex-col justify-center items-center">
				<div className="relative">
					<img src={`../public/userHeader/member${selectedHeader}.png`} alt="user" />
					<div className="absolute right-0 bottom-0">
						<ChangeCircleIcon 
							sx={{
								fontSize:35,
								cursor:'pointer',
								'&:hover': {
							        color: '#89888a', 
							        transform: 'scale(1.2)', 
							        transition: 'transform 0.1s, color 0.1s',
							    }
						}}
							onClick={() => handleClickOpenChangeHeader('changeHeader')}
						/>
					</div>
				</div>
				<div className="flex w-full justify-center mt-6">
					<div className="text-nowrap font-bold">
						今日尚未完成：
					</div>
					<div className="bg-white border-2 border-white px-2">
						3
					</div>
				</div>
				<div className="flex w-full justify-center mt-3">
					<div className="text-nowrap font-bold">
						今日已經完成：
					</div>
					<div className="bg-white border-2 border-white px-2">
						3
					</div>
				</div>
				<div className="mt-12">
					<button className="bg-black text-white">
						讓XX幫你排！
					</button>
				</div>
			</div>

			{/*換頭貼視窗*/}
			{dialogType === "changeHeader" &&
				<Dialog
			        open={openChangeHeader}
			        onClose={handleCloseChangeHeader}
			        aria-labelledby="dialog-changeHeader-title"
			        aria-describedby="dialog-changeHeader-description"
			        sx={{
				       	'& .MuiDialog-paper': {
				          	width: '50%',
				          	maxWidth: '50%', 
			        	},
			    	}}
			    >
		        	<DialogTitle id="dialog-changeHeader-title">更換大頭貼</DialogTitle>
		        	<DialogContent>
				        <DialogContentText id="dialog-changeHeader-description" sx={{display:'flex',flexWrap: 'wrap',justifyContent:'center'}}>
		            		{headerImages.map((image, index) => (
		            			<Button key={`btn_${index}`} sx={{margin:1,'&:hover':{outline: '1px solid #89888a',}}} onClick={() => isSelectHeader(index+1)}>
						          	<img
						            	key={index+1}
						            	src={`/userHeader/${image}`}
						            	alt={`Image ${index}`}
						            	style={{ width: '130px', height: 'auto' }}
						          	/>
					          	</Button>
					        ))}
		          		</DialogContentText>
		        	</DialogContent>
			        <DialogActions>
			          <Button onClick={handleCloseChangeHeader}>取消</Button>
			        </DialogActions>
	        	</Dialog>
        	}
			{/*右半*/}
			<div className="w-2/3 overflow-y-auto">
				<div className="flex justify-center font-bold text-5xl mt-5 mb-3">
					待辦事項
				</div>
				
				<div className="flex flex-wrap items-start">
					{todolist&&todolist.map((item) => (
					<div className="flex flex-col w-1/4 my-4">
						<div className="border-l-8 border-black mx-6 my-1 pl-2 font-semibold text-nowrap">
							{item.todolistDate}
						</div>
						<Box 
							sx={{
								width:'80%',
								height:'100px',
								marginLeft:3,
								borderRadius: '12px',
								boxShadow: '2px 2px 8px rgba(173, 181, 189 ,1)',
								backgroundColor:item.colorNum,
								position: 'relative',
								cursor: 'pointer'
							}}
							onClick={() => {
						        setSelectedItem(item);
						        setOpenModal(true);
						    }}
						>
							<img className="absolute top-0 scale-x-[-1]" src={`./public/pin/${item.itemcolor}Pin.png`} alt="" />
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-nowrap font-bold">
								{item.todolistTitle}
							</div>
						</Box>
						
					</div>
				
					
				    ))}

				    <Modal
				        open={openModal}
				        onClose={()=>{
					        	handleModalClose();
					        	setSelectedItem(null);
					        }	        	
				        }
				        aria-labelledby="modal-modal-title"
				        aria-describedby="modal-modal-description"
				    >
				        <Box sx={selectedItem ?modalStyle(selectedItem.itemcolor): {}}>
				        	<Typography id="modal-modal-title" variant="h6" component="h2" sx={{fontWeight: 'bold'}}>
					           	{selectedItem ?selectedItem.todolistTitle: ''}
					       	</Typography>
					      	<Typography id="modal-modal-description" sx={{ mt: 2 }}>
					        	{selectedItem ?selectedItem.todolistContent: ''}
					        </Typography>
					    </Box>
					</Modal>
					
					<AddCircleIcon 
						sx={{
						    position: 'fixed',
						    bottom: 30,
						    right: 40,
						    fontSize: 50, // 可選，加大圖示
						    color: '#000', // 可選，設定顏色
						    cursor: 'pointer', // 可選，讓它看起來可以點
						    transition: 'color 0.1s,transform 0.1s',
						    '&:hover':{
						    	color: '#c9c9c9',
						    	transform: 'scale(1.1)',
						    }
						}}
						onClick={() => handleClickOpenChangeHeader('addTodolist')}
					/>

          
        		</div>

			</div>
			{/*新增一個代辦事項*/}
			{dialogType === "addTodolist" && 
				<Dialog
			        open={openChangeHeader}
			        onClose={handleCloseChangeHeader}
			        aria-labelledby="dialog-addTodolist-title"
			        aria-describedby="dialog-addTodolist-description"
			        sx={{
				       	'& .MuiDialog-paper': {
				          	width: '50%',
				          	maxWidth: '50%', 
				          	height: '85%'
			        	},
			    	}}
			    >
		        	<DialogTitle id="dialog-addTodolist-title" sx={{whiteSpace: 'nowrap'}}>新增待辦事項</DialogTitle>
		        	<DialogContent>
		        		<div className="flex items-center mb-6">
					        <DialogContentText 
					        	sx={{
					        		width: '25%',
					        		fontSize:'15px',
					        		borderLeft: '8px solid #000',
					        		pl: 1,
					        		whiteSpace: 'nowrap', 
					        	}}
					        >
					        	待辦事項標題(必填)
					        </DialogContentText>
					        <TextField
						        required
						        error={titleError}
						        helperText={titleError ? "請輸入待辦事項標題" : ""}
						        id="outlined-required"
						        sx={{
						        	ml:4,
						        	width: '60%',
								    '& .MuiInputBase-root': {
								      height: 40, // 整體輸入框高度（包含 padding）
								    },
								    '& .MuiInputBase-input': {
								      padding: '8px 14px', // 文字輸入區的內距
								    },
								}}
								placeholder="例如：預約會議室"
								onChange={(e)=>setInputValue((prev)=>({...prev,todolistTitle:e.target.value}))}
						    />
					    </div>
					    <div className="flex items-center mb-6">
					        <DialogContentText 
					        	sx={{
					        		width: '25%',
					        		fontSize:'15px',
					        		borderLeft: '8px solid #000',
					        		pl: 1,
					        		whiteSpace: 'nowrap'
					        	}}
					        >
					        	待辦事項樣式(必填)
					        </DialogContentText>
					        <Stack sx={{display:'flex',flexDirection:'row',width: '60%',ml:4,justifyContent:'space-between'}}>
					        	<Tooltip title="red"><Box onClick={()=>{ColorSelected('red')}} sx={{cursor: 'pointer',width:'25px',height:'25px',backgroundColor:state['red'].color,border:state['red'].selected?'4px solid #000':'1px solid #000'}} /></Tooltip>
					        	<Tooltip title="yellow"><Box onClick={()=>{ColorSelected('yellow')}} sx={{cursor: 'pointer',width:'25px',height:'25px',backgroundColor:state['yellow'].color,border:state['yellow'].selected?'4px solid #000':'1px solid #000'}} /></Tooltip>
					        	<Tooltip title="green"><Box onClick={()=>{ColorSelected('green')}} sx={{cursor: 'pointer',width:'25px',height:'25px',backgroundColor:state['green'].color,border:state['green'].selected?'4px solid #000':'1px solid #000'}} /></Tooltip>
					        	<Tooltip title="blue"><Box onClick={()=>{ColorSelected('blue')}} sx={{cursor: 'pointer',width:'25px',height:'25px',backgroundColor:state['blue'].color,border:state['blue'].selected?'4px solid #000':'1px solid #000'}} /></Tooltip>
					        	<Tooltip title="purple"><Box onClick={()=>{ColorSelected('purple')}} sx={{cursor: 'pointer',width:'25px',height:'25px',backgroundColor:state['purple'].color,border:state['purple'].selected?'4px solid #000':'1px solid #000'}} /></Tooltip>
					        	<Tooltip title="white"><Box onClick={()=>{ColorSelected('white')}} sx={{cursor: 'pointer',width:'25px',height:'25px',backgroundColor:state['white'].color,border:state['white'].selected?'4px solid #000':'1px solid #000'}} /></Tooltip>
					        </Stack>
					    </div>
					    <div className="flex items-center mb-6">
					        <DialogContentText 
					        	sx={{
					        		width: '25%',
					        		fontSize:'15px',
					        		borderLeft: '8px solid #000',
					        		pl: 1,
					        		whiteSpace: 'nowrap', 
					        	}}
					        >
					        	待辦事項內容
					        </DialogContentText>
						    <TextField
								multiline
								rows={3} // 顯示初始行數
								variant="outlined"
								placeholder="請輸入您的待辦事項詳細內容...  (例如：下週要與課長報告這個月進度，預約五樓會議室)"
								sx={{width:'60%',ml:4}}
								onChange={(e)=>setInputValue((prev)=>({...prev,todolistContent:e.target.value}))}							
							/>
					    </div>
					    <div className="flex items-center mb-6">
					        <DialogContentText 
					        	sx={{
					        		width: '25%',
					        		fontSize:'15px',
					        		borderLeft: '8px solid #000',
					        		pl: 1,
					        		whiteSpace: 'nowrap', 
					        	}}
					        >
					        	待辦事項日期
					        </DialogContentText>
					        <LocalizationProvider dateAdapter={AdapterDayjs}>
						    	<DesktopDatePicker 
						    		sx={{width:'60%',ml:4,'& .MuiInputBase-root': {height:'40px'}}}
						    		minDate={dayjs()}
						    		onChange={(e)=>setInputValue((prev)=>({...prev,todolistDate:e?e.format('YYYY-MM-DD') : today.format('YYYY-MM-DD') }))}
						    	/>
						    </LocalizationProvider>
					    </div>
					    <div className="flex items-center">
					        <DialogContentText 
					        	sx={{
					        		width: '25%',
					        		fontSize:'15px',
					        		borderLeft: '8px solid #000',
					        		pl: 1,
					        		whiteSpace: 'nowrap', 
					        	}}
					        >
					        	設定提醒日期
					        	<Checkbox 
					        		{...label} 
					        		sx={{ padding: 0 ,ml:1}}
					        		checked={showRemind}
  									onChange={(e) => setShowRemind(e.target.checked)}
					        	/>
					        </DialogContentText>
					        
					        
						        <LocalizationProvider dateAdapter={AdapterDayjs}>
							    	<DesktopDatePicker 
							    		disabled={!showRemind} 
							    		sx={{width:'60%',ml:4,'& .MuiInputBase-root': {height:'40px'}}}
							    		onChange={(e)=>setInputValue((prev)=>({...prev,todolistDuedate:e.target.value}))}
							    	/>
							    </LocalizationProvider>
						   	
					    </div>
					    
		        	</DialogContent>
			        <DialogActions>
			          	<Button onClick={handleCloseChangeHeader}>取消</Button>
			          	<Button 
			          		onClick={() => {
							    const result = AddTodolist();
							    if (result) {handleCloseChangeHeader();}
							}}
			          	>
			          		新增
			          	</Button>
			        </DialogActions>
	        	</Dialog>
        	}

		</div>
		</>
	);
}

