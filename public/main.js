
const socket = io.connect('', { forceNew: true });
const {schema, denormalize} = normalizr;

// LISTADO DE PRODUCTOS

function render(data) {
  const html = data
  .map((product) => {
    return `
    <div>
    ${product.title}
    ${product.price}
    <img src='${product.thumbnail}' width='40px'>
    </div>   
    `;
  })
  .join(" ");
  
  document.getElementById("products").innerHTML = html;
}

const form = document.getElementById("form");
const title = document.getElementById("product-title");
const price = document.getElementById("product-price");
const thumbnail = document.getElementById("product-thumbnail");

socket.on("msg", (data) => {
  render(data);
});

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const newProd = {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  };

  title.value = "";
  price.value = "";
  thumbnail.value = "";
  
  socket.emit("message", newProd); 
});



// CHAT 

function chatRender(data) {


  // DENORMALIZACION

  const author = new schema.Entity('authors',{}, {idAttribute:'mail'});
  const  msg = new schema.Entity(
    'messages',
    {
      author: author,
    },
    { idAttribute: '_id' }
  );
  
  const msgsSchema = new schema.Array(msg);

  const denormalizedData = denormalize(data.result, msgsSchema, data.entities);


  const html = denormalizedData
    .map((chat) => {
      return `
            <div>
                <strong>${chat.author.mail}</strong>
                <em>${chat.text}</em>         
            </div>   
            `;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = html;
}

function sendData(e) {

  const mail = document.getElementById("mail");
  const text = document.getElementById("msg");
  const nombre = document.getElementById('nombre')
  const apellido= document.getElementById('apellido')
  const edad= document.getElementById('edad')
  const alias= document.getElementById('alias')
  const avatar= document.getElementById('avatar')

  const chatMsg = {
    mail: mail.value,
    msg: apellido.value,
    
  }; 

  const msg = {
    author:{
      mail: mail.value, 
      nombre: nombre.value, 
      apellido: apellido.value, 
      edad: edad.value, 
      alias:alias.value,
      avatar: avatar.value
    },
    text: text.value
  }
  
  text.value = " ";
  socket.emit("new-message", msg);
}

socket.on("newchat", (data) => {
  chatRender(data);
});

// LOGOUT

const logout = document.getElementById('toLogoutBtn');

logout.addEventListener('click', (e)=>{
        e.preventDefault();
        location.href="/api/auth/logout"
    })


