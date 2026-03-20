// 🔮 塔羅牌資料庫 2.0：加入正逆位獨立標籤
const tarotDeck = [
  {name: "愚者 (The Fool)", image: "fool.png", upright: "#新開始 #冒險 #純真", reversed: "#魯莽 #過度冒險 #不負責任"},
  {name: "魔術師 (The Magician)", image: "magician.png", upright: "#創造力 #行動 #自信", reversed: "#缺乏動力 #騙局 #才華未展"},
  {name: "女祭司 (The High Priestess)", image: "high_priestess.png", upright: "#直覺 #神祕 #潛意識", reversed: "#隱瞞 #忽視直覺 #表面"},
  {name: "皇后 (The Empress)", image: "empress.png", upright: "#豐收 #孕育 #母性", reversed: "#依賴 #過度保護 #缺乏成長"},
  {name: "皇帝 (The Emperor)", image: "emperor.png", upright: "#權威 #秩序 #控制", reversed: "#固執 #暴君 #缺乏紀律"},
  {name: "教皇 (The Hierophant)", image: "hierophant.png", upright: "#傳統 #信仰 #教育", reversed: "#打破常規 #盲從 #挑戰權威"},
  {name: "戀人 (The Lovers)", image: "lovers.png", upright: "#選擇 #愛情 #結合", reversed: "#分離 #失和 #錯誤的選擇"},
  {name: "戰車 (The Chariot)", image: "chariot.png", upright: "#意志 #勝利 #行動", reversed: "#失控 #阻礙 #缺乏方向"},
  {name: "力量 (Strength)", image: "strength.png", upright: "#勇氣 #耐心 #柔克剛", reversed: "#軟弱 #自我懷疑 #失控"},
  {name: "隱者 (The Hermit)", image: "hermit.png", upright: "#內省 #孤獨 #指引", reversed: "#孤立 #逃避 #拒絕溝通"},
  {name: "命運之輪 (Wheel of Fortune)", image: "wheel.png", upright: "#轉變 #契機 #幸運", reversed: "#厄運 #阻礙 #無力感"},
  {name: "正義 (Justice)", image: "justice.png", upright: "#公平 #平衡 #因果", reversed: "#不公 #偏見 #逃避責任"},
  {name: "倒吊人 (The Hanged Man)", image: "hanged_man.png", upright: "#犧牲 #換位思考 #等待", reversed: "#無謂的犧牲 #拖延 #鑽牛角尖"},
  {name: "死神 (Death)", image: "death.png", upright: "#結束 #重生 #轉型", reversed: "#恐懼改變 #停滯 #拒絕放手"},
  {name: "節制 (Temperance)", image: "temperance.png", upright: "#調和 #中庸 #淨化", reversed: "#失衡 #極端 #缺乏耐心"},
  {name: "惡魔 (The Devil)", image: "devil.png", upright: "#誘惑 #束縛 #物質", reversed: "#解脫 #覺醒 #擺脫控制"},
  {name: "高塔 (The Tower)", image: "tower.png", upright: "#毀滅 #突變 #解放", reversed: "#逃避災難 #害怕改變 #重建困難"},
  {name: "星星 (The Star)", image: "star.png", upright: "#希望 #平靜 #靈感", reversed: "#絕望 #悲觀 #缺乏靈感"},
  {name: "月亮 (The Moon)", image: "moon.png", upright: "#不安 #迷惘 #潛意識", reversed: "#揭露真相 #解除誤會 #克服恐懼"},
  {name: "太陽 (The Sun)", image: "sun.png", upright: "#成功 #活力 #喜悅", reversed: "#暫時的挫折 #過度自信 #缺乏熱情"},
  {name: "審判 (Judgement)", image: "judgement.png", upright: "#覺醒 #反省 #重生", reversed: "#自我懷疑 #拒絕改變 #無法釋懷"},
  {name: "世界 (The World)", image: "world.png", upright: "#圓滿 #達成 #完整", reversed: "#未完成 #停滯 #缺乏成就感"}
];

//讓JS認識Html元素
const cardNameDisplay = document.getElementById("cardName")
const hashtagsDisplay = document.getElementById("hashtags")
const questionInput = document.getElementById("question")
const aiPromptDisplay = document.getElementById("AIPrompt")
const resetBtn=document.getElementById("resetBtn")
let hasDrawn=false;

