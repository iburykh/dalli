//* Масска ввода номера телефона
//* tel - добавить класс к инпуту с маской телефона
let setCursorPosition = (pos, elem) => {
    elem.focus();
    // если у данного импута есть метод setSelectionRange(современные браузеры), то начальное и конечное значение выделения строки будут равны количеству символов (т.е 2 - это +7), соответственно курсор встанет после +7, для старых браузеров применяется метод createTextRange
    if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};
function createMask(event) {
    let matrix = '+7 (___) ___ __ __',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
    // нельзя удалить +7, т.е если длина вводимых значений будет меньше маски, то вернется маска
    if (def.length >= val.length) {
        val = def;
    }
    // при вводе в инпут значения в маске(матрице) заменяются (с помощью функции) согласно заданным условиям
    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
    // если тип события (event.type) - потеря фокуса(blur), и только 2 знака (+7), то ввод(маска) отменяется
    // в ином случае выполняется функция setCursorPosition
    if (event.type ==='blur') {
        if (this.value.length == 2 || this.value.length < matrix.length) {
            this.value = '';
        }
    } else if (event.type ==='keyup' || event.type ==='mouseup') {
        let cur = this.selectionStart;
        if (cur == '0' || cur == '1') {
            setCursorPosition(this.value.length, this);
        }
    } else {
        setCursorPosition(this.value.length, this);        
    }
}
let tel = document.querySelectorAll('.tel');
tel.forEach(input => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
    input.addEventListener('keyup', createMask);
    input.addEventListener('mouseup', createMask);
});