
const body = document.querySelector("body");
const scroll_left = document.createElement("div");
scroll_left.classList.add("scroll_left");
scroll_left.innerHTML = "<";

const scroll_right = document.createElement("div");
scroll_right.classList.add("scroll_right");
scroll_right.innerHTML = ">";

var countries_europe = [];
var countries_asia = [];
var countries_africa = [];
var countries_oceania = [];
var countries_americas = [];
var countries_all = [];
var countries_searched = [];
let counter = -1;
let chosen_countries;

const input = document.querySelector("input");
const filter = document.querySelector("#filter div");
const search_list = document.querySelector("#search_list");
const filter_array = document.querySelectorAll("#filter li");
const regions = document.querySelector("#filter ul");
const card_array = document.querySelectorAll(".card");
const info_array = document.querySelectorAll(".info");
const search = document.querySelector("#search");
const search_img = document.querySelector("#search img");
const flex_container = document.querySelector("#flex_container");
const back = document.querySelector("#back");
const dark_mode = document.querySelector("#day_night");
const scroll_left_mobile = document.querySelector("#scroll_left");
const scroll_right_mobile = document.querySelector("#scroll_right");

let flag_array = document.querySelectorAll(".flag");
let name_array = undefined;
let native_name_array = undefined;
let population_array = undefined;
let region_array = undefined;
let sub_region_array = undefined;
let capital_array =  undefined;
let top_level_domain_array = undefined;
let currencies_array = undefined;
let languages_array = undefined;
let border_countries_array = undefined;
let card_clone = undefined;
let theme = "dark";

let scroll_left_visible = false;
let scroll_right_visible = false;

fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data =>{
	 countries_all=data;
	 data.forEach(country=>{
		 if(country.region=="Europe"){
			 countries_europe.push(country);
		 }else if(country.region=="Americas"){
			 countries_americas.push(country);
		 }else if(country.region=="Oceania"){
			 countries_oceania.push(country);
		 }else if(country.region=="Africa"){
			 countries_africa.push(country);
		 }else if(country.region=="Asia"){
			 countries_asia.push(country);
		 }
	 });
	 
	 chosen_countries = countries_all;
	 populate_entire_dom(counter,countries_all);
	
});





function create_info_dom(){
	var html = '<div class="name"></div>';
	html += '<div class="info_container">';
	html += '<div class="info_container_1"><div class="native_name"><span>Native Name: </span><span></span></div>';
	html += '<div class="population"><span>Population: </span><span></span></div>';
	html += '<div class="region"><span>Region: </span><span></span></div>';		
	html += '<div class="sub_region"><span>Sub Region: </span><span></span></div>';		
	html += '<div class="capital"><span>Capital: </span><span></span></div></div>';
	html += '<div class="info_container_2"><div class="top_level_domain"><span>Top Level Domain: </span><span></span></div>';			
	html += '<div class="currencies"><span>Currencies: </span><span></span></div>';		
	html += '<div class="languages"><span>Languages: </span><span></span></div></div>';			
	html += '</div><div class="border_countries"><span>Border Countries: </span></div>';		
					
	return html;					
}

function define_variables(){
	flag_array = document.querySelectorAll(".flag")
	name_array = document.querySelectorAll(".name");
	native_name_array = document.querySelectorAll(".native_name span:nth-child(2)");
	population_array = document.querySelectorAll(".population span:nth-child(2)");
	region_array = document.querySelectorAll(".region span:nth-child(2)");
	sub_region_array = document.querySelectorAll(".sub_region span:nth-child(2)");
	capital_array = document.querySelectorAll(".capital span:nth-child(2)");
	top_level_domain_array = document.querySelectorAll(".top_level_domain span:nth-child(2)");
	currencies_array = document.querySelectorAll(".currencies span:nth-child(2)");
	languages_array = document.querySelectorAll(".languages span:nth-child(2)");
	border_countries_array = document.querySelectorAll(".border_countries");
}

