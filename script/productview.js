function productdisplay(productId) {
    console.log(productId);
    const data = JSON.parse(localStorage.getItem(productId));
    if (data) {
        const mainDiv = document.getElementById('product');
        if (data) {
            const div = document.createElement('div');
            div.classList.add(`${data.productId}`);
            div.classList.add('product');
            div.innerHTML = `
            <div class="product-image">
                <img src="${data.productImage}" alt="${data.productName}">
            </div>
            <div class="product-details">
                <h3>${data.productName}</h3>
                <p>Price: ${data.price}</p>
                <p>Description: ${data.description}</p>
                <p>Category: ${data.category}</p>
                <p>Manufacturing Date: ${data.mfDate}</p>
                <p>Selling type: ${data.pricing}</p>
                <p id="ous" style="display:none;color:red">Out of Stock</p>
                <p id="is" style="display:none;color:green">In Stock</p>
                <button type="button" class="btn update">update</button>
                <button type="button" class="btn delete">delete</button>
            </div>
            `;
            div.querySelector('.update').addEventListener('click', function() {
                window.location.href = `/edit.html?id=${productId}`;
            });
            div.querySelector('.delete').addEventListener('click', function() {
                confirm('Are you sure you want to delete this product?');
                localStorage.removeItem(productId);
                div.remove();
                window.location.href = '/index.html';
            });
            mainDiv.appendChild(div);
            console.log(data);
            if(data.outOfStock){
                document.getElementById('ous').style.display = 'block';
            }else{
                document.getElementById('is').style.display = 'block';
            }
        }
        else{
            console.error(`No product found with ID: ${productId}`);
        }
    }
}
export { productdisplay };