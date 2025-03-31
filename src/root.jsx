import React,{useState} from 'react';

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


export default function Nav(){

	const [openChangeHeader, setOpenChangeHeader] = useState(false);
	const [selectedHeader, setSelectedHeader] = useState(1);

	const handleClickOpenChangeHeader = () => {
	    setOpenChangeHeader(true);
	};
	const handleCloseChangeHeader = () => {
	    setOpenChangeHeader(false);
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
							onClick={handleClickOpenChangeHeader}
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
<div>wd</div>
			{/*換頭貼視窗*/}
			<Dialog
		        open={openChangeHeader}
		        onClose={handleCloseChangeHeader}
		        aria-labelledby="dialog-title"
		        aria-describedby="dialog-description"
		        sx={{
			       	'& .MuiDialog-paper': {
			          	width: '50%',
			          	maxWidth: '50%', 
		        	},
		    	}}
		    >
	        	<DialogTitle id="dialog-title">更換大頭貼</DialogTitle>
	        	<DialogContent>
			        <DialogContentText id="dialog-description" sx={{display:'flex',flexWrap: 'wrap',justifyContent:'center'}}>
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
			{/*右半*/}
			<div className="w-2/3 overflow-y-auto">
				<div className="space-y-2">
          {/* 超過內容 */}
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
          <p>這是一些示例文字。</p>
        </div>
			</div>

		</div>
		</>
	);
}

