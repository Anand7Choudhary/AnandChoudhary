

let data, ip, carrierName, city, counter, time, clientIp;
let loader = sessionStorage.getItem("showLoader");
if (loader == null) {

    sessionStorage.setItem("reloadCount", 0);
    setTimeout(function () {
        sessionStorage.setItem("showLoader", 0);
        loader = sessionStorage.getItem("showLoader");
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("mainBody").style.display = "block";
        if (sessionStorage.getItem("reloadCount") == 0) {
            $.getJSON("https://api.ipify.org?format=json", function (clientData) {
                clientIp = clientData.ip;
            })
            document.getElementById("loading-screen").style.display = "none";
            document.getElementById("mainBody").style.display = "block";
            Swal.fire({
                icon: 'info',
                text: 'Hello There!',
                confirmButtonText: 'Okay',
                allowOutsideClick: false,
                html: 'Welcome to the site, hope you have a fun visit. Please do reach out to me if anything necessary. I would love to chat.' +
                    '<br><br>' + 'You can contact us via our inmail contact feature.',
                footer: '<span>By entering you confirm the <span style="color:#32BFFF;cursor:pointer;" onclick="showTC()";>terms and conditions</span></span>',
            }).then((result) => {
                if (result.isConfirmed) {
                    var request = new XMLHttpRequest();

                    request.open('GET', 'https://api.ipdata.co/?api-key=01774945792d4e7026458cb798169d7fa4973363440a99b86cf29406');

                    request.setRequestHeader('Accept', 'application/json');

                    request.onreadystatechange = function () {
                        if (sessionStorage.getItem("reloadCount") != 1) {
                            sessionStorage.setItem("reloadCount", 0);
                        }
                        if (this.readyState === 4) {
                            data = JSON.parse(this.responseText);
                            if (data["ip"] == null || data["ip"] == 0 || data["ip"] == "") {
                                city = "xyz";
                                carrierName = "xyz";
                                time = "0";
                                counter = "unknown";
                            } else {
                                ip = data["ip"];
                                city = data["city"];
                                // carrierName = data["carrier"]["name"];
                                // time = data["time_zone"]["current_time"];
                                carrierName = "xyz";
                                time = "000";
                                counter = data["count"];
                            }
                            if (ip == null || ip == 0) {
                                id = clientIp;
                                ip = id;
                            }
                            if (sessionStorage.getItem("reloadCount") == 0) {
                                $.ajax({
                                    url: 'https://api.emailjs.com/api/v1.0/email/send',
                                    type: 'POST',
                                    data: JSON.stringify({
                                        service_id: 'service_lne6ewa',
                                        template_id: 'template_3r6bobi',
                                        user_id: '1NnuuCpetYJt2e-1h',
                                        template_params: {
                                            ip: ip,
                                            city: city,
                                            time: time,
                                            carrierName: carrierName,
                                            counter: counter
                                        }
                                    }),
                                    contentType: 'application/json',
                                    success: function (data) {
                                        sessionStorage.setItem("reloadCount", 1);
                                        showKnockKnock(ip);
                                    },
                                    error: function (error) {
                                        $.ajax({
                                            url: 'https://api.emailjs.com/api/v1.0/email/send',
                                            type: 'POST',
                                            data: JSON.stringify({
                                                service_id: 'service_2occ9x6',
                                                template_id: 'template_x8zyc3r',
                                                user_id: '9_iBr633mbsnOdxy7',
                                                template_params: {
                                                    ip: ip,
                                                    city: city,
                                                    time: time,
                                                    carrierName: carrierName,
                                                    counter: counter
                                                }
                                            }),
                                            contentType: 'application/json',
                                            success: function (data) {
                                                sessionStorage.setItem("reloadCount", 1);
                                                showKnockKnock(ip);
                                            },
                                            error: function (error) {
                                                showKnockKnock(ip);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    };

                    request.send();
                }
            });
        }
    }, 5000);
}








if (sessionStorage.getItem("reloadCount") == 1 || sessionStorage.getItem("showLoader") == 0) {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("mainBody").style.display = "block";
    showKnockKnock(ip);
}

// nav scroll
$(document).ready(function () {
    $('.nav').find('a').on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var offset = $(hash).offset().top; // subtract 72 from the offset value
            $("html, body").animate({
                    scrollTop: offset, // use the updated offset value
                },
                800,
                function () {
                    window.location.hash = hash; // set the hash to the original value (without subtracting 72)
                }
            );
            // Remove the 'hovered' class from all the 'p' elements
            $('.nav p').removeClass('hovered');
            // Add the 'hovered' class to the clicked 'p' element
            $(this).parent('p').addClass('hovered');
        }
    });
    $('.footerNav').find('a').on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var offset = $(hash).offset().top; // subtract 72 from the offset value
            $("html, body").animate({
                    scrollTop: offset, // use the updated offset value
                },
                800,
                function () {
                    window.location.hash = hash; // set the hash to the original value (without subtracting 72)
                }
            );
            // Remove the 'hovered' class from all the 'p' elements
            $('.nav p').removeClass('hovered');
            // Add the 'hovered' class to the clicked 'p' element
            $(this).parent('p').addClass('hovered');
        }
    });
});


// get all the navigation links
const navLinks = document.querySelectorAll('.nav a');

// add a scroll event listener to the window object
window.onscroll = function () {
    // loop through each navigation link
    navLinks.forEach(link => {
        // get the section id from the link's href attribute
        const sectionId = link.getAttribute('href');
        // get the corresponding section element
        const section = document.querySelector(sectionId);
        // check if the section is visible in the viewport
        if (section.getBoundingClientRect().top <= 0 && section.getBoundingClientRect().bottom > 0) {
            // if the section is visible, add a "active" class to the link's parent element
            link.parentNode.classList.add('hovered');
        } else {
            // otherwise, remove the "active" class from the link's parent element
            link.parentNode.classList.remove('hovered');
        }
    });
};



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
const showLink = (flag, n) => {
    if (flag) {
        for (let i = 1; i <= 4; i++) {
            document.getElementById("socialCover" + i).classList.remove("coverHover");
            document.getElementById("socialLink" + i).style.display = "none";
            document.getElementById("socialImage" + i).style.transform = "scale(1)";
        }
        document.getElementById("socialCover" + n).classList.add("coverHover");
        document.getElementById("socialLink" + n).style.display = "block";
        document.getElementById("socialImage" + n).style.transform = "scale(1.15)";
    } else {
        for (let i = 1; i <= 4; i++) {
            document.getElementById("socialCover" + i).classList.remove("coverHover");
            document.getElementById("socialLink" + i).style.display = "none";
            document.getElementById("socialImage" + i).style.transform = "scale(1)";
        }
    }
}

const socialHref = (n) => {
    document.getElementById("socialButton" + n).click();
}



// send email
$(document).ready(function () {
    $('#contact-form').submit(function (event) {
        event.preventDefault();
        sendForm();
    });

    function sendForm() {
        const form = $('#contact-form')[0];
        const formData = new FormData(form);

        $.ajax({
            url: 'https://api.emailjs.com/api/v1.0/email/send',
            type: 'POST',
            data: JSON.stringify({
                service_id: 'service_lne6ewa',
                template_id: 'template_3r6bobi',
                user_id: '1NnuuCpetYJt2e-1h',
                template_params: {
                    from_name: formData.get('name'),
                    from_email: formData.get('email'),
                    message: formData.get('message'),
                    ip: ip,
                    city: city,
                    time: time,
                    carrierName: carrierName,
                    counter: counter
                }
            }),
            contentType: 'application/json',
            success: function (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Great!',
                    text: 'Message Sent Successfully',
                    timer: 1500
                })
                form.reset();
            },
            error: function (error) {
                $.ajax({
                    url: 'https://api.emailjs.com/api/v1.0/email/send',
                    type: 'POST',
                    data: JSON.stringify({
                        service_id: 'service_2occ9x6',
                        template_id: 'template_x8zyc3r',
                        user_id: '9_iBr633mbsnOdxy7',
                        template_params: {
                            from_name: formData.get('name'),
                            from_email: formData.get('email'),
                            message: formData.get('message'),
                            ip: ip,
                            city: city,
                            time: time,
                            carrierName: carrierName,
                            counter: counter
                        }
                    }),
                    contentType: 'application/json',
                    success: function (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Great!',
                            text: 'Message Sent Successfully',
                            timer: 1500
                        })
                        form.reset();
                    },
                    error: function (error) {
                        $.ajax({
                            url: 'https://api.emailjs.com/api/v1.0/email/send',
                            type: 'POST',
                            data: JSON.stringify({
                                service_id: 'service_2occ9x6',
                                template_id: 'template_x8zyc3r',
                                user_id: '9_iBr633mbsnOdxy7',
                                template_params: {
                                    from_name: formData.get('name'),
                                    from_email: formData.get('email'),
                                    message: formData.get('message'),
                                    ip: ip,
                                    city: city,
                                    time: time,
                                    carrierName: carrierName,
                                    counter: counter
                                }
                            }),
                            contentType: 'application/json',
                            success: function (data) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Great!',
                                    text: 'Message Sent Successfully',
                                    timer: 1500
                                })
                                form.reset();
                            },
                            error: function (error) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                    timer: 1500
                                })
                            }
                        });
                    }
                });
            }
        });
    }
});




