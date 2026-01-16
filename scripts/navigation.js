import courses from './course.js'

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const h2Color = document.querySelector('h2');
const aLinks = document.querySelectorAll('.weekLinks');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

console.log(aLinks);
// console.log(courses);
// aLinks.color = "red"

const modeButton = document.querySelector("#darkMode");
const body = document.querySelector("body");

// ----------------------------- DARK MODE -----------------------
// modeButton.addEventListener("click", () => {
// 	if (modeButton.textContent.includes("🕶️")) {
// 		body.style.background = "#000";
// 		body.style.color = "#fff";
// 		modeButton.textContent = "🔆";
// 		aLinks.forEach((link)=>{
// 			link.style.color = "#fff"
// 		})
// 		h2Color.style.color = "#fff"

// 	} else {
// 		body.style.background = "#eee";
// 		body.style.color = "#000";
// 		modeButton.textContent = "🕶️";
// 		aLinks.forEach((link)=>{
// 			link.style.color = "#000"
// 		})
// 		h2Color.style.color = "#000"
// 	}
// });



// --------------------- ARRAY AND FILTER-------------------------
const boxCredites = document.querySelector("#totalCredites");
const allBtn = document.querySelector("#all_btn");
const cseBtn = document.querySelector("#cse_btn");
const wddBtn = document.querySelector("#wdd_btn");
const certificate_box = document.querySelector("#certificate_6_box")
dataRender(courses)
allBtn.addEventListener("click",()=>{
	console.log(courses)
	dataRender(courses);
});

cseBtn.addEventListener("click", ()=>{
	const cseCourses = courses.filter(course=> course.subject ==='CSE');
	dataRender(cseCourses)
});

wddBtn.addEventListener("click", ()=>{
	const wddCourses = courses.filter(course=> course.subject ==='WDD');
	dataRender(wddCourses)
});

function dataRender(arrayData){
	certificate_box.innerHTML="";
	


	arrayData.forEach(element => {
		const itemLi = document.createElement("li")
		itemLi.textContent = `${element.subject} ${element.number}`
		itemLi.className = element.completed ? "active_course" : "inactive_course"
		certificate_box.appendChild(itemLi)
		console.log(element.credits)



		
	});
// --------------------- Credite Work -------------------------------
	const totalCreditesTwo = arrayData.reduce((newCredits, courseCredits)=>{
		return newCredits + courseCredits.credits
	}, 0)
	boxCredites.textContent = `The total number of course listed below is: ${totalCreditesTwo}`
};
