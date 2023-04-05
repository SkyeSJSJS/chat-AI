/*
回复 reply   reply("images/touxiang.png", arr[i])

发送ask   ask("./images/touxiangm.png", input.val());



 */


// 发送

function send(msg) {


	let content;
	if (AIfreeTime) {
		// 判断上下文是否超过了6条
		if (window.histories.length>26){
			AI("跟我连续对话超过13句了,我需要清理一下之前的聊天记录.");
			window.histories=[];
			console.log('#',histories);
		}
		let input = $("#footer .my-input");
		if (isnull(input.val())) return;
		content = input.val().trim();
		me(content);
		window.histories.push({"role": "user", "content": content})

		console.log('#',JSON.stringify(histories));
		input.val('');
		AIfreeTime = false;
		// 	此处发起请求
		axios.get('http://123.60.17.120:10086/api/ask', {
			params: { //请求参数
				msg: histories
			}
		}).then(function (response) {
			// console.log(response);//请求正确时执行的代码
			window.histories.push({"role": response.data.message.resultname, "content": response.data.message.resultstring})
			AI(response.data.message.resultstring);
			AIfreeTime=true;
		}).catch(function (response) {
			// console.log(response);//发生错误时执行的代码
			AI("问我的人太多啦,脑子转不过来了,先缓缓~")
			AIfreeTime=true;
		});
	}
}


function isnull(str) {
		str=str.trim();
	if (str === '' || str === undefined || str == null) {//输入框中输入空格也为空
		// console.log('空');
		return true;
	} else if(str==="null" && str==="undefined") {

		// console.log('空');//输入框中输入null、undefined也为非空
		return true;

	}else{

		return false;
	}
}