// Hidden Contact
$(document).ready(function () {
    $('#ana-form').submit(function (event) {
        event.preventDefault();
        sendForm();
    });

    function sendForm() {
        const form = $('#ana-form')[0];
        const formData = new FormData(form);

        $.ajax({
            url: 'https://api.emailjs.com/api/v1.0/email/send',
            type: 'POST',
            data: JSON.stringify({
                service_id: 'service_lne6ewa',
                template_id: 'template_3r6bobi',
                user_id: '1NnuuCpetYJt2e-1h',
                template_params: {
                    message: formData.get('hiddenMessage'),
                    ip: ip,
                    city: city,
                    time: time,
                    carrierName: carrierName,
                    counter: counter
                }
            }),
            contentType: 'application/json',
            success: function (data) {
                Swal.fire({
                    icon: 'success',
                    title: 'Great!',
                    text: 'Message Sent Successfully',
                    timer: 1500
                })
                form.reset();
            },
            error: function (error) {
                $.ajax({
                    url: 'https://api.emailjs.com/api/v1.0/email/send',
                    type: 'POST',
                    data: JSON.stringify({
                        service_id: 'service_2occ9x6',
                        template_id: 'template_x8zyc3r',
                        user_id: '9_iBr633mbsnOdxy7',
                        template_params: {
                            message: formData.get('hiddenMessage'),
                            ip: ip,
                            city: city,
                            time: time,
                            carrierName: carrierName,
                            counter: counter
                        }
                    }),
                    contentType: 'application/json',
                    success: function (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Great!',
                            text: 'Message Sent Successfully',
                            timer: 1500
                        })
                        form.reset();
                    },
                    error: function (error) {}
                });
            }
        });
    }
});