//抓取畫面上的所有塔羅牌
const allCards = document.querySelectorAll(".tarot-card")

//幫每張牌都加上點擊功能
allCards.forEach(function(card){
	card.addEventListener("click", function(){
	
	if(hasDrawn===true){
		const wantToReset=confirm("你已經抽過牌囉！要重新洗牌再抽一次嗎？")
	
		if(wantToReset){
			resetBtn.click();
		}
		return;
	}
	
	//1.檢查使用者是否輸入問題，若沒有，則提醒她
	const userQuestion=questionInput.value;
	if(userQuestion===""){
	alert("請輸入你想問的問題喔！");
	return; //提早結束，不執行後面的抽排
	}
	
	// 避免重複點擊
    if(card.classList.contains('flipped')){
		return;
	}
	
	//上鎖
	hasDrawn=true;
	
	//加上.flipped觸發css動畫
	setTimeout(function(){
		card.classList.add('flipped');
	}, 50)
	
	//在動畫進行到一半才更新資料，增加真實感
	
	//2.產生隨機編碼並把牌取出
	const randomIndex = Math.floor(Math.random() * tarotDeck.length)
	const drawnCard = tarotDeck[randomIndex];
	
	//正逆位邏輯
	const isUpright = Math.random() < 0.5;
	const position = isUpright? "正位" : "逆位"
	
	//根據正逆位，抓取對應的hashtag
	const currentHashtags=isUpright? drawnCard.upright:drawnCard.reversed;
	
	//更新卡片正面圖片和內容
	const cardFront=card.querySelector(".card-front");
	
	//更新圖片
	let imageSrc = drawnCard.image;
	
	// 在卡面前端加入圖片標籤，並且把原本預留的文字替換掉
        cardFront.innerHTML = '<img src="' + imageSrc + '" alt="' + drawnCard.name + '">';
        
        if (!isUpright) {
            cardFront.classList.add('reversed'); // 如果是逆位，加上旋轉圖片的 class
        } else {
            cardFront.classList.remove('reversed'); // 如果是正位，確保圖片沒有被旋轉
        }
		
	//3.更新畫面上的牌名和標籤 (把正逆位也加進去顯示)
	cardNameDisplay.innerText = "你抽到了: " + drawnCard.name + " (" + position + ")";
	hashtagsDisplay.innerText = position+"代表: "+currentHashtags;
	
	//4.組合要給AI的指令
	const promptText = "我剛剛進行了塔羅牌占卜。我的問題是「" + userQuestion + "」。我抽到的牌是「" + drawnCard.name + "」的【" + position + "】。這張牌的" + position + "代表涵義有 " + currentHashtags + "。請根據這張牌的【" + position + "】含義，幫我詳細解答我的問題，並給我一些具體的建議！";	//把組合好的文字放進文字框裡
	aiPromptDisplay.value = promptText;
	});
});

const copyBtn=document.getElementById("copyBtn")
copyBtn.addEventListener("click", function(){
	const textToCopy=aiPromptDisplay.value
	if(!textToCopy){
		alert("請先輸入你的問題/選擇卡牌！");
		return;
	}
	
	//使用瀏覽器的剪貼簿API複製文字
	navigator.clipboard.writeText(textToCopy).then(function(){
		const origionalText=copyBtn.innerText;
		copyBtn.innerText="複製成功！";
		copyBtn.style.backgroundColor="#a8e6cf";//變成亮綠色
		
		//兩秒後變回原本的樣子
		setTimeout(function(){
			copyBtn.innerText = origionalText
			copyBtn.style.backgroundColor="#9a8c98";
		}, 2000)
	}).catch(function(err){//萬一瀏覽器不支援，跳出警告
		console.error("複製失敗", err);
		alert("哎呀，複製失敗了，請手動複製！")
	});
	
})

resetBtn.addEventListener("click", function(){
	hasDrawn=false;
	questionInput.value="";
	cardNameDisplay.innerText="牌名會顯示在這裡"
	hashtagsDisplay.innerText="#標籤一 #標籤二 #標籤三"
	aiPromptDisplay.value=""
	allCards.forEach(function(card){
		
		//移除翻轉動畫
		card.classList.remove("flipped");
		
		setTimeout(function(){
			const cardFront=card.querySelector(".card-front");
			cardFront.innerHTML="[placeholder for image and name]";
			cardFront.classList.remove("reversed")
		}, 2000);
	});
});
		