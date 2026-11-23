export default function accordeon() {
    const btns = document.querySelectorAll('.accordion__element');
    
    btns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            
            if (btn.firstElementChild.classList.contains('accordion__btn--active')) {
                btn.firstElementChild.classList.remove('accordion__btn--active');
                return;
            }
            
            btns.forEach(otherBtn => {
                otherBtn.firstElementChild.classList.remove('accordion__btn--active');
            });
            
            btn.firstElementChild.classList.add('accordion__btn--active');
        });
    });
}