// Get all products from localStorage
function readProducts() {
    const mainDiv = document.getElementById('main');
    if(mainDiv){
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('product_')) {
                const data = JSON.parse(localStorage.getItem(key));
                const div = document.createElement('div');
                div.classList.add(`${data.productId}`);
                div.classList.add('card');
                div.innerHTML = `
                    <div class="product-data">
                        <img src="${data.productImage}" alt="${data.productName}">
                        <h3>${data.productName}</h3>
                        <p>Price: ${data.price}</p>
                        <p class="desc">${data.description}</p>
                    </div>
                    <div >
                        <button type="button" class="btn update">update</button>
                        <button type="button" class="btn delete">delete</button>
                    <div>
                `;
                if(data.outOfStock){
                    div.innerHTML += `<p style="color:red;text-align:center">Out of Stock</p>`;
                }else{
                    div.innerHTML += `<p style="color:green;text-align:center">In Stock</p>`;
                }
                div.querySelector('.update').addEventListener('click', function() {
                    // upateProduct(data.productId);
                    // window.href = "/edit.html";
                    window.location.href = `/edit.html?id=${key}`;
                });
                div.querySelector('.delete').addEventListener('click', function() {
                    localStorage.removeItem(key);
                    div.remove();
                    window.location.href = '/index.html';
                });
                div.querySelector('.product-data').addEventListener('click', function() {
                    window.location.href = `/product.html?id=${key}`;
                });
                mainDiv.appendChild(div);
                console.log(data);
            }
        }
    }
}

export { readProducts };
