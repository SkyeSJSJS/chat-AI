
// 机器人初始不可用
let AIfreeTime=false;
//初始化之后可用

// 每次发消息之后不可用,直到数据响应回来

// 初始化
$(function () {
	AIfreeTime=true;
	window.histories=[];
	$('#footer').on('keyup', 'input', function () {
		if ($(this).val().length > 0) {
			$(this).next().css('background', '#ff6464');
		} else {
			$(this).next().css('background', '#ddd');
		}
	});
	$('#footer .send').click(send);
	$("#footer .my-input").keydown(function (e) {
		if (e.keyCode === 13&& AIfreeTime===true) {
			return send();
		}
	});

});
let arr = [ '你好,我可以为你答疑解惑,文案创作,文章创作...',
	`比如:<br>
① 帮我生成一份<font color="#cd5c5c">学习c语言</font>的计划表<br>
② 帮我<font color="#cd5c5c">用英语</font>写一篇<font color="#cd5c5c">关于全球气候</font>的500词作文,要求6级英语水平<br>
③ 我想向你寻求心理咨询<br>
④ ...`,

	'你可以直接说出你的问题 我将在思考<font color="red">5~20s</font>之后给你答复',

	];
test(arr);

// 自动发送
function test(arr) {
	$(arr).each(function (i) {
		setTimeout(function () {
			reply("images/touxiang.png", arr[i]);
		}, sj() * 100);
	});
}

// 回复
function AI(msg){
	reply("images/touxiang.png",msg);
}
function reply(headSrc, str) {
	var html = "<div class='reply'><div class='msg'><img src=" + headSrc + " /><span class='name'>小天才</span><p><i class='msg_input'></i>" + str + "</p></div></div>";
	return upView(html);
}

// 提问
function me(msg){
	asktoAI("./images/touxiangm.png", msg);
}
function asktoAI(headSrc, str) {
	var html = "<div class='ask'><div class='msg'><img src=" + headSrc + " />" + "<p><i class='msg_input'></i>" + str + "</p></div></div>";
	return upView(html);
}

// 动画
function upView(html) {
	let message = $('#message');
	message.append(html);
	return $('html,body').animate({scrollTop: message.outerHeight() - window.innerHeight}, 500);
}


function sj() {
	return parseInt(Math.random()*10);
}