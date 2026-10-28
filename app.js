const button=document.querySelector('#share');
const toast=document.querySelector('#toast');
let timer;
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),4500)}
button.addEventListener('click',async()=>{
 if(['localhost','127.0.0.1'].includes(location.hostname)||location.protocol==='file:'){notify('La opción de compartir estará disponible al publicar esta página.');return}
 const data={title:'Conecta con Acción contra el Hambre',url:location.href};
 try{if(navigator.share){await navigator.share(data)}else if(navigator.clipboard){await navigator.clipboard.writeText(data.url);notify('Enlace copiado')}else{notify('Puedes copiar el enlace desde la barra de direcciones.')}}catch(error){if(error.name!=='AbortError')notify('Puedes copiar el enlace desde la barra de direcciones.')}
});