function populate_info_dom(i,j,countries_all){
	currencies_array[i].innerHTML = "";
	languages_array[i].innerHTML = "";
	flag_array[i].style.backgroundImage = "url("+countries_all[j].flag+")";
	name_array[i].innerHTML = countries_all[j].name;
	native_name_array[i].innerHTML = countries_all[j].nativeName;
	population_array[i].innerHTML = countries_all[j].population.toLocaleString("en-GB");
	region_array[i].innerHTML = countries_all[j].region;
	sub_region_array[i].innerHTML = countries_all[j].subregion;
	top_level_domain_array[i].innerHTML = countries_all[j].topLevelDomain;
	capital_array[i].innerHTML = countries_all[j].capital;
	countries_all[j].currencies.forEach(currency=>{
		currencies_array[i].innerHTML += currency.name;
		if(currency!=countries_all[j].currencies[countries_all[j].currencies.length-1]){
			currencies_array[i].innerHTML += ", ";
		}
	});
	countries_all[j].languages.forEach(language=>{
		languages_array[i].innerHTML += language.name;
		if(language!=countries_all[j].languages[countries_all[j].languages.length-1]){
			languages_array[i].innerHTML += ", ";
		}
	});
	border_countries_array[i].innerHTML = "<span>Border Countries: </span>";
	countries_all[j].borders.forEach(border=>{
		let border_country = document.createElement("span");
		border_country.innerHTML = border;
		border_countries_array[i].appendChild(border_country);
		go_to_border_country(border_country,card_clone);
	});
	if(!countries_all[j].borders.length){
		border_countries_array[i].innerHTML += "<span>This country doesn't share land border with any other country</span>";
	}
}


function populate_entire_dom(j,countries){
	 for(let i=0; i<card_array.length; i++){
		 j++;
		 
		 info_array[i].innerHTML = create_info_dom();
		 define_variables();
		 
		 if(countries[j]){
			populate_info_dom(i,j,countries); 
		 }else{
			 flag_array[i].style.backgroundImage = "none";
		 }
		 
		 
		 
		 if(window.getComputedStyle(flag_array[i]).backgroundImage=="none"){
			 card_array[i].style.visibility = "hidden";
		 }else{
			 card_array[i].style.visibility = "visible";
		 }
		 
	 }
}

function scroll_right_function(){
	if(counter<chosen_countries.length-8){
		counter+=8;
		populate_entire_dom(counter,chosen_countries);
	}
}

function scroll_left_function(){
	if(counter>8){
		counter-=8;
		populate_entire_dom(counter,chosen_countries);
	}else if(counter>0 && counter<8){
		counter = -1;
		populate_entire_dom(counter, chosen_countries);
	}
}

function determine_chosen_countries(){
	switch(filter.childNodes[0].innerHTML){
		case "Filter by Region":
			chosen_countries = countries_all;
			break;
		case "All":
			chosen_countries = countries_all;
			break;
		case "Africa":
			chosen_countries = countries_africa;
			break;
		case "America":
			chosen_countries = countries_americas;
			break;
		case "Europe":
			chosen_countries = countries_europe;
			break;
		case "Asia":
			chosen_countries = countries_asia;
			break;
		case "Oceania":
			chosen_countries = countries_oceania;
			break;
	}
}





//EVENT LISTENERS -------------------------------

filter.onclick = ()=>{
	if(window.getComputedStyle(regions).visibility=="hidden"){	//možda u chromu drukcije
		regions.style.visibility = "visible"; 
	}else{
		regions.style.visibility = "hidden";
	}
}


filter_array.forEach(filter_region=>filter_region.onclick = ()=>{
	let filter_region_text = filter_region.innerHTML;
	if(filter.childNodes[0].innerHTML=="Filter by Region"){
		filter_region.innerHTML = "All";
	}else{
		filter_region.innerHTML = filter.childNodes[0].innerHTML;
	}
	filter.childNodes[0].innerHTML = filter_region_text;
	regions.style.visibility = "hidden";
	counter = 0;
	
	determine_chosen_countries();
	
	
	populate_entire_dom(counter, chosen_countries);
});




window.addEventListener("mousemove", (event)=>{
	if(event.clientX<70 && scroll_left_visible==false){
		body.appendChild(scroll_left);
		scroll_left_visible = true;
		scroll_left.onclick = scroll_left_function;
	}else if(event.clientX>170 && scroll_left_visible==true){
		body.removeChild(scroll_left);
		scroll_left_visible = false;
	}
	
	if(window.innerWidth-event.clientX<70 && scroll_right_visible==false){
		body.appendChild(scroll_right);
		scroll_right_visible = true;
		scroll_right.onclick = scroll_right_function;
	}else if(window.innerWidth-event.clientX>170 && scroll_right_visible==true){
		body.removeChild(scroll_right);
		scroll_right_visible = false;
	}
});

scroll_right_mobile.onclick = scroll_right_function;
scroll_left_mobile.onclick = scroll_left_function;


input.addEventListener("keydown", (event)=>{
	if(event.key=="Backspace"){
		determine_chosen_countries();
	}else{
		recommend(event, chosen_countries);
	}
	if(event.key=="Enter"){
		chosen_countries = countries_searched;
	}
});