// 


// special message
function showKnockKnock(data) {
    if (String(data) == "104.28.192.61" || String(data) == "104.28.224.64") {
    // Swal.fire({
    //     width: '90%',
    //     html: '<video class="songYt" preload="auto" controls autoplay><source src="image/vidForSpecific.webm" type="video/webm"></video>'+
    //         "<h3 class='alertTitle'>Hey</h3>" +
    //         "<p>Why are you here? You wanted this, you did this. You have an goal, strive hard and bas ho gaya.<br><br>"+
    //         "People generally surround themselves with the feeling and not with the person. You wanted little attention and I did provide you. It was us who "+
    //         "wanted this friendship to build, lekin I was probably wrong. As your attention span decreased, your intrusive thoughts kicked in and right their I was subjectified. " +
    //         "<br><br>You knew I was genuine and all I wanted was to build things up, their wasn't any 'we' yes? YES. I never left, I truly belive agar kuch hona hai toh hoga. "+
    //         "If this bond is meant to be formed, it will. Two things that sadden me was, the fact that I was foolish to think this was all mutual and wanted to build on this alone, and the little respect, for if anything I did. I was played around, my friends rightly called this. UGHHH!!!"+
    //         "<br><br>Clear toh tha ki dosti is all I wanted, lekin idk. You do love your friends right? isme tere kuch weird nahi laga? well just forget all this crap now. I want to see you grow. "+
    //         "You are one strong women (107 reasons why I liked you) and aim to reach the top(Let me know what's the view from there, hehe) and..and please talk to people, things clear out when you TALK! ek he toh life hai, we want to do everything, toh why? it's not we'll remember shit in next life toh clear things right there. "+
    //         "<br><br>Also, got to know that you are doing really well, chin up. and last mai 'if you ever think of doing something more than 10 times then do it'."+
    //         "<br><br>I never left, I'll wait."+
    //         "<br><br>Maybe for one last time? How about you click the button..<br>."+
    //         "</p>"+
    //         "<div id=flip><div>knock knock!!</div><div>who's there?</div><div>Owl</div><div>Owl who?</div><div>Owl miss you.</div></div>" +
    //         "<p id='beginKnock' onclick='newJokeLine()'>Click Here!!</p>" +
    //         "",
    //     footer: 'If not you,  please send an anonymous text at the footer to request a message change. Thank you!',
    //     confirmButtonText: 'Okay',
    //     allowOutsideClick: false,
    //     showCancelButton: false,
    //     showConfirmButton: false,
    //     showCloseButton: true
    // });
    Swal.fire({
        width: '90%',
        html:
            "<p>Hope you are doing well."+
            "First of all ask yourself why you are here? why are you reading this? you wanted this "+
            "crap. You have chosen your path right? follow it. Main enery eh? enjoy but don't subjectify people for attention." +
            "You knew who I was and how genuine I was to you, all I wanted was a simple friendship but you let your intrusive thoughts in." +
            "<br><br>Trust me I had beautiful lovely messages before this, to keep things right. Everytime, your Birthday, new year, day you left bangalore, every single moment."+
            " But there is a point that one should never touch. I won't take any disrespect towards my sister and friends whome I love. " +
            "<br><br>Remeber not all guy wants to enter your pants, being a women I understand the trust factor into play, but rista todne mai aur insaan todne mai difference hai. "+
            "<br><br>Either way. You are doing wonders, you are there for a reason, build your kingdom. You are hella strong and I am proud of you. As a old gone friend (if I were ever) a message, "+
            "'You cannot control what's happening to you. But you can control how to respond to it! that's where your power lies.'"+
            "I'm going to miss you and cheers, you will WIN and I will watch you win."+
            "</p>",
        footer: 'If not you,  please send an anonymous text at the footer to request a message change. Thank you!',
        confirmButtonText: 'Okay',
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: true
    });
    }
}

