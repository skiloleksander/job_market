<template>
    <footer class="footer">

        <ul class="soc-net">
            <li>Telegram</li>
            <li>Instagram</li>
            <li>Tik Tok</li>
            <li>Threads</li>
        </ul>

        <ul class="pages">
            <RouterLink to="/jobs">Для шукачів роботи</RouterLink>
            <RouterLink to="/empl">Для роботодавців </RouterLink>
            <RouterLink to="/privacy-policy">Політика конфіденційності</RouterLink>
            <RouterLink to="/">Головна</RouterLink>
            <RouterLink to="#">Зв'язатись з нами</RouterLink>
        </ul>
        <p>© 2026 Job Market. All rights reserved.</p>
    </footer>
</template>

<style>
   .footer{
background-color:var(--second-color);
color:var(--main-color);
border-top:1px solid var(--third-color);
width:100%;
padding:var(--padding-extra) 0;
margin-top:var(--margin-extra);
display:flex;
flex-wrap:wrap;
justify-content:space-evenly;
align-items:flex-start;
}
.soc-net{
list-style:none;
padding:0;
margin:0;
display:flex;
flex-direction:column;
gap:10px;
font-weight:bold;
font-size:1.1rem;
}
.soc-net li{
color:var(--main-color);
transition:var(--trans-main);
cursor:pointer;
}
.soc-net li:hover{
color:var(--hover-color);
transform:translateX(5px);
}
.pages{
list-style:none;
padding:0;
margin:0;
display:grid;
grid-template-columns:1fr 1fr;
column-gap:40px;
row-gap:15px;
}
.pages a{
color:var(--main-color);
text-decoration:none;
transition:var(--trans-main);

&:hover {
    transform: scale(1.05);
}
}
.pages a:hover{
color:var(--hover-color);
text-shadow:0 0 5px rgba(255, 215, 0, 0.5);
}
.footer p{
width:100%;
text-align:center;
margin-top:30px;
padding-top:20px;
border-top:1px solid rgba(255, 255, 255, 0.1);
color:var(--third-color);
font-size:0.85rem;
}
</style>