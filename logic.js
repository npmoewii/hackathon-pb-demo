window.onload = function(){
	var station = [];
	var popbus = [];
	

	// test
	var pop = new PopBus(1,1,0,0,true,600,1200,"หอใน");
	var pops = new PopBusInStation(1,pop);
	pops.createHtmlElement(document.body);
	console.log(pop.cntNextStation("สยาม"));
	setTimeout(function(){
		pop.updateData(2,0,0,false,1100,"bbb");
		pops.updateHtmlElement();}
	,5000);
}

// FUNCTION

const stationName1 = ["สยาม","ศาลาพระเกี้ยว","หอใน"];
const stationName2 = ["aaa","bbb"];
const stationName3 = ["ccc","ddd"];
const stationName4 = ["fff","ggg"];
const stationName5 = ["hhh","iii"];

function setProgress(id,value) {
	let pro = document.getElementById(id);
	let pos = Math.floor(pro.clientWidth);
	let val = Math.floor(value);
	let animate = setInterval(function(){
		if(pos > value) pos--;
		else if(pos < value) pos++;
		pro.style.width = pos + '%';
		if(pos === value || pos === 0) clearInterval(animate);
	},10)
}

// CLASS


class PopBus {
	constructor(BusId,lat,long,status,weight,maxWeight,station) {
		this.BusId = BusId
		this.lat = lat
		this.long = long
		this.status
		this.station = station
		this.personCnt = Math.floor(weight/60)
		this.maxPersonCnt = Math.floor(maxWeight/60)
	}
	findPos(name) {
		let stationName = this.getStationLine();
		for(let i=0;i<stationName.length;i++){
			if(stationName[i] === name) return i;	
		}
		return -1;
	}
	getStationLine(){
		let stationName;
		if(line === 1) stationName = stationName1;
		if(line === 2) stationName = stationName2;
		if(line === 3) stationName = stationName3;
		if(line === 4) stationName = stationName4;
		if(line === 5) stationName = stationName5;
		return stationName;
	}
	cntNextStation(name) {
		let cnt = 0;
		let start = this.findPos(this.station);
		let stationName = this.getStationLine();
		if(start === -1) return -1;
		while(cnt < stationName.length){
			if(stationName[(start+cnt)%stationName.length] === name) return cnt;
			cnt++;
		}
	}
	
}

function PopBusInStation(id,popbus){
	this.id = id;
	this.popbus = popbus;

	this.updateProgressBar = function(){
		setProgress(this.id+"bar",this.popbus.personCnt/this.popbus.maxPersonCnt*100);
	}

	this.updateHtmlElement = function(){
		var div = document.getElementById(this.id);
		var title = document.getElementById(this.id+"title");
		var img = document.getElementById(this.id+"img");
		var info = document.getElementById(this.id+"info");
		title.innerHTML = "สาย "+this.popbus.line;
		img.src = "./resource/demo-bus-pic.jpg";
		info.innerHTML = this.popbus.personCnt+"/"+this.popbus.maxPersonCnt+"คน";
		this.updateProgressBar();
	}

	this.createHtmlElement = function(root){
		var div = document.createElement("div");
		div.className = "popBusBroder";
		div.id = this.id;
		var title = document.createElement("h4");
		title.className = "popBusTitle";
		title.innerHTML = "สาย "+this.popbus.line;
		title.id = this.id+"title";
		div.appendChild(title); 
		var img = document.createElement("img");
		img.src = "./resource/demo-bus-pic.jpg";
		img.className = "popBusImage";
		img.id = this.id+"img";
		div.appendChild(img);
		var pro = document.createElement("div");
		pro.className = "progress";
		var bar = document.createElement("div");
		bar.className = "bar";
		bar.id  = this.id+"bar";	
		pro.appendChild(bar);
		div.appendChild(pro);
		var info = document.createElement("p");
		info.className = "popBusInfo";
		info.innerHTML = this.popbus.personCnt+"/"+this.popbus.maxPersonCnt+"คน";
		info.id = this.id+"info";
		div.appendChild(info);
		root.appendChild(div);
		this.updateProgressBar();
	}
}


function Station(name){
	this.name = name;
	this.popBusQueue = [];

	this.compare = function(popBusA,popBusb){
		let cntA = popBusA.cntNextStation(this.name);
		let cntB = popBusB.cntNextStation(this.name);
		if(cntA === -1 && cntB === -1) return 0;
		else if(cntA === -1) return 1;
		else if(cntB === -1) return -1;
		if(cntA > cntB) return 1;
		else if(cntA < cntB) return -1;
		else if(cntA === cntB){
			if(popBusA.personCnt > popBusB.personCnt) return 1;
			else if(popBusA.personCnt < popBusB.personCnt) return -1;	
			else if(popBusA.personCnt === popBusB.personCnt) return 0;
		}
	}

	this.createHtmlElement = function(root){
		var div = document.createElement("div");
		div.className = "popBusBroder";
		div.id = this.name;
		var title = document.createElement("h2");
		title.className = "stationTitle";
		title.innerHTML = "สถาณี "+this.name;
		div.appendChild(title);
		for(let i=0;i<popBusQueue.length;i++){

		}
		root.appendChild(div);
		//TODO GENERATE HTML ELEMENT AND ADDED IN PRARENT
	}
}

function StationSelector(){
	this.init = function(){
		//TODO INIT STATION SELECTION
	}
}
