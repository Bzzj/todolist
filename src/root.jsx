import React from 'react';


export default function Nav(){
	return(
		<div className="flex w-full h-full">
			{/*左半*/}
			<div className="w-1/3 bg-purple-100 border-r-2 flex flex-col justify-center items-center">
				<div>
					<img src="../public/member1.png" alt="user" />
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
	);
}

