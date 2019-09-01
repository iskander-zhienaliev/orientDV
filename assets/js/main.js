const options = {
    heightPercentFetchInit: 40,
    throttleTime: 200,
    cardAnimationInterval: 120
};

export default class Main {
    constructor(newsEl) {
        this.newsEl = newsEl;
        this.aside = document.querySelector('.js-aside');
        this.asideLeft = this.aside.getBoundingClientRect().left;
        this.header = document.querySelector('.header');
        this.nav = document.querySelector('.nav');
        this.body = document.body;
        this.moreBtn = newsEl.querySelector('.js-more');
        this.requestPattern = this.moreBtn.dataset.next;
        this.xhr = new XMLHttpRequest();
        this.isPullingData = false;
        this.hasNext = true;
        this.throttledScrollFn = this.handleScroll(options.throttleTime);
        this.page = 1;
        this.navBtn = document.querySelector('.js-search-btn');
        this.navForm = document.querySelector('.js-nav-form');
        this.navInput = this.navForm.querySelector('.js-nav-input');
    }

    addEventListeners = () => {
        this.moreBtn.addEventListener('click', this.onShowMore);
        this.navBtn.addEventListener('click', this.onFormOpen);
        this.navForm.addEventListener('submit', this.onSubmit);
        document.addEventListener('scroll', this.throttledScrollFn);
        this.xhr.onload = this.getRequest;
    };

    onShowMore = () => {
        this.fetchPage(this.page + 1);
    };

    onSubmit = (ev) => {
        ev.preventDefault();
        this.xhr.open('GET', `?search=${this.navInput.value}`)
        this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        this.xhr.send();
        this.onFormOpen();
    };

    fetchPage = (i) => {
        this.xhr.open('GET', `${this.requestPattern}`);
        this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        this.xhr.send();
        this.moreBtn.removeEventListener('click', this.onShowMore);
        this.moreBtn.style.display = 'none';
        this.isPullingData = true;
    };

    onFormOpen = () => {
        this.body.classList.toggle('is-form');
        if (this.body.classList.contains('is-form')) {
            setTimeout(() => {
                this.navInput.focus();
            }, 500);
        }
    };

    getRequest = () => {
        if (this.xhr.readyState === 4 && (this.xhr.status >= 200 && this.xhr.status <= 300)) {
            if (/page=([^&]*)/.test(this.xhr.responseURL)) {
                this.isPullingData = false;
                const wrap = document.createElement('html');
                wrap.innerHTML = this.xhr.response;
                const items = wrap.querySelectorAll('.js-news-item');
                this.requestPattern = items[0].dataset.hasnext;
                this.hasNext = !!items[0].dataset.hasnext;
                [...items].forEach(item => {
                    this.newsEl.appendChild(item)
                });
                this.page++;
            } else {
                const wrap = document.createElement('html');
                wrap.innerHTML = this.xhr.response;
                const items = wrap.querySelectorAll('.js-news-item');
                this.newsEl.innerHTML = '';
                [...items].forEach(item => {
                    this.newsEl.appendChild(item)
                });
            }
        }
    };

    fixSideBar = () => {
        const scrollPos = this.body.scrollTop || window.pageYOffset;
        if (scrollPos >= this.header.clientHeight + this.nav.clientHeight) {
            this.aside.style.position = 'fixed';
            this.aside.style.left = this.asideLeft + 'px';
            this.aside.style.top = '30rem';
        } else {
            this.aside.style.position = 'absolute';
            this.aside.style.left = 'unset';
            this.aside.style.right = '30rem';
            this.aside.style.top = '30rem';
            this.asideLeft = this.aside.getBoundingClientRect().left;
        }
    };

    handleScroll = interval => {
        let time = Date.now();
        this.fixSideBar();
        return () => {
            const isThrottleEnd = time + interval - Date.now() < 0;
            if (isThrottleEnd) {
                const scrollPos = this.body.scrollTop || window.pageYOffset;
                this.fixSideBar(scrollPos);
                const isScrolledForFetch = scrollPos + window.innerHeight >= this.body.scrollHeight - window.innerHeight * options.heightPercentFetchInit / 100;
                if (isScrolledForFetch && !this.isPullingData && this.hasNext && this.page !== 1) {
                    this.fetchPage(this.page + 1);
                    time = Date.now();
                }

            }
        };
    };

    init = () => {
        this.addEventListeners()
    }
}
