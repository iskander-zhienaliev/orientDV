const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const mobileMain = () => {
    if (isMobile) {
        const burger = document.querySelector('.js-burger');
        const sideBar = document.querySelector('.js-nav');
        burger.addEventListener('click', function() {
            this.classList.toggle('open');
            sideBar.classList.toggle('open');
        })
    }
};

mobileMain();
