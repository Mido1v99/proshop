document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productIdInput = document.getElementById('product-id');
    const productNameInput = document.getElementById('product-name');
    const productPriceInput = document.getElementById('product-price');
    const productDescriptionInput = document.getElementById('product-description');
    const productImageInput = document.getElementById('product-image');
    const currentProductsContainer = document.getElementById('current-products');
    const alertMessageEl = document.getElementById('alert-message');

    let products = JSON.parse(localStorage.getItem('products')) || [];

    // دالة لعرض رسالة تنبيه
    function showAlert(message, type = 'success') {
        alertMessageEl.innerText = message;
        alertMessageEl.style.display = 'block';
        alertMessageEl.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
        alertMessageEl.style.color = type === 'success' ? '#155724' : '#721c24';
        alertMessageEl.style.borderColor = type === 'success' ? '#c3e6cb' : '#f5c6cb';
        setTimeout(() => {
            alertMessageEl.style.display = 'none';
        }, 3000); // إخفاء الرسالة بعد 3 ثوانٍ
    }

    // دالة لحفظ المنتجات في localStorage
    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
        renderProductList(); // إعادة عرض القائمة بعد الحفظ
    }

    // دالة لعرض قائمة المنتجات لإدارتها
    function renderProductList() {
        currentProductsContainer.innerHTML = '';
        if (products.length === 0) {
            currentProductsContainer.innerHTML = '<p>لا توجد منتجات مضافة بعد.</p>';
            return;
        }

        products.forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>السعر: ${product.price} جنيه</p>
                    <p>الوصف: ${product.description || 'لا يوجد وصف'}</p>
                    <p>صورة: <a href="${product.image}" target="_blank">${product.image ? 'عرض الصورة' : 'لا يوجد'}</a></p>
                </div>
                <div class="product-actions">
                    <button class="edit" onclick="editProduct('${product.id}')">تعديل</button>
                    <button onclick="deleteProduct('${product.id}')">حذف</button>
                </div>
            `;
            currentProductsContainer.appendChild(productItem);
        });
    }

    // دالة لإضافة/تعديل منتج
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = productNameInput.value.trim();
        const price = parseFloat(productPriceInput.value);
        const description = productDescriptionInput.value.trim();
        const image = productImageInput.value.trim();
        const id = productIdInput.value;

        if (!name || isNaN(price) || price <= 0 || !image) {
            showAlert('يرجى ملء جميع الحقول المطلوبة (الاسم، السعر، الصورة) وتأكد أن السعر رقم موجب.', 'error');
            return;
        }

        if (id) {
            // تعديل منتج موجود
            const productIndex = products.findIndex(p => p.id === id);
            if (productIndex > -1) {
                products[productIndex] = { ...products[productIndex], name, price, description, image };
                showAlert('تم تحديث المنتج بنجاح!', 'success');
            }
        } else {
            // إضافة منتج جديد
            const newProduct = {
                id: Date.now().toString(), // معرف فريد بسيط
                name,
                price,
                description,
                image
            };
            products.push(newProduct);
            showAlert('تم إضافة المنتج بنجاح!', 'success');
        }

        saveProducts();
        productForm.reset(); // تفريغ النموذج
        productIdInput.value = ''; // مسح معرف المنتج للتأكد من أنه للإضافة الجديدة
    });

    // دالة لملء النموذج ببيانات المنتج المراد تعديله
    window.editProduct = (productId) => {
        const product = products.find(p => p.id === productId);
        if (product) {
            productIdInput.value = product.id;
            productNameInput.value = product.name;
            productPriceInput.value = product.price;
            productDescriptionInput.value = product.description;
            productImageInput.value = product.image;
            window.scrollTo({ top: 0, behavior: 'smooth' }); // التمرير لأعلى للنموذج
        }
    };

    // دالة لحذف منتج
    window.deleteProduct = (productId) => {
        if (confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟')) {
            products = products.filter(p => p.id !== productId);
            saveProducts();
            showAlert('تم حذف المنتج بنجاح!', 'success');
        }
    };

    // عرض المنتجات عند تحميل الصفحة لأول مرة
    renderProductList();
});