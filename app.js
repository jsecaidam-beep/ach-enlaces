const button=document.querySelector('#share');
const toast=document.querySelector('#toast');
let timer;
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),4500)}
button.addEventListener('click',async()=>{
 if(['localhost','127.0.0.1'].includes(location.hostname)||location.protocol==='file:'){notify('La opción de compartir estará disponible al publicar esta página.');return}
 const data={title:'Conecta con Acción contra el Hambre',url:location.href};
 try{if(navigator.share){await navigator.share(data)}else if(navigator.clipboard){await navigator.clipboard.writeText(data.url);notify('Enlace copiado')}else{notify('Puedes copiar el enlace desde la barra de direcciones.')}}catch(error){if(error.name!=='AbortError')notify('Puedes copiar el enlace desde la barra de direcciones.')}
});

// Prueba: destinatario único. No hay servicios de correo ni solicitudes externas.
const contactForm=document.querySelector('#contact-form');
contactForm.addEventListener('submit',(event)=>{
 event.preventDefault();
 if(!contactForm.reportValidity())return;
 const data=new FormData(contactForm);
 if(data.get('_honey'))return;
 const country=data.get('pais')==='Otro'?String(data.get('otro_pais')||'').trim():data.get('pais');
 const subject='Contacto ACH · '+country;
 const body='Nombre: '+data.get('name')+'\r\nCorreo de contacto: '+data.get('email')+'\r\nPaís: '+country+'\r\n\r\nMensaje:\r\n'+data.get('message');
 const url='mailto:jsecaida@ca.acfspain.org?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 const status=document.querySelector('#form-status');
 status.textContent='Gracias por ponerte en contacto. Envía el mensaje desde tu aplicación de correo para completar el contacto. Cuando lo recibamos, nuestro equipo te dará seguimiento pronto. Si la aplicación no se abre, puedes escribir a jsecaida@ca.acfspain.org o llamarnos.';
 window.location.href=url;
});

const countrySelect=contactForm.querySelector('[name="pais"]');
const otherCountryField=document.querySelector('#other-country-field');
const otherCountryInput=otherCountryField.querySelector('input');
function updateOtherCountry(){const show=countrySelect.value==='Otro';otherCountryField.hidden=!show;otherCountryInput.disabled=!show;otherCountryInput.required=show;if(!show)otherCountryInput.setCustomValidity('')}
countrySelect.addEventListener('change',()=>{updateOtherCountry();if(!otherCountryField.hidden)otherCountryInput.focus()});
otherCountryInput.addEventListener('input',()=>otherCountryInput.setCustomValidity(otherCountryInput.value.trim()?'':'Escribe el nombre de tu país.'));
updateOtherCountry();
