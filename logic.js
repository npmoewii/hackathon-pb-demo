window.onload = function(){

	// test
	var siam = addNewStation("สยาม");
	var siam2 = addNewStation("สยาม2");
	var pop = addNewPopBus(1,1,0,0,true,600,1200,"หอใน");
    var pop1 = addNewPopBus(2,1,0,0,true,600,1200,"สยาม");
	siam.addPopBus(pop);
    siam.addPopBus(pop1);
	
	console.log(pop.cntNextStation("สยาม"));
	setTimeout(function(){
		pop.updateData(2,0,0,false,1100,"bbb");
		siam.updateHtmlElement();
	}
	,5000);

	var selector = new StationSelector(station);
	selector.init();
	selector.createHtmlElement(document.body);	

	

}

// FUNCTION

const stationName1 = 	["Salaprakeaw",
						 "Faculty of Political Science",
						 "Patumwan Demonstration School",
						 "Faculty of Veterinary Science",
						 "Chaloemphao Junction",
						 "Lido",
						 "MBK Center",
						 "Triamudom Suksa School",
						 "Faculty of Architecture",
						 "Faculty of Arts",
						 "Faculty of Engineering"];
const stationName2 = 	["Salaprakeaw",
						 "Mahitaladhibesra Building",
 						 "Mahamakut Building",
						 "Faculty of Science",
						 "Faculty of Education",
						 "Sport Complex",
						 "Charmchuri 9 Building",
						 "CU Dharma Centre",
						 "CU Dormitory",
						 "x chamchuri 10",
						 "x allied health science",
						 "x bts",
						 "Faculty of Sports Science",
						 "x allied health science",
						 "x chamchuri 10",
						 "CU Dormitory",
						 "CU Office",
						 "Faculty of Architecture",
						 "Faculty of Arts",
						 "Faculty of Engineering"];
const stationName3 = 	["Salaprakeaw",
						 "Mahitaladhibesra Building",
						 "Faculty of Political Science",
						 "Faculty of Medicine",
						 "Faculty of Political Science",
						 "Mahamakut Building",
 						 "Faculty of Science",
						 "Faculty of Architecture",
  						 "Faculty of Arts",
						 "Faculty of Engineering"];
const stationName4 = 	["Salaprakeaw",
						 "Mahitaladhibesra Building",
						 "Patumwan Demonstration School",
						 "Faculty of Veterinary Science",
						 "Chaloemphao Junction",
						 "Lido",
						 "MBK Center",
						 "Triamudom Suksa School",
						 "Faculty of Education",
						 "Sport Complex",
						 "Charmchuri 9 Building",
						 "U-Center",
						 "Faculty of Law",
						 "Faculty of Architecture",
						 "Faculty of Arts",
						 "Faculty of Engineering"];
const stationName5 = 	["Salaprakeaw",
						 "Faculty of Political Science",
						 "Mahamakut Building",
						 "Faculty of Science",
						 "x communication arts",
						 "x samyan market",
						 "x i'm park",
						 "CU Terrace",
						 "CU Office",
						 "Faculty of Architecture",
						 "Faculty of Arts",
						 "Faculty of Engineering"];

var curId = 0;
var station = [];
var popbus = [];


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

function hideAllStation(){
	for(let i=0;i<station.length;i++){
		let tmp = document.getElementById(station[i].name);
		tmp.style.display = "none";
	}
}

function addNewStation(name){
	let tmp = new Station(name);
	station.push(tmp);
	tmp.createHtmlElement(document.body);
	return tmp;
}

function addNewPopBus(BusId,line,lat,long,status,weight,maxWeight,station){
	let tmp = new PopBus(BusId,line,lat,long,status,weight,maxWeight,station);
	popbus.push(tmp);
	return tmp;
}

// CLASS


class PopBus {
	constructor(BusId,line,lat,long,status,weight,maxWeight,station) {
		this.BusId = BusId
		this.line = line
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
		if(this.line === 1) stationName = stationName1;
		if(this.line === 2) stationName = stationName2;
		if(this.line === 3) stationName = stationName3;
		if(this.line === 4) stationName = stationName4;
		if(this.line === 5) stationName = stationName5;
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
	updateData(line,lat,long,status,weight,station){
		this.line = line;
		this.lat = lat;
		this.long = long;
		this.status = status;
		this.weight = weight;
		this.station = station;
		this.personCnt = Math.floor(weight/60);
	}
}

class PopBusInStation {
	constructor(id,popbus){
		this.id = id;
		this.popbus = popbus;
		this.wasCreate = false;

	}
	
	updateProgressBar(){
		setProgress(this.id+"bar",this.popbus.personCnt/this.popbus.maxPersonCnt*100);
	}

	updateHtmlElement(){
		var div = document.getElementById(this.id);
		var title = document.getElementById(this.id+"title");
		var img = document.getElementById(this.id+"img");
		var info = document.getElementById(this.id+"info");
		title.innerHTML = "สาย "+this.popbus.line;
		img.src = "./resource/logo.png";
		info.innerHTML = this.popbus.personCnt+"/"+this.popbus.maxPersonCnt+" คน";
		this.updateProgressBar();
	}

	createHtm
	lElement(root){
		this.wasCreate = true;
		var div = document.createElement("div");
		div.className = "popBusBroder";
		div.id = this.id;
		var title = document.createElement("h4");
		title.className = "popBusTitle";
		title.innerHTML = "สาย "+this.popbus.line;
		title.id = this.id+"title";
		div.appendChild(title); 
		var img = document.createElement("img");
		img.src = "./resource/logo.png";
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
	}
}


class Station{

	constructor(name){
		this.name = name;
		this.popBusQueue = [];
	}

	addPopBus(popBus){
		var tmp = new PopBusInStation(curId++,popBus);
		this.popBusQueue.push(tmp);
		this.updateHtmlElement();
		tmp.updateProgressBar();
	}
	
	compare(popBusA,popBusb){
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

	updateHtmlElement(){
		var div = document.getElementById(this.name);
		for(let i=0;i<this.popBusQueue.length;i++){
			if(!this.popBusQueue[i].wasCreate){
				this.popBusQueue[i].createHtmlElement(div);
			}
			this.popBusQueue[i].updateHtmlElement();
		}
	}

	createHtmlElement(root){
		var div = document.createElement("div");
		div.className = "stationBroder";
		div.id = this.name;
		var title = document.createElement("h2");
		title.className = "stationTitle";
		title.innerHTML = "สถานี : "+this.name;
		div.appendChild(title);
		for(let i=0;i<this.popBusQueue.length;i++){
			this.popBusQueue[i].createHtmlElement(div);
		}
		root.appendChild(div);
		this.updateHtmlElement();
		//TODO GENERATE HTML ELEMENT AND ADDED IN PRARENT
	}
}

class StationSelector{
	constructor(stationlist){
		this.station = stationlist;
	}

	init(){
		for(let i=1;i<station.length;i++){
		let tmp = document.getElementById(station[i].name);
		tmp.style.display = "none";
		}
	}

	createHtmlElement(root){
		var div = document.createElement("div");
		div.className = "select-style";
		var sel = document.createElement("select");
		sel.className = "select";
		sel.id = "select";
		sel.addEventListener("change",function(){
			let e = document.getElementById("select");
			let selected = e.options[e.selectedIndex].value;
			hideAllStation();
			let tar = document.getElementById(selected);
			tar.style.display = "block";
		},false);

		var tmp = document.createElement("option");
		tmp.value = "";
		tmp.text = "Where are you now?";
		tmp.selected = true;
		tmp.disabled = true;
		tmp.hidden = true;
		sel.appendChild(tmp);

		for(let i=0;i<this.station.length;i++){
			tmp = document.createElement("option");
			tmp.value = this.station[i].name;
			tmp.text = this.station[i].name;
			sel.appendChild(tmp);
		}
		div.appendChild(sel);
		root.insertBefore(div,root.childNodes[2]);
	}
}