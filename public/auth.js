const toSingup = document.getElementById('toSignupBtn');
const toLogin = document.getElementById('toLoginBtn');

if(toSingup !== null){
    toSingup.addEventListener('click', (e)=>{
        e.preventDefault();
        location.href="/api/auth/signup"
    })
}

if(toLogin !== null){
    toLogin.addEventListener('click', (e)=>{
        e.preventDefault();
        location.href="/api/auth/login"
    })
}

