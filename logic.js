window.onload = function(){
	console.log("hello js");
	setProgress(1,50);
}

const station = ["สยาม","ศาลาพระเกี้ยว","หอใน"];

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

function popBus(id,lat,long,weight,maxWeight){
	var id = id;
	var lat = lat;
	var long = long;
	var personCnt = Math.floor(weight/60);
	var maxPersonCnt = Math.floor(maxWeight/60);

}

function compare(a,b){
	if(a)
}