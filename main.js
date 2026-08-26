// قائمة الاستشارات والخدمات الرقمية الوقائية لـ Dr. HALA ELGAMAL
const products = [
  {
    id: 1,
    name: "استشارة رقمية وتقييم أولي (Teledentistry)",
    price: 250,
    desc: "جلسة تقييم فيديو أونلاين لمراجعة الشكوى وتحديد الخطة الوقائية المناسبة لطفلكِ.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "تحليل وقراءة الأشعة وقائيًا (Digital X-Ray Review)",
    price: 350,
    desc: "فحص وتفسير صور الأشعة من المنزل وتحديد مدى احتياج الطفل للتدخل الطبي من عدمه.",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "خطة الوقاية والتغذية المتكاملة (Preventive Care Plan)",
    price: 500,
    desc: "متابعة شاملة تتضمن خطة حماية المينا وتوجيهات التغذية الوقائية للأسنان لمدة شهر.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80"
  }
];

let cart = [];

// عرض السنة في الفوتر
document.getElementById("year").textContent = new Date().getFullYear();

// عرض المنتجات ديناميكياً
const productGrid = document.getElementById("productGrid");

function displayProducts() {
  productGrid.innerHTML = "";
  products.forEach((product, index) => {
    productGrid.innerHTML += `
      <div class="card">
        <img src="${product.img}" alt="${product.name}">
        <div class="card-content">
          <h3>${product.name}</h3>
          <p>${product.desc}</p>
          <div class="price">${product.price} ج.م</div>
          <button class="btn" onclick="addToCart(${index})">
            <i class="fa-solid fa-plus-circle"></i> اختاري الباقة
          </button>
        </div>
      </div>
    `;
  });
}

// إضافة منتج للسلة
function addToCart(index) {
  cart.push(products[index]);
  renderCart();
}

// حذف منتج من السلة بناءً على الفهرس
function removeFromCart(cartIndex) {
  cart.splice(cartIndex, 1);
  renderCart();
}

// عرض محتويات السلة
function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const totalSpan = document.getElementById("total");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p class="empty-msg">لم يتم اختيار أي خدمة بعد. قومي باختيار الباقة المناسبة لطبيعة طفلكِ!</p>`;
    totalSpan.textContent = "0";
    return;
  }

  let html = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    html += `
      <div class="cart-item">
        <div class="cart-item-details">
          <button class="remove-btn" onclick="removeFromCart(${index})" title="حذف الخدمة">
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <span>${item.name}</span>
        </div>
        <strong>${item.price} ج.م</strong>
      </div>
    `;
  });

  cartItemsDiv.innerHTML = html;
  totalSpan.textContent = total;
}

// إرسال الطلب عبر الواتساب
function sendOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const childAge = document.getElementById("childAge").value.trim();
  const notes = document.getElementById("notes").value.trim() || "لا يوجد";

  if (!name || !phone || !childAge) {
    alert("من فضلكِ ادخلي اسم ولي الأمر، رقم الواتساب، واسم وعمر الطفل أولاً.");
    return;
  }

  if (cart.length === 0) {
    alert("يرجى اختيار باقة استشارة واحدة على الأقل قبل الإرسال.");
    return;
  }

  let orderText = `🦷 *حجز استشارة رقمية جديد - د. هالة الجمل*\n`;
  orderText += `✨ *"اطمئنان بلمسة.. لابتسامة تدوم"*\n\n`;
  orderText += `👤 *ولي الأمر:* ${name}\n`;
  orderText += `📞 *الهاتف:* ${phone}\n`;
  orderText += `👶 *الطفل والعمر:* ${childAge}\n`;
  orderText += `💬 *تفاصيل الحالة / الشكوى:* ${notes}\n\n`;
  orderText += `📋 *الباقات المختارة:*\n`;

  cart.forEach((item, index) => {
    orderText += `${index + 1}. ${item.name} - (${item.price} ج.م)\n`;
  });

  const total = document.getElementById("total").textContent;
  orderText += `\n💰 *الإجمالي:* ${total} ج.م`;

  const whatsappNumber = "201068959532"; // رقم الواتساب المحدث للعيادة
  const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(orderText)}`;

  window.open(whatsappURL, "_blank");
}

// تشغيل العرض عند التحميل
displayProducts();