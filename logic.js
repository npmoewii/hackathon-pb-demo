window.onload = function(){
	var station = [];
	var popbus = [];
	

	// test
	var pop = new PopBus(1,0,0,true,10,20,"หอใน");
	console.log(pop.cntNextStation("สยาม"));
	setProgress(1,100);
}

// FUNCTION

const stationName = ["สยาม","ศาลาพระเกี้ยว","หอใน"];

function setProgress(id,value) {
	let pro = document.getElementById(id);
	let pos = pro.style.width;
	let val = Math.floor(value)%100; 
	let animate = setInterval(function(){
		if(pos > value) pos--;
		else if(pos < value) pos++;
		pro.style.width = pos + '%';
		if(pos === value || pos === 0) clearInterval(animate);
	},10)
}

// CLASS

function PopBus(id,lat,long,status,weight,maxWeight,station){
	this.id = id;
	this.lat = lat;
	this.long = long;
	this.status;
	this.station = station;
	this.personCnt = Math.floor(weight/60);
	this.maxPersonCnt = Math.floor(maxWeight/60);

	this.findPos = function(name){
		for(let i=0;i<stationName.length;i++){
			if(stationName[i] === name) return i;	
		} 
	}

	this.cntNextStation = function(name){
		let cnt = 0;
		let start = this.findPos(this.station);
		while(cnt < stationName.length){
			if(stationName[(start+cnt)%stationName.length] === name) return cnt;
			cnt++;
		}
	}

	this.createHtmlElement = function(){
		//TODO GENERATE HTML ELEMENT AND ADDED IN PRARENT
	}
}

function Station(name){
	this.name = name;	
	
	this.compare = function(popBusA,popBusb){
		let cntA = popBusA.cntNextStation(this.name);
		let cntB = popBusB.cntNextStation(this.name);
		if(cntA > cntB) return 1;
		else if(cntA < cntB) return -1;
		else if(cntA === cntB){
			if(popBusA.personCnt > popBusB.personCnt) return 1;
			else if(popBusA.personCnt < popBusB.personCnt) return -1;	
			else if(popBusA.personCnt === popBusB.personCnt) return 0;
		}
	}

	this.createHtmlElement = function(){
		//TODO GENERATE HTML ELEMENT AND ADDED IN PRARENT
	}
}

function StationSelector(){
	this.init = fucntion(){
		//TODO INIT STATION SELECTOR
	}
}
