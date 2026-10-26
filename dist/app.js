'use strict';
const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const currency=value=>new Intl.NumberFormat('cs-CZ',{style:'currency',currency:'CZK',maximumFractionDigits:0}).format(value);
const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
// Original Forest Vital symbols, drawn on a 24 px grid. Arrows are paths, never text glyphs.
const symbols={
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.2 15.2 5 5"/>',
  heart:'<path d="M12 20.1 4.5 13a5 5 0 0 1 7.5-6.6A5 5 0 0 1 19.5 13Z"/>',
  bag:'<path d="m5 8-1 12h16L19 8Z"/><path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2M8.5 11v1m7-1v1"/>',
  arrow:'<path d="M3.5 12h17m-6.7-6.5 6.7 6.5-6.7 6.5"/>',
  back:'<path d="M20.5 12h-17m6.7-6.5L3.5 12l6.7 6.5"/>',
  chevron:'<path d="m5.5 8.5 6.5 7 6.5-7"/>',
  branch:'<path d="M7 21 17 3M11.8 12.5c-5 .8-6.6-2-6.3-6 5-.5 7 1.6 6.3 6Zm1.9-3.6c.4-4.9 3.3-6.1 7-5.3-.2 5-2.7 6.7-7 5.3ZM8.7 18c-4.8.8-6.6-1.9-6.2-5.5 4.9-.5 6.7 1.3 6.2 5.5Zm3-4.6c4.5-1.9 7.3-.3 8.2 3.3-4.3 2.7-7 1.4-8.2-3.3Z"/>',
  sprout:'<path d="M12 21v-8M12 13C6 14 3 10 3 5c6-.6 9 2.3 9 8Zm0 0c6 1 9-3 9-8-6-.6-9 2.3-9 8ZM7 21h10"/>',
  list:'<path d="M7 3h10l3 3v15H4V3h3M8 8h7M8 12h8m-8 4h5"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.2"/>',
  close:'<path d="m5.5 5.5 13 13m0-13-13 13"/>',
  plus:'<path d="M5 12h14m-7-7v14"/>',
  minus:'<path d="M5 12h14"/>',
  check:'<path d="m5 12 4.5 4.5L19 7"/>',
  leaf:'<path d="M5 19C-1 6 11 1 21 3c1.5 10-4 21-16 16Zm0 0L17 7m-8 8-1-6m5 2 6 1"/>'
};
const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${symbols[name]||symbols.leaf}</svg>`;
function hydrate(root=document){$$('[data-symbol]',root).forEach(node=>node.innerHTML=icon(node.dataset.symbol));}
const storage={get(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}},set(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{/* The current session remains usable without storage. */}}};
let products=[],category='all',query='',detailId=null,detailQty=1,toastTimer;
let cart=storage.get('forest-vital-cart-v1',[]),saved=storage.get('forest-vital-saved-v1',[]);
if(!Array.isArray(cart))cart=[];if(!Array.isArray(saved))saved=[];
let checkout={step:1,fields:{},shipping:'courier',payment:'transfer'};
const productById=id=>products.find(product=>product.id===id);
const countCart=()=>cart.reduce((total,item)=>total+item.qty,0);
const subtotal=()=>cart.reduce((total,item)=>total+(productById(item.id)?.price||0)*item.qty,0);
const shippingPrice=()=>checkout.shipping==='courier'?99:0;
const scrollMode=matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth';
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3000);}
function persist(){storage.set('forest-vital-cart-v1',cart);storage.set('forest-vital-saved-v1',saved);updateCounters();}
function updateCounters(){
  const count=countCart();$$('.cart-count').forEach(node=>{node.textContent=count;if(node.closest('.mobile-nav'))node.hidden=!count;});
  $$('.saved-count').forEach(node=>{node.textContent=saved.length;node.hidden=!saved.length;});
  $('.bag-control').setAttribute('aria-label',`Otevřít košík, ${count} kusů`);
  $$('[data-action="save"]').forEach(button=>{const active=saved.includes(button.dataset.id);button.classList.toggle('saved',active);button.setAttribute('aria-pressed',String(active));button.setAttribute('aria-label',`${active?'Odebrat z uložených':'Uložit produkt'}: ${productById(button.dataset.id)?.name||''}`);});
}
function setSaved(id){
  const opener=document.activeElement,action=opener?.dataset.action;
  saved=saved.includes(id)?saved.filter(item=>item!==id):[...saved,id];persist();
  if(category==='saved'){renderProducts();$(`[data-action="${action}"][data-id="${id}"]`)?.focus({preventScroll:true});}
  toast(saved.includes(id)?'Produkt je uložený pro váš příští výběr.':'Produkt byl odebrán z uložených.');
}
function matchesQuery(product,value){const tokens=normalize(value).trim().split(/\s+/).filter(Boolean);const haystack=normalize([product.fullName,product.category,product.subtitle,product.description,product.ingredients].join(' '));return tokens.every(token=>haystack.includes(token));}
function filteredProducts(){
  const list=products.filter(product=>(category==='all'||(category==='saved'?saved.includes(product.id):product.category===category))&&matchesQuery(product,query));
  const sort=$('#catalog-sort').value;
  if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'cs'));
  return list;
}
function renderProducts(){
  const list=filteredProducts();
  $('#product-grid').innerHTML=list.length?list.map(product=>`<article class="product-card" aria-label="${escapeHtml(product.name)}"><div class="card-art"><button class="card-image" data-action="product" data-id="${product.id}" aria-label="Detail produktu ${escapeHtml(product.name)}"><img src="${product.image}" alt="Balení ${escapeHtml(product.fullName)}" loading="lazy" width="1254" height="1254" decoding="async"></button><span class="card-number">No. ${String(products.indexOf(product)+1).padStart(2,'0')}</span><button class="icon-control save-product" data-action="save" data-id="${product.id}" aria-label="Uložit produkt ${escapeHtml(product.name)}" aria-pressed="${saved.includes(product.id)}">${icon('heart')}</button></div><div class="card-body"><p class="card-category">${escapeHtml(product.category)}</p><h3 class="card-title"><button data-action="product" data-id="${product.id}">${escapeHtml(product.name)}</button></h3><p class="card-subtitle">${escapeHtml(product.subtitle)}</p><div class="card-bottom"><div><span class="card-price">${currency(product.price)}</span><span class="card-package">${escapeHtml(product.package)}</span></div><button class="card-add" data-action="add" data-id="${product.id}" aria-label="Přidat ${escapeHtml(product.name)} do ukázkového košíku">${icon('plus')}</button></div></div></article>`).join(''):`<div class="empty">${icon(category==='saved'?'heart':'search')}<h3>${category==='saved'&&!saved.length?'Váš výběr ještě roste.':'Tento výběr je zatím prázdný.'}</h3><p>${category==='saved'&&!saved.length?'Uložte si produkt srdíčkem a vraťte se k němu, až budete chtít.':'Zkuste jiný název, složku nebo zobrazte celou kolekci.'}</p><button class="button secondary" data-action="reset">Prohlédnout celou kolekci ${icon('arrow')}</button></div>`;
  $('#result-count').textContent=`${list.length} ${list.length===1?'produkt':list.length<5?'produkty':'produktů'}${category==='saved'?' v uložených':' v kolekci'}${query?` · hledáte „${query}“`:''}`;
  $('#reset-filters').hidden=category==='all'&&!query&&$('#catalog-sort').value==='collection';
  $$('[data-category]').forEach(button=>{const active=button.dataset.category===category;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));});updateCounters();
}
function resetFilters(){category='all';query='';$('#catalog-search').value='';$('#catalog-sort').value='collection';renderProducts();}
function openDialog(id){const dialog=document.getElementById(id),previous=$('dialog[open]');if(previous===dialog)return;dialog._opener=document.activeElement;dialog.dataset.returnTo=id==='product-dialog'&&previous?previous.id:'';$$('dialog[open]').forEach(open=>open.close());dialog.showModal();dialog.scrollTop=0;}
function closeDialog(control){const dialog=control.closest('dialog');if(!dialog)return;const returnTo=dialog.dataset.returnTo;dialog.close();if(returnTo){openDialog(returnTo);}else if(dialog._opener?.isConnected){dialog._opener.focus({preventScroll:true});}}
function qtyControl(actionPrefix,quantity,id=''){return `<div class="qty" role="group" aria-label="Počet kusů"><button data-action="${actionPrefix}-minus" data-id="${id}" aria-label="Snížit počet kusů" ${quantity<=1&&actionPrefix==='detail'?'disabled':''}>${icon('minus')}</button><span class="${actionPrefix==='detail'?'detail-qty':''}" aria-live="polite">${quantity}</span><button data-action="${actionPrefix}-plus" data-id="${id}" aria-label="Zvýšit počet kusů" ${quantity>=99?'disabled':''}>${icon('plus')}</button></div>`;}
function openProduct(id){
  const product=productById(id);if(!product)return;detailId=id;detailQty=1;
  const price=`<div class="detail-price">${currency(product.price)}<small>${escapeHtml(product.package)} · cena z podkladů</small></div>`;
  $('#product-detail').innerHTML=`<div class="detail-layout"><div class="detail-art"><img src="${product.image}" alt="${escapeHtml(product.fullName)}" width="1254" height="1254"><p class="detail-art-note">FOREST VITAL / No. ${String(products.indexOf(product)+1).padStart(2,'0')}</p></div><div class="detail-copy"><p class="eyebrow">${escapeHtml(product.category)}</p><h2 id="product-title">${escapeHtml(product.name)}</h2><p class="detail-subtitle">${escapeHtml(product.subtitle)}</p><p class="detail-description">${escapeHtml(product.description)}</p><div class="detail-purchase">${price}${qtyControl('detail',1)}</div><button class="button primary detail-add" data-action="detail-add">Přidat do ukázkového košíku ${icon('bag')}</button><p class="detail-note">Ukázková nabídka bez napojení na sklad. Informace vycházejí z dodaných podkladů; před užíváním je ověřte na aktuální etiketě.</p><div class="product-accordions"><details open><summary>Složení na jednu tobolku ${icon('plus')}</summary><ul class="ingredients-list">${product.ingredients.split(';').map(item=>`<li>${escapeHtml(item.trim())}</li>`).join('')}</ul></details><details><summary>Doporučené užívání ${icon('plus')}</summary><p>${escapeHtml(product.dosage)}</p></details><details><summary>Upozornění ${icon('plus')}</summary><p>${escapeHtml(product.warning)}</p></details></div></div></div><div class="detail-mobile-buy">${price}${qtyControl('detail',1)}<button class="button primary" data-action="detail-add">Přidat do ukázkového košíku ${icon('bag')}</button></div>`;
  updateCounters();openDialog('product-dialog');
}
function setDetailQuantity(change){detailQty=Math.max(1,Math.min(99,detailQty+change));$$('.detail-qty').forEach(node=>node.textContent=detailQty);$$('[data-action="detail-minus"]').forEach(button=>button.disabled=detailQty<=1);$$('[data-action="detail-plus"]').forEach(button=>button.disabled=detailQty>=99);}
function addToCart(id,quantity=1){
  const product=productById(id);if(!product)return;const item=cart.find(entry=>entry.id===id);if(item)item.qty=Math.min(99,item.qty+quantity);else cart.push({id,qty:Math.max(1,Math.min(99,quantity))});persist();renderCart();toast(`${product.name} je v ukázkovém košíku.`);
}
function renderCart(){
  $('#cart-content').innerHTML=cart.length?`<div class="cart-items">${cart.map(item=>{const product=productById(item.id);return `<article class="cart-item"><button class="cart-thumb" data-action="product" data-id="${item.id}" aria-label="Detail ${escapeHtml(product.name)}"><img src="${product.image}" alt=""></button><div><h3>${escapeHtml(product.name)}</h3><small>${escapeHtml(product.package)} · ${currency(product.price)} / balení</small>${qtyControl('cart',item.qty,item.id)}</div><div class="cart-end"><span>${currency(product.price*item.qty)}</span><button data-action="remove" data-id="${item.id}" aria-label="Odebrat ${escapeHtml(product.name)} z košíku">Odebrat</button></div></article>`;}).join('')}</div><div class="cart-summary"><div class="summary-row"><span>Produkty (${countCart()} ks)</span><span>${currency(subtotal())}</span></div><div class="summary-row"><span>Doprava</span><span>V dalším kroku</span></div><div class="summary-row total"><strong>Mezisoučet</strong><strong>${currency(subtotal())}</strong></div><button class="button primary" data-action="checkout">Vyzkoušet objednávku ${icon('arrow')}</button><p class="demo-note">Toto je ukázkový košík. Nevzniká skutečná objednávka, data se neodesílají a nic neplatíte.</p><button class="text-button" data-close>Ještě se porozhlédnout</button></div>`:`<div class="empty">${icon('bag')}<h3>Prostor pro váš výběr.</h3><p>Košík je zatím prázdný.<br>Poznejte naši kolekci šesti produktů.</p><button class="button primary" data-action="continue">Prozkoumat kolekci ${icon('arrow')}</button></div>`;
}
function changeCart(id,change,action){const item=cart.find(entry=>entry.id===id);if(!item)return;item.qty=Math.min(99,item.qty+change);if(item.qty<1)cart=cart.filter(entry=>entry.id!==id);persist();renderCart();const target=$(`[data-action="${action}"][data-id="${id}"]`,$('#cart-dialog'));(target&&!target.disabled?target:$('#cart-dialog button[data-action="checkout"]')||$('#cart-dialog button[data-action="continue"]'))?.focus({preventScroll:true});}
function focusCheckout(){const heading=$('#checkout-title');heading.tabIndex=-1;if($('#checkout-dialog').open)heading.focus({preventScroll:true});}
function renderCheckout(){
  const steps=`<div class="checkout-steps" aria-label="Krok ${checkout.step} ze tří"><span class="${checkout.step===1?'active':''}">01 · Údaje</span><span class="${checkout.step===2?'active':''}">02 · Doprava a platba</span><span class="${checkout.step===3?'active':''}">03 · Kontrola</span></div>`;
  const note='<p class="demo-note">Zkušební objednávka. Použijte smyšlené údaje. Nic se neodesílá, nevzniká objednávka ani platba.</p>';
  let body='';
  if(checkout.step===1){
    const fields=[['firstName','Jméno','text','given-name'],['lastName','Příjmení','text','family-name'],['email','E-mail','email','email'],['phone','Telefon','tel','tel'],['street','Ulice a číslo','text','street-address'],['city','Město','text','address-level2'],['zip','PSČ','text','postal-code']];
    body=`${note}<button class="text-button" data-action="demo-fill">Vyplnit ukázkové údaje ${icon('arrow')}</button><form id="checkout-form" class="checkout-form">${fields.map(([name,label,type,auto])=>`<label class="${name==='street'?'full':''}">${label} *<input name="${name}" type="${type}" autocomplete="${auto}" maxlength="${name==='email'?120:80}" required value="${escapeHtml(checkout.fields[name]||'')}" ${name==='zip'?'pattern="[0-9]{3} ?[0-9]{2}" inputmode="numeric" title="PSČ ve formátu 123 45"':''}></label>`).join('')}<label>Země<select name="country"><option>Česká republika</option></select></label><button type="submit" class="button primary full">Doprava a platba ${icon('arrow')}</button></form>`;
  }else if(checkout.step===2){
    body=`${note}<h3 class="checkout-subtitle">Doprava v ukázce</h3><div class="choice-list"><label><input name="shipping" type="radio" value="courier" ${checkout.shipping==='courier'?'checked':''}><span>Kurýr na adresu<small>Ukázková cena dopravy</small></span><b>99 Kč</b></label><label><input name="shipping" type="radio" value="pickup" ${checkout.shipping==='pickup'?'checked':''}><span>Osobní odběr<small>Ukázka bez výběru odběrného místa</small></span><b>Zdarma</b></label></div><h3 class="checkout-subtitle">Platba v ukázce</h3><div class="choice-list"><label><input name="payment" type="radio" value="transfer" ${checkout.payment==='transfer'?'checked':''}><span>Bankovní převod<small>Žádné platební údaje se nevytvářejí</small></span><b>Zdarma</b></label><label><input name="payment" type="radio" value="card" ${checkout.payment==='card'?'checked':''}><span>Platba kartou<small>Údaje karty se nikde nezadávají</small></span><b>Zdarma</b></label></div><div class="checkout-actions"><button class="text-button" data-action="checkout-back">${icon('back')} Vaše údaje</button><button class="button primary" data-action="checkout-next">Zkontrolovat výběr ${icon('arrow')}</button></div>`;
  }else{
    const fields=checkout.fields;
    body=`${note}<div class="review-address"><strong>${escapeHtml(fields.firstName)} ${escapeHtml(fields.lastName)}</strong><br>${escapeHtml(fields.street)}, ${escapeHtml(fields.zip)} ${escapeHtml(fields.city)}<br>${escapeHtml(fields.email)} · ${escapeHtml(fields.phone)}<br><br>${checkout.shipping==='courier'?'Kurýr na adresu':'Osobní odběr (ukázka)'} · ${checkout.payment==='card'?'Platba kartou (ukázka)':'Bankovní převod (ukázka)'}</div>${cart.map(item=>`<div class="summary-row"><span>${item.qty} × ${escapeHtml(productById(item.id).name)}</span><span>${currency(productById(item.id).price*item.qty)}</span></div>`).join('')}<div class="summary-row"><span>Doprava (ukázková cena)</span><span>${currency(shippingPrice())}</span></div><div class="summary-row total"><strong>Celkem v ukázce</strong><strong>${currency(subtotal()+shippingPrice())}</strong></div><div class="checkout-actions"><button class="text-button" data-action="checkout-back">${icon('back')} Doprava a platba</button><button class="button primary" data-action="checkout-finish">Dokončit ukázku ${icon('check')}</button></div>`;
  }
  $('#checkout-content').innerHTML=steps+body;$('#checkout-dialog').scrollTop=0;focusCheckout();
}
function finishCheckout(){
  $('#checkout-content').innerHTML=`<div class="checkout-success">${icon('check')}<p class="eyebrow">UKÁZKA DOKONČENA</p><h3>Takto by vypadal<br>váš další krok.</h3><p>Prošli jste zkušební objednávkou.<br>Žádná objednávka nebyla odeslána.<br>Nic se neplatilo a košík vám zůstává.</p><button class="button primary" data-action="continue">Vrátit se ke kolekci ${icon('arrow')}</button></div>`;checkout={step:1,fields:{},shipping:'courier',payment:'transfer'};$('#checkout-dialog').scrollTop=0;const confirmation=$('.checkout-success h3');confirmation.tabIndex=-1;confirmation.focus({preventScroll:true});
}
function focusSearch(){category='all';renderProducts();$('#kolekce').scrollIntoView({behavior:scrollMode});$('#catalog-search').focus({preventScroll:true});}
document.addEventListener('click',event=>{
  const control=event.target.closest('button,a');if(!control)return;
  if(control.hasAttribute('data-close')){closeDialog(control);return;}
  if(control.dataset.category){category=control.dataset.category;renderProducts();return;}
  const action=control.dataset.action,id=control.dataset.id;
  switch(action){
    case'search':focusSearch();break;
    case'saved':category='saved';query='';$('#catalog-search').value='';renderProducts();$('#kolekce').scrollIntoView({behavior:scrollMode});break;
    case'reset':resetFilters();break;
    case'save':setSaved(id);break;
    case'product':openProduct(id);break;
    case'add':addToCart(id);break;
    case'detail-minus':setDetailQuantity(-1);break;
    case'detail-plus':setDetailQuantity(1);break;
    case'detail-add':addToCart(detailId,detailQty);$('#product-dialog').close();openDialog('cart-dialog');break;
    case'cart':renderCart();openDialog('cart-dialog');break;
    case'cart-minus':changeCart(id,-1,action);break;
    case'cart-plus':changeCart(id,1,action);break;
    case'remove':{const item=cart.find(entry=>entry.id===id);if(item)changeCart(id,-item.qty,'cart-minus');break;}
    case'continue':$$('dialog[open]').forEach(dialog=>dialog.close());$('#kolekce').scrollIntoView({behavior:scrollMode});break;
    case'checkout':if(cart.length){checkout.step=1;renderCheckout();openDialog('checkout-dialog');focusCheckout();}break;
    case'checkout-back':checkout.step=Math.max(1,checkout.step-1);renderCheckout();break;
    case'checkout-next':checkout.shipping=$('input[name="shipping"]:checked').value;checkout.payment=$('input[name="payment"]:checked').value;checkout.step=3;renderCheckout();break;
    case'checkout-finish':if(cart.length)finishCheckout();break;
    case'demo-fill':{const fields={firstName:'Jana',lastName:'Ukázková',email:'demo@example.test',phone:'123456789',street:'Ukázková 123',city:'Ukázkové město',zip:'123 45'};Object.entries(fields).forEach(([name,value])=>{$(`#checkout-form [name="${name}"]`).value=value;});toast('Vyplněny smyšlené údaje pro ukázku.');break;}
    case'privacy':openDialog('privacy-dialog');break;
    case'clear-data':cart=[];saved=[];persist();renderProducts();renderCart();toast('Místní košík i uložené produkty byly vymazány.');break;
  }
});
document.addEventListener('submit',event=>{
  if(event.target.id!=='checkout-form')return;event.preventDefault();
  const fields=Object.fromEntries(new FormData(event.target));
  const empty=$$('input[required]',event.target).find(input=>!input.value.trim());
  if(empty){empty.setCustomValidity('Vyplňte prosím toto pole.');empty.reportValidity();empty.addEventListener('input',()=>empty.setCustomValidity(''),{once:true});return;}
  if(!/^\+?[\d\s()-]{9,20}$/.test(fields.phone)||(fields.phone.match(/\d/g)||[]).length<9){const phone=$('[name="phone"]',event.target);phone.setCustomValidity('Telefon musí obsahovat alespoň devět číslic.');phone.reportValidity();phone.addEventListener('input',()=>phone.setCustomValidity(''),{once:true});return;}
  checkout.fields=fields;checkout.step=2;renderCheckout();
});
$('#catalog-search').addEventListener('input',event=>{query=event.target.value.trim();renderProducts();});
$('#catalog-sort').addEventListener('change',renderProducts);
$$('dialog').forEach(dialog=>{dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog(dialog);});dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog(dialog);}});});
async function init(){
  hydrate();
  try{const response=await fetch('products.json?v=1.0.0');if(!response.ok)throw new Error('Unavailable catalog');products=await response.json();saved=[...new Set(saved.filter(id=>productById(id)))];cart=cart.filter(item=>productById(item.id)&&Number.isFinite(item.qty)&&item.qty>0).map(item=>({id:item.id,qty:Math.min(99,Math.floor(item.qty))}));persist();renderProducts();renderCart();}
  catch{$('#product-grid').innerHTML=`<div class="empty">${icon('info')}<h3>Kolekce se nepodařila načíst.</h3><p>Zkontrolujte připojení a obnovte stránku.</p><button class="button secondary" data-action="retry">Zkusit znovu ${icon('arrow')}</button></div>`;$('#result-count').textContent='Kolekce není dostupná';}
}
document.addEventListener('click',event=>{if(event.target.closest('[data-action="retry"]'))init();});
init();
