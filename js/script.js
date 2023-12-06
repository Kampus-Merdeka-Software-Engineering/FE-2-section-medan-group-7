let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');


window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', () =>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay:{
        delay:2500,
        disableOnIneraction: false,
    },
    breakpoints: {
        640:{
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay:{
        delay:2500,
        disableOnIneraction: false,
    },
    breakpoints: {
        450:{
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        991:{
            slidesPerView: 4,
        },
        1200: {
        slidesPerView: 5,
    },
    },
});


var users = [
    {
        "email": "user1@gmail.com",
        "password": "password1"
    },
    {
        "email": "user2@gmail.com",
        "password": "password2"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://busy-blue-badger-cape.cyclic.app/destination').then(response => response.json()).then(response =>{
        let template = ''
        for (let i = 0; i < response.length; i++) {
            const element = response[i];
            template+=
            `<div class="box">
            <img decoding="async" src="assets/${element.img_src}" alt="">
            <div class="content">
                <h3><i class="fas fa-map-marker-alt"></i>${element.location}</h3>
                <p>${element.description}</p>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <div class="price"> Rp ${element.price}</div>
                <a href="#" class="btn">book now</a>
            </div>
        </div>`
        }
        document.querySelector('.box-container').innerHTML=template
    })
});

function booking() {
    fetch('https://busy-blue-badger-cape.cyclic.app/booking', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:document.querySelector('#name').value,
            mobile_number:document.querySelector('#mobile_number').value,
            where_to:document.querySelector('#where_to').value,
            how_many:document.querySelector('#how_many').value,
            arrivals:document.querySelector('#arrivals').value,
            leaving:document.querySelector('#leaving').value
        })
    }).then(response => response.json()).then(response => {
        alert(response.message)
        document.querySelector('#name').value = '',
        document.querySelector('#mobile_number').value = '',
        document.querySelector('#where_to').value = '',
        document.querySelector('#how_many').value = '',
        document.querySelector('#arrivals').value = '',
        document.querySelector('#leaving').value = ''
    })
}


