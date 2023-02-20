//login.js
const processLogin = () => {
    let frm = document.login;
    if (frm.uid.value ==='') alert('아디는?');
    else if (frm.passwd.value ==='') alert('비번은?');
    else {
        frm.method = 'post';
        frm.submit();
    }
};
let loginbtn = document.querySelector('#loginbtn');
loginbtn.addEventListener('click', processLogin);
