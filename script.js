// دالة لإضافة منتج جديد إلى سلة التسوق
function addToCart(name, price) {
  // استرجاع السلة من التخزين المحلي أو إنشاء مصفوفة جديدة إذا لم تكن موجودة
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // إضافة عنصر جديد للسلة يحتوي على الاسم والسعر
  cart.push({ name, price });
  
  // تخزين السلة المحدثة في التخزين المحلي بعد تحويلها إلى نص JSON
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // تحديث عدد العناصر المعروضة في أيقونة السلة
  updateCartCount();
}

// دالة لتحديث رقم عداد عدد المنتجات في السلة المعروض في الصفحة
function updateCartCount() {
  // استرجاع السلة من التخزين المحلي أو إنشاء مصفوفة جديدة إذا لم تكن موجودة
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // تعديل محتوى عنصر الـ HTML الذي يحمل id "cart-count" لعرض عدد العناصر في السلة
  document.getElementById('cart-count').innerText = cart.length;
}

// استدعاء تحديث العداد عند تحميل الصفحة لضمان عرض العدد الصحيح حتى بدون إضافة جديدة
updateCartCount();

