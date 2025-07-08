// Product management functionality
let products = [
    { category: "패키지", brand: "Supreme", product: "슈프림 패스포트 루미네", price: "390,000" },
    { category: "베이스", brand: "DIESEL", product: "다른 프랜드 룩북", price: "188,000" },
    { category: "베이스", brand: "Nike", product: "레어로프 1", price: "137,000" },
    { category: "패키지", brand: "MuscleGoods", product: "북락인 기업", price: "25,000" }
];

// Filter products with improved UI feedback
function filterProducts(category) {
    const tbody = document.getElementById('productTableBody');
    tbody.innerHTML = '';
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(p => p.category === category);
    }
    
    filteredProducts.forEach(product => {
        const row = tbody.insertRow();
        row.insertCell(0).innerHTML = `<strong>${product.brand}</strong>`;
        row.insertCell(1).textContent = product.product;
        row.insertCell(2).innerHTML = `<strong>₩${product.price}</strong>`;
        
        // Add hover effect
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8fafc';
        });
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Update stats
    updateStats();
}

// Update statistics
function updateStats() {
    const statNumber = document.querySelector('.stat-number');
    if (statNumber) {
        statNumber.textContent = products.length;
    }
}

// Add new product (placeholder function)
function addProduct(productData) {
    products.push(productData);
    filterProducts('all');
    updateStats();
}

// Delete product (placeholder function)
function deleteProduct(index) {
    products.splice(index, 1);
    filterProducts('all');
    updateStats();
}

// Initialize products when page loads
document.addEventListener('DOMContentLoaded', function() {
    filterProducts('all');
});