function newJokeLine() {
    document.getElementById("flip").style.display = "block";
    data = "104.28.192.61";
    $.ajax({
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        type: 'POST',
        data: JSON.stringify({
            service_id: 'service_lne6ewa',
            template_id: 'template_3r6bobi',
            user_id: '1NnuuCpetYJt2e-1h',
            template_params: {
                ip: data,
                message:"Button Clicked"
            }
        }),
        contentType: 'application/json',
        success: function (data) {},
        error: function (data) {}
    });
}

// show modal

const showModal = (n) => {
    if (n == 1) {
        Swal.fire({
            icon: 'info',
            iconColor: 'green',
            width: '80%',
            grow: 'column',
            title: 'Credit to the respective creators',
            html: 'Please refer to the respective owners, amazing talents!<br><br>' +
                '<div style="width:100%;display: grid;grid-template-columns: repeat(auto-fill,200px);grid-template-rows: auto;grid-column-gap: 20px;grid-row-gap: 50px;text-align:left">' +
                '<a target="_blank" href="https://iconscout.com/">iconscout.com</a>' +
                '<a target="_blank" href="https://iconscout.com/contributors/iqonic-design">iqonic.design</a>' +
                '<a target="_blank" href="https://iconscout.com/contributors/thehalaldesign">The Halal Design Studio</a>' +
                '<a target="_blank" href="https://iconscout.com/contributors/dwianggaicon">Dwiangga Design</a>' +
                '<a target="_blank" href="https://iconscout.com/contributors/uigo">👑 UIGO Design</a>' +
                '<a target="_blank" href="https://iconscout.com/contributors/candraraharjo">Sican</a>' +
                '<a target="_blank" href="https://iconscout.com/contributors/flixystd">Flixy Studio</a>' +
                '<a target="_blank" href="https://iconscout.com/contributors/rizkiahmadfauzi28">Rizki Ahmad Fauzi</a>' +
                '</div>',
            icon: 'success'
        })
    } else {
        Swal.fire({
            icon: 'info',
            iconColor: 'green',
            width: '80%',
            grow: 'column',
            title: 'Terms and Conditions',
            html: '<br><br>' +
                "Welcome to Anand Choudhary 's Portfolio website. Please read the following terms and conditions carefully before using our website. By accessing or using our website, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you must not use our website." +
                '<br><br>' +
                "1. Use of the Website: By using our website,you represent that you are at least 12 years old or have obtained parental or guardian consent to use our website.You may only use our websitefor lawful purposes and in compliance with all applicable laws and regulations." +
                '<br><br>' +
                "2. Intellectual Property: All content,trademarks,logos,and other intellectual property on our website are the property of Anand Choudhary or the respective owners and may not be used without our prior written consent." +
                '<br><br>' +
                "3. Privacy Policy: We take the privacy of our users seriously.We collect user data such as IP address,carrier and time on our website via form submission for development purposes.By using our website,you agree to our privacy policy." +
                '<br><br>' +
                "4. Links to Third - Party Websites: Our website may contain links to third - party websites that are not owned or controlled by Anand Choudhary.We have no control over and assume no responsibilityfor,the content,privacy policies,or practices of any third - party websites.You acknowledge and agree that Anand Choudhary is not responsiblefor the availability of any such external sites or resources." +
                '<br><br>' +
                "5. Limitation of Liability: In no event shall Anand Choudhary be liable for any indirect,incidental,special,consequential,or punitive damages,including without limitation,loss of profits,data,use,goodwill,or other intangible losses,arising out of or in connection with(i) your access to or use of or inability to access or use the website;(ii) any conduct or content of any third party on the website;(iii) any content obtained from the website;and(iv) unauthorized access,use,or alteration of your transmissions or content,whether based on warranty,contract,tort(including negligence),or any other legal theory,even if we have been informed of the possibility of such damage,and even if a remedy set forth herein is found to have failed of its essential purpose.Our total liability to you for all claims arising out of or in connection with your use of the website shall not exceed the amount paid by you, if any, to us for accessing the website." +
                '<br><br>' +
                "6. Governing Law: These terms and conditions shall be governed by and construed in accordance with the laws of [country / state],and you submit to the non - exclusive jurisdiction of the courts located in Bangalore for the resolution of any disputes." +
                '<br><br>' +
                "By using our website, you acknowledge that you have read and understood these terms and conditions and agree to be bound by them.If you do not agree with any part of these terms and conditions, please do not use our website.",
        })
    }
}

function showTC() {
    Swal.fire({
        icon: 'info',
        iconColor: 'green',
        width: '90%',
        grow: 'column',
        title: 'Terms and Conditions',
        showConfirmButton: true,
        confirmButtonText: 'Confirm',
        showDenyButton: true,
        denyButtonText: 'Do Not Accept',
        confirmButtonColor: '#99cf00',
        allowOutsideClick: false,
        html: '<br><br>' +
            "Welcome to Anand Choudhary 's Portfolio website. Please read the following terms and conditions carefully before using our website. By accessing or using our website, you agree to be bound by these terms and conditions. If you do not agree to these terms and conditions, you must not use our website." +
            '<br><br>' +
            "1. Use of the Website: By using our website,you represent that you are at least 12 years old or have obtained parental or guardian consent to use our website.You may only use our websitefor lawful purposes and in compliance with all applicable laws and regulations." +
            '<br><br>' +
            "2. Intellectual Property: All content,trademarks,logos,and other intellectual property on our website are the property of Anand Choudhary or the respective owners and may not be used without our prior written consent." +
            '<br><br>' +
            "3. Privacy Policy: We take the privacy of our users seriously.We collect user data such as IP address,carrier and time on our website via form submission for development purposes.By using our website,you agree to our privacy policy." +
            '<br><br>' +
            "4. Links to Third - Party Websites: Our website may contain links to third - party websites that are not owned or controlled by Anand Choudhary.We have no control over and assume no responsibilityfor,the content,privacy policies,or practices of any third - party websites.You acknowledge and agree that Anand Choudhary is not responsiblefor the availability of any such external sites or resources." +
            '<br><br>' +
            "5. Limitation of Liability: In no event shall Anand Choudhary be liable for any indirect,incidental,special,consequential,or punitive damages,including without limitation,loss of profits,data,use,goodwill,or other intangible losses,arising out of or in connection with(i) your access to or use of or inability to access or use the website;(ii) any conduct or content of any third party on the website;(iii) any content obtained from the website;and(iv) unauthorized access,use,or alteration of your transmissions or content,whether based on warranty,contract,tort(including negligence),or any other legal theory,even if we have been informed of the possibility of such damage,and even if a remedy set forth herein is found to have failed of its essential purpose.Our total liability to you for all claims arising out of or in connection with your use of the website shall not exceed the amount paid by you, if any, to us for accessing the website." +
            '<br><br>' +
            "6. Governing Law: These terms and conditions shall be governed by and construed in accordance with the laws of [country / state],and you submit to the non - exclusive jurisdiction of the courts located in Bangalore for the resolution of any disputes." +
            '<br><br>' +
            "By using our website, you acknowledge that you have read and understood these terms and conditions and agree to be bound by them.If you do not agree with any part of these terms and conditions, please do not use our website.",
    }).then((result) => {
        if (result.isConfirmed) {
            var request = new XMLHttpRequest();

            request.open('GET', 'https://api.ipdata.co/?api-key=01774945792d4e7026458cb798169d7fa4973363440a99b86cf29406');

            request.setRequestHeader('Accept', 'application/json');

            request.onreadystatechange = function () {
                if (sessionStorage.getItem("reloadCount") != 1) {
                    sessionStorage.setItem("reloadCount", 0);
                }
                if (this.readyState === 4) {
                    data = JSON.parse(this.responseText);
                    ip = data["ip"];
                    city = data["city"];
                    carrierName = data["carrier"]["name"];
                    time = data["time_zone"]["current_time"];
                    counter = data["count"];
                    if (sessionStorage.getItem("reloadCount") == 0) {
                        $.ajax({
                            url: 'https://api.emailjs.com/api/v1.0/email/send',
                            type: 'POST',
                            data: JSON.stringify({
                                service_id: 'service_2occ9x6',
                                template_id: 'template_x8zyc3r',
                                user_id: '9_iBr633mbsnOdxy7',
                                template_params: {
                                    ip: ip,
                                    city: city,
                                    time: time,
                                    carrierName: carrierName,
                                    counter: counter
                                }
                            }),
                            contentType: 'application/json',
                            success: function (data) {
                                sessionStorage.setItem("reloadCount", 1);
                            },
                            error: function (error) {}
                        });
                    }
                }
            };

            request.send();
        }
        if (result.isDenied) {
            window.history.back(-1);
        }
    });
}
