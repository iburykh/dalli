let menuBody = document.querySelector('.burger-menu');
let menuItem = menuBody.querySelectorAll('.menu__list > li');
let burger = document.querySelector('.burger');

burger.addEventListener('click', () => {    
    burger.classList.toggle('active');
    menuBody.classList.toggle('active');
    if (burger.classList.contains('active')) {
        burger.setAttribute('aria-label', 'закрыть навигацию');
        disableScroll();
    } else {
        burger.setAttribute('aria-label', 'открыть навигацию');
        enableScroll();
    }

    setTimeout(() => {
        menuBody.focus();
    }, 600);
});

menuItem.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (burger.classList.contains('active')) {
            burger.classList.remove('active');
            menuBody.classList.remove('active');
            burger.setAttribute('aria-label', 'открыть навигацию');
            enableScroll();
        }
    })
})