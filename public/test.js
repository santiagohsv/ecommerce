const socket = io.connect("http://localhost:8080", { forceNew: true });

// Listado de productos

function render(data) {
  const html = data
    .map((product) => {
      return `

    <div>
    ${product.name}
    $ ${product.price}
    <img src='${product.thumbnail}' width='40px'> 
    </div>
    `;
    })
    .join(" ");

  document.getElementById("products-test").innerHTML = html;
}

socket.on("test", (data) => {
  render(data);
});

