let loader=sessionStorage.getItem("showLoader");
if(loader==null){
    sessionStorage.setItem("showLoader",0);
    loader = sessionStorage.getItem("showLoader");
    setTimeout(function () {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("mainBody").style.display = "block";
    }, 5000);
}else{
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("mainBody").style.display="block";
}

// nav scroll

// let preSvcrollpos = window.pageYOffset;

// window.addEventListener("scroll", function () {
//     let currentScrollPos = window.pageYOffset;
//     if (preSvcrollpos > currentScrollPos) {
//         console.log("show");
//         document.querySelector(".mainBody .nav").classList.add("visible");
//     } else {
//         console.log("hide");
//         document.querySelector(".mainBody .nav").classList.remove("visible");
//     }

//     preSvcrollpos = currentScrollPos;
// });



// animation
//
// 
// 
// 
// 
// 
// 
let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('skewUp');
            observer.unobserve(entry.target);
        } else {
            entry.target.classList.remove('skewUp');
        }
    });
}, {
    threshold: 0.2
});

let elements = document.querySelectorAll('.animate-on-scroll1');
let elementIndex = 0;

function observeNextElement() {
    if (elementIndex >= elements.length) return;
    let element = elements[elementIndex];
    elementIndex++;
    observer.observe(element);
    setTimeout(observeNextElement, 50); // throttle the function
}

observeNextElement();
// 
// 
// 
let observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('lineUp');
            observer2.unobserve(entry.target);
        } else {
            entry.target.classList.remove('lineUp');
        }
    });
}, {
    threshold: 0.2
});

let elements2 = document.querySelectorAll('.animate-on-scroll2');
let elementIndex2 = 0;

function observeNextElement1() {
    if (elementIndex2 >= elements2.length) return;
    let element = elements2[elementIndex2];
    elementIndex2++;
    observer2.observe(element);
    setTimeout(observeNextElement1, 50); // throttle the function
}

observeNextElement1();


// rubberBand
let nameLetter = document.querySelectorAll(".nameLetters");
nameLetter.forEach(letter => {
    letter.addEventListener('mouseover', function () {
        let animationName = window.getComputedStyle(letter).getPropertyValue("animation-name");
        if (animationName != "rubberBand") {
            letter.style.animationName = "rubberBand";
        }
    });
    letter.addEventListener('animationend', function () {
        letter.style.animationName = "none";
    });
});


// show links on social hover
const showLink=(flag,n)=>{
    if(flag){
        for (let i = 1; i <= 4; i++) {
            document.getElementById("socialCover" + i).classList.remove("coverHover");
            document.getElementById("socialLink" + i).style.display = "none";
            document.getElementById("socialImage"+i).style.transform="scale(1)";
        }
        document.getElementById("socialCover" + n).classList.add("coverHover");
        document.getElementById("socialLink" + n).style.display = "block";
        document.getElementById("socialImage" + n).style.transform = "scale(1.15)";
    }else {
        for (let i = 1; i <= 4; i++) {
            document.getElementById("socialCover" + i).classList.remove("coverHover");
            document.getElementById("socialLink" + i).style.display = "none";
            document.getElementById("socialImage" + i).style.transform = "scale(1)";
        }
    }
}

const socialHref=(n)=>{
    document.getElementById("socialButton"+n).click();
}