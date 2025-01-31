import { pagination } from "./pagination";

export function filter() {
    let filterform = document.getElementById('filterform');
    if(filterform){
        filterform.addEventListener('submit', function(event){
            event.preventDefault();
            const category = document.getElementById('Category').value;
            const price = document.getElementById('Price').value;
            const resultsContainer = document.getElementById('results'); 
            resultsContainer.innerHTML = ''; // Clear previous results
            
            let found = false; // Track if any products match the filter

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('product_')) {
                    const data = JSON.parse(localStorage.getItem(key));
                    const matchesCategory = category === 'All' || data.category === category;
                    const matchesPrice = price === 'All' || (
                        (price === '0-500' && data.price <= 500) ||
                        (price === '500-1000' && data.price > 500 && data.price <= 1000) ||
                        (price === '1000-5000' && data.price > 1000 && data.price <= 5000) ||
                        (price === '5000 & above' && data.price > 5000)
                    );

                    if(matchesCategory && matchesPrice){
                        found = true; // Set found to true if a product matches
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
                            <div>
                                <button type="button" class="btn update">update</button>
                                <button type="button" class="btn delete">delete</button>
                            </div>
                        `;
                        if(data.outOfStock){
                            div.innerHTML += `<p style="color:red;text-align:center">Out of Stock</p>`;
                        }else{
                            div.innerHTML += `<p style="color:green;text-align:center">In Stock</p>`;
                        }
                        div.querySelector('.update').addEventListener('click', function() {
                            window.location.href = `./edit.html?id=${key}`;
                        });
                        div.querySelector('.delete').addEventListener('click', function() {
                            if(confirm('Are you sure you want to delete this product?')){
                                localStorage.removeItem(key);
                                div.remove();
                            }
                        });
                        div.querySelector('.product-data').addEventListener('click', function() {
                            window.location.href = `./product.html?id=${key}`;
                        });
                        resultsContainer.appendChild(div); // Append the created div to the results container
                    }
                }
            }

            if (!found) {
                resultsContainer.innerHTML = '<p>No products found matching the filter criteria.</p>';
            }

            document.getElementById('main').style.display = 'none'; // Hide the main container
        });
    }
    pagination();
}