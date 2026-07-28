/* =====================================================================
   ديمو استاتيك — بيانات وهمية (Mock Data) + سلوكيات مشتركة
   ملاحظة: لا يوجد باك إند حقيقي، كل البيانات هنا تجريبية للعرض فقط
   ===================================================================== */

// ---------- بيانات المنتجات الوهمية ----------
const PRODUCTS = [
  { id:1, name:'اسكراب كحلي كلاسيك', cat:'اسكرابات طبية', price:650, oldPrice:850, img:'https://images.unsplash.com/photo-1761234852472-85aeea9c3eac?w=600&q=80', colors:['#1B2A4A','#1FB8AF'], badge:'الأكثر مبيعًا' },
  { id:2, name:'اسكراب تركواز نسائي', cat:'اسكرابات طبية', price:690, img:'https://images.unsplash.com/photo-1769072610024-5b8a50f05c73?w=600&q=80', colors:['#1FB8AF','#F5F1E8'], badge:'جديد' },
  { id:3, name:'بالطو طبي أبيض كلاسيك', cat:'بالطوهات طبية', price:780, img:'https://images.unsplash.com/photo-1666887360445-e3b7bba7917c?w=600&q=80', colors:['#FFFFFF','#16140F'], badge:'جديد' },
  { id:4, name:'بالطو طبي أزرار مزدوجة', cat:'بالطوهات طبية', price:850, oldPrice:1050, img:'https://images.unsplash.com/photo-1666887360541-e9a3cec344be?w=600&q=80', colors:['#FFFFFF'] },
  { id:5, name:'جاكيت طبي شتوي مبطن', cat:'جواكت طبية', price:990, img:'https://images.unsplash.com/photo-1776104501657-a4d9fb6ce7f4?w=600&q=80', colors:['#1B2A4A','#8A8A8A'], badge:'جديد' },
  { id:6, name:'جاكيت طبي خفيف مقاوم للبقع', cat:'جواكت طبية', price:850, img:'https://images.unsplash.com/photo-1621862926530-37a46ba900bb?w=600&q=80', colors:['#1FB8AF','#1B2A4A'] },
  { id:7, name:'هيدة طبية قطن مريحة', cat:'هيدات طبية', price:320, img:'https://images.unsplash.com/photo-1765222385397-6c2ea556086f?w=600&q=80', colors:['#FFFFFF','#8A8A8A'] },
  { id:8, name:'هيدة طبية سريعة الجفاف', cat:'هيدات طبية', price:350, oldPrice:420, img:'https://images.unsplash.com/photo-1621862912856-0909fb7f14b7?w=600&q=80', colors:['#1FB8AF','#1B2A4A'], badge:'خصم 15%' },
  { id:9, name:'كورس اسكراب كامل (بلوزة وبنطلون)', cat:'كورسات طبية', price:1150, oldPrice:1400, img:'https://images.unsplash.com/photo-1762237798212-bcc000c00891?w=600&q=80', colors:['#1B2A4A','#1FB8AF'], badge:'خصم 18%' },
  { id:10, name:'كورس طبي نسائي مطاط خصر', cat:'كورسات طبية', price:1080, img:'https://images.unsplash.com/photo-1676286529851-4555b4d2def0?w=600&q=80', colors:['#1FB8AF','#8A8A8A'] },
];

// ---------- الوضع الليلي / النهاري ----------
function initTheme() {
  const root = document.documentElement;
  const saved = window.__theme || 'light';
  root.setAttribute('data-theme', saved);
  document.querySelectorAll('.theme-toggle').forEach(btn=>{
    btn.setAttribute('aria-label','تبديل الوضع الليلي');
    btn.addEventListener('click', ()=>{
      const cur = root.getAttribute('data-theme');
      const next = cur === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      window.__theme = next;
    });
  });
}

// ---------- سلة تجريبية (في الذاكرة فقط لكل صفحة) ----------
window.__cart = window.__cart || [
  { id:1, qty:1 }, { id:3, qty:2 }
];

function cartCount() {
  return window.__cart.reduce((s,i)=>s+i.qty,0);
}

function renderCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(el=> el.textContent = cartCount());
}

function addToCart(productId) {
  const existing = window.__cart.find(i=>i.id===productId);
  if (existing) existing.qty += 1;
  else window.__cart.push({ id: productId, qty: 1 });
  renderCartBadge();
  showToast('تمت إضافة المنتج إلى السلة');
}

// ---------- Toast ----------
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=> toast.classList.remove('show'), 2400);
}

// ---------- ظهور تدريجي عند التمرير ----------
function initScrollReveal() {
  const els = document.querySelectorAll('[data-animate]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold: .15 });
  els.forEach(el=> io.observe(el));
}

// ---------- بطاقة منتج (HTML مولّد) ----------
function productCard(p) {
  const swatches = p.colors.map(c=>`<span class="swatch" style="background:${c}"></span>`).join('');
  return `
  <div class="product-card" data-animate>
    <div class="product-media">
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
      <button class="product-wish" aria-label="أضف للمفضلة" onclick="showToast('أُضيف إلى المفضلة')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
      <button class="product-quickadd" onclick="addToCart(${p.id})">إضافة سريعة للسلة</button>
    </div>
    <a href="product.html?id=${p.id}">
      <div class="product-cat">${p.cat}</div>
      <div class="product-title">${p.name}</div>
      <div class="product-price">${p.price} ج.م ${p.oldPrice ? `<span class="old">${p.oldPrice} ج.م</span>`:''}</div>
      <div class="swatches">${swatches}</div>
    </a>
  </div>`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  initTheme();
  renderCartBadge();
  initScrollReveal();

  document.querySelectorAll('.mobile-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelector('.main-nav')?.classList.toggle('open');
    });
  });
});
