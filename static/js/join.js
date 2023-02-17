//join.js
const processjoin = () => {
    let frm = document.join;
    if (frm.userid.value ==='') alert('아아디는?');
    else if (frm.passwd.value ==='') alert('비밀번호는?');
    else if (frm.repasswd.value ==='') alert('비밀번호 확인는?');
    else if (frm.name.value ==='') alert('이름은?');
    else if (frm.email.value ==='') alert('이메일은?');
    else {
        frm.method = 'post';
        frm.enctype = 'application/x-www-form-urlencoded'; //인코팅타입enctyp
        frm.submit();
    }
};
let joinbtn = document.querySelector('#joinbtn');
joinbtn.addEventListener('click', processjoin);
