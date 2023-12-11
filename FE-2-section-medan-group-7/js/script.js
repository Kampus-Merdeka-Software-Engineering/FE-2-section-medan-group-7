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
    document.querySelector('#login-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Menghentikan fungsi default tombol

        var username = document.querySelector('#username').value;
        var password = document.querySelector('#password').value;

        var isValid = false;

        for (var i = 0; i < users.length; i++) {
            if (users[i].email === username && users[i].password === password) {
                isValid = true;
                break;
            }
        }

        if (isValid) {
            // Login berhasil, redirect ke dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Tampilkan pesan error jika login gagal
            alert('Login gagal. Silakan coba lagi.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('https://busy-blue-badger-cape.cyclic.app/destination')
        .then(response => response.json())
        .then(response => {
            let template = '';
            let pilihan = '';

            for (let i = 0; i < response.length; i++) {
                const element = response[i];
                const priceidr = formatCurrency(element.price);

                let bintang = '';
                for (let j = 0; j < 5; j++) {
                    const starsclass = j < element.stars ? 'fas' : 'far';
                    bintang += `<i class="${starsclass} fa-star"></i>`;
                }

                template +=
                    `<div class="box">
                        <img decoding="async" src="assets/destinations/${element.img_src}" alt="">
                        <div class="content">
                            <h3><i class="fas fa-map-marker-alt"></i> ${element.location}</h3>
                            <p>${element.description}</p>
                            <div class="stars">
                                ${bintang}
                            </div>
                            <div class="price">Rp${priceidr}</div>
                            <a href="#book" class="btn">Book Now</a>
                        </div>
                    </div>`;
                pilihan += `<option value="${element.location}">${element.location} - Rp. ${priceidr}</option>`;
            }

            document.querySelector('.box-container').innerHTML = template;
            document.querySelector('#where_to').innerHTML = pilihan;
        });
});

function formatCurrency(value) {
    const formattedValue = parseFloat(value).toLocaleString('id-ID', { currency: 'IDR' });
    return formattedValue;
}

function booking() {
    const name = document.querySelector('#name').value;
    const mobileNumber = document.querySelector('#mobile_number').value;
    const whereTo = document.querySelector('#where_to').value;
    const howMany = document.querySelector('#how_many').value;
    const arrivals = document.querySelector('#arrivals').value;
    const leaving = document.querySelector('#leaving').value;

    // Cek jika ada nilai yang kosong
    if (!name || !mobileNumber || !whereTo || !howMany || !arrivals || !leaving) {
        alert('Harap isi semua kolom');
    } else {
        fetch('https://busy-blue-badger-cape.cyclic.app/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                mobile_number: mobileNumber,
                where_to: whereTo,
                how_many: howMany,
                arrivals,
                leaving
            })
        })
        .then(response => response.json())
        .then(response => {
            alert(response.message);
            document.querySelector('#name').value = '';
            document.querySelector('#mobile_number').value = '';
            document.querySelector('#where_to').value = '';
            document.querySelector('#how_many').value = '';
            document.querySelector('#arrivals').value = '';
            document.querySelector('#leaving').value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan mengirim data');
        });
    }
}