function recommend(event, chosen_countries){
	countries_searched = [];
	let searched_item = input.value;
	if(event.key!="Enter"){searched_item+=event.key;}
	searched_item = searched_item.toLowerCase();
	let list_of_countries = [];
	let list_of_searched_contries = [];
	chosen_countries.forEach(country=>{list_of_countries.push(country.name.toLowerCase())});
	list_of_countries.forEach(country=>{
		if(country.includes(searched_item)){
			list_of_searched_contries.push(country);
		}
	});
	
	search_list.innerHTML = "";
	for(let i=0; i<7; i++){
		if(list_of_searched_contries[i]){
			let recommended_country = document.createElement("div");
			recommended_country.innerHTML = list_of_searched_contries[i];
			search_list.appendChild(recommended_country);
			recommended_country.onclick =()=>{
				find_country(recommended_country);
			} 
		}
		
	}
	
	list_of_searched_contries.forEach(searched_country=>{
		chosen_countries.forEach(chosen_country=>{
			if(chosen_country.name.toLowerCase()==searched_country){
				countries_searched.push(chosen_country);
			}
		});
	});
	
	if(event.key=="Enter"){
		chosen_countries = countries_searched;
		populate_entire_dom(-1,chosen_countries);
	}
}

function find_country(recommended_country){
	chosen_countries.forEach(country=>{
		if(country.name.toLowerCase() == recommended_country.innerHTML){
			chosen_countries = [country];
			populate_entire_dom(-1,chosen_countries);
			search_list.innerHTML = "";
		}
	});
}



body.onclick = (event)=>{
	if(event.target != input && event.target!=search){
		search_list.innerHTML = "";
	}
}


card_array.forEach(card=>{
	card.addEventListener("click", ()=>{
		scroll_left.style.display = "none";
		scroll_right.style.display = "none";
		scrolls.style.visibility = "hidden";
		let card_bounds = card.getBoundingClientRect();
		card_clone = card.cloneNode();
		card_clone.innerHTML = card.innerHTML;
		card_clone.style.height = card_bounds.height +"px";
		card_clone.style.width = card_bounds.width + "px";
		card_clone.classList.add("card_clone");
		card_clone.style.top = card_bounds.top + window.scrollY + "px";
		card_clone.style.left = card_bounds.left + window.scrollX + "px";
		document.body.appendChild(card_clone);
		flex_container.style.display = "none";
		document.querySelector("#filter").style.display = "none";
		search.style.display = "none";
		setTimeout(()=>{
			card_clone.classList.add("card_clone_big");
			card_clone.childNodes[3].childNodes[2].style.visibility = "hidden";
		},700);
		setTimeout(()=>{
			card_clone.classList.add("card_clone_big_visible_info");
			
			card_clone.childNodes[3].childNodes.forEach(child=>{
				child.style.visibility = "visible";
				child.style.display = "flex";
			});
			card_clone.childNodes[3].childNodes[1].childNodes[0].childNodes.forEach(child=>{
				child.style.display = "block";
			});
			card_clone.childNodes[3].childNodes[1].childNodes[1].childNodes.forEach(child=>{
				child.style.display = "block";
			});
			back.style.visibility = "visible";
			card_clone.childNodes[3].childNodes[2].childNodes.forEach(child=>{
				go_to_border_country(child,card_clone);
			});
		},2000);
	});
});

back.onclick = ()=>{
	scroll_left.style.display = "block";
	scroll_right.style.display = "block";
	scrolls.style.visibility = "visible";
	back.style.visibility = "hidden";
	body.removeChild(card_clone);
	card_clone = undefined;
	flex_container.style.display = "flex";
	document.querySelector("#filter").style.display = "block";
	search.style.display = "flex";
}

function go_to_border_country(child,card_clone){
	child.addEventListener("click", ()=>{
		for(let i=0; i<countries_all.length; i++){
			if(countries_all[i].alpha3Code==child.innerHTML){
				define_variables();
				populate_info_dom(8,i,countries_all);
			}
		}
	});	
}

dark_mode.onclick = ()=>{
	if(theme=="dark"){
		body.classList.add("light");
		theme = "light";
		dark_mode.childNodes[5].innerHTML = "Dark Mode";
		document.querySelector("#search img").setAttribute("src", "images/search_black.svg");
		document.querySelector("#back img").setAttribute("src", "images/arrow-back-outline_black.svg");
	}else{
		body.classList.remove("light");
		theme = "dark";
		dark_mode.childNodes[5].innerHTML = "Light Mode";
		document.querySelector("#search img").setAttribute("src", "images/search.svg");
		document.querySelector("#back img").setAttribute("src", "images/arrow-back-outline.svg");
	}
}
