/* Forest Vital 1.1.0 — one viewport, six real product worlds. */
(() => {
  'use strict';
  const root = document.getElementById('showroom-root');
  if (!root) return;
  document.body.classList.add('showroom-mode');
  document.documentElement.classList.add('showroom-page');
  const order = ['pamet','chlap','cbd','synbiotika','oci','queen-bee'];
  const worlds = {
    pamet:{world:'#243e56',ink:'#f7f5ed',muted:'#d2dbdc',action:'#e2c38c',actionInk:'#273e4d'},
    chlap:{world:'#623a32',ink:'#fff9ee',muted:'#e8d8c7',action:'#efd9ae',actionInk:'#4c3027'},
    cbd:{world:'#254a3c',ink:'#f8f4e8',muted:'#d0ddd2',action:'#cfdf9a',actionInk:'#263d30'},
    synbiotika:{world:'#b8d4cd',ink:'#17372d',muted:'#3d5e52',action:'#244d40',actionInk:'#f8f5e9'},
    oci:{world:'#5f9f98',ink:'#102d26',muted:'#102d26',action:'#153f36',actionInk:'#f8f5e9'},
    'queen-bee':{world:'#d4be85',ink:'#263b2d',muted:'#3d4d37',action:'#314c36',actionInk:'#f8f5e9'}
  };
  const leads = {
    pamet:'Rostlinné extrakty, vitaminy a minerály.',
    chlap:'Rostlinný komplex se zinkem a selenem.',
    cbd:'Kanabinoidy v kombinaci s rostlinnými extrakty.',
    synbiotika:'Prebiotická vláknina a jedenáct kultur.',
    oci:'Rostlinné extrakty, vitaminy a minerály.',
    'queen-bee':'Mateří kašička, vitální houby a vitaminy.'
  };
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover:hover) and (pointer:fine)');
  const state = {id:'pamet',ready:false,imageId:null,request:0,panel:'ingredients'};
  const one = selector => root.querySelector(selector);
  const many = selector => [...root.querySelectorAll(selector)];
  const number = value => String(value).padStart(2,'0');
  const source = product => product.showroomImage || product.image;
  const previewLocks = new Map();
  let collection = [], hoverTimer, mediaTimer, hoverEnabled = true;
  let lastPreviewPoint = null, touchStart = null, info;
  const play = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 4 12 8-12 8Z"/></svg>';

  function unavailable() {
    if (state.ready) return;
    root.innerHTML = `<div class="showroom-loading"><p class="eyebrow">FOREST VITAL</p><h1>Kolekci se nepodařilo načíst.</h1><p>Zkontrolujte připojení a zkuste to znovu.</p><button class="button primary" data-action="retry">Načíst produkty ${icon('arrow')}</button></div>`;
  }

  function init() {
    if (!products.length) return;
    collection = order.map(id=>productById(id)).filter(Boolean);
    if (!collection.length) { unavailable(); return; }
    if (!collection.some(product=>product.id===state.id)) state.id=collection[0].id;
    if (state.ready) { paint(false); return; }
    state.ready=true;
    root.innerHTML = `<div class="showroom-shell"><section class="showroom-scene" aria-labelledby="showroom-title" data-number="01">
      <div class="showroom-copy">
        <div class="showroom-kicker"><p><span>RECEPTURA</span> <b id="showroom-position">01 / 06</b></p><button class="showroom-film-button" data-action="film">${play}<span>Lesní film</span></button></div>
        <h1 id="showroom-title"></h1><p id="showroom-subtitle" class="showroom-subtitle"></p><p id="showroom-lead" class="showroom-lead"></p>
        <div class="showroom-commerce"><div class="showroom-value"><span id="showroom-price"></span><small id="showroom-package"></small></div><div class="showroom-purchase-actions"><button class="button primary showroom-add" data-action="add">Přidat do košíku ${icon('bag')}</button><button class="icon-control showroom-save" data-action="save" aria-label="Uložit produkt" aria-pressed="false">${icon('heart')}</button></div></div>
        <div class="showroom-info-links" role="group" aria-label="Podrobnosti o produktu"><button data-showroom-info="ingredients">Složení ${icon('plus')}</button><button data-showroom-info="dosage">Užívání ${icon('plus')}</button><button data-showroom-info="warning">Upozornění ${icon('plus')}</button></div>
        <p class="showroom-demo-note">Ukázkový e-shop · bez skutečných plateb</p>
      </div>
      <div class="showroom-visual" aria-label="Balení a další produkty">
        <div class="showroom-primary-art"><span class="showroom-product-shadow" aria-hidden="true"></span><img id="showroom-image" class="showroom-primary-image" alt="" width="1792" height="2240" decoding="async" fetchpriority="high"><p id="showroom-media-status" class="showroom-media-status" hidden></p></div>
        <div class="showroom-upcoming" role="group" aria-label="Další balení z kolekce">${[0,1].map(slot=>`<button class="showroom-preview" data-showroom-preview-slot="${slot}"><img alt="" width="1792" height="2240" decoding="async"><span></span></button>`).join('')}</div>
      </div>
    </section><nav class="showroom-navigation" aria-label="Procházet jednotlivé produkty"><button class="showroom-direction" data-showroom-direction="prev" aria-label="Předchozí produkt">${icon('back')}</button><div class="showroom-picker" role="group" aria-label="Vybrat produkt">${collection.map((product,index)=>`<button class="showroom-choice" data-showroom-product="${escapeHtml(product.id)}" aria-pressed="false" aria-controls="showroom-title"><small>${number(index+1)}</small><strong>${escapeHtml(product.name)}</strong></button>`).join('')}</div><button class="showroom-direction" data-showroom-direction="next" aria-label="Další produkt">${icon('arrow')}</button></nav><p class="sr-only" id="showroom-status" role="status" aria-live="polite" aria-atomic="true"></p></div>`;
    createInfoDialog();
    root.addEventListener('click',onClick);
    many('[data-showroom-product],[data-showroom-preview-slot]').forEach(button=>{
      button.addEventListener('focus',()=>{
        if (document.querySelector('dialog[open]')) return;
        clearTimeout(hoverTimer);
        const id=button.dataset.showroomProduct||button.dataset.showroomPreview;
        if (button.hasAttribute('data-showroom-preview-slot')&&id) previewLocks.set(button,id);
        select(id,button.matches(':focus-visible'));
      });
      button.addEventListener('pointerleave',()=>{clearTimeout(hoverTimer);if(document.activeElement!==button&&previewLocks.delete(button))paintPreviews();});
      button.addEventListener('blur',()=>{if((!hover.matches||!button.matches(':hover'))&&previewLocks.delete(button))paintPreviews();});
    });
    document.addEventListener('keydown',onKeydown,{capture:true});
    document.addEventListener('pointerdown',event=>{
      clearTimeout(hoverTimer);lastPreviewPoint=null;
      if(event.pointerType!=='touch')hoverEnabled=true;
    },{capture:true,passive:true});
    document.addEventListener('pointermove',event=>{
      if(!(Number(event.movementX)||Number(event.movementY)))return;
      if(!hoverEnabled)lastPreviewPoint=null;
      hoverEnabled=true;
      const button=event.target.closest('[data-showroom-product],[data-showroom-preview-slot]');
      if(button&&root.contains(button))queueHover(button,event);else clearTimeout(hoverTimer);
    },{passive:true});
    one('.showroom-visual').addEventListener('pointerdown',event=>{
      if(event.pointerType==='touch'&&event.isPrimary&&!event.target.closest('button'))touchStart={x:event.clientX,y:event.clientY,id:event.pointerId};
    },{passive:true});
    one('.showroom-visual').addEventListener('pointerup',event=>{
      if(!touchStart||event.pointerId!==touchStart.id)return;
      const x=event.clientX-touchStart.x,y=event.clientY-touchStart.y;touchStart=null;
      if(Math.abs(x)>50&&Math.abs(x)>Math.abs(y)*1.4)move(x<0?1:-1);
    },{passive:true});
    one('.showroom-visual').addEventListener('pointercancel',()=>touchStart=null,{passive:true});
    paint(false);
  }

  function queueHover(button,event) {
    if(!hoverEnabled||!hover.matches||event.pointerType==='touch'||document.querySelector('dialog[open]'))return;
    if(button.hasAttribute('data-showroom-preview-slot')){
      if(lastPreviewPoint&&Math.hypot(event.clientX-lastPreviewPoint.x,event.clientY-lastPreviewPoint.y)<8)return;
      lastPreviewPoint={x:event.clientX,y:event.clientY};
    }
    clearTimeout(hoverTimer);
    const id=button.dataset.showroomProduct||button.dataset.showroomPreview;
    if(button.hasAttribute('data-showroom-preview-slot')&&id)previewLocks.set(button,id);
    hoverTimer=setTimeout(()=>{if(hoverEnabled&&!document.querySelector('dialog[open]'))select(id,false);},90);
  }

  function select(id,announce=true) {
    if(!id||!collection.some(product=>product.id===id))return;
    if(state.id===id){if(one('#showroom-image').hidden)showImage(productById(id));return;}
    state.id=id;paint(announce);
  }

  function move(direction) {
    const index=collection.findIndex(product=>product.id===state.id), next=collection[index+direction];
    if(next)select(next.id);
  }

  function paint(announce=true) {
    const product=collection.find(item=>item.id===state.id);if(!product)return;
    const index=collection.indexOf(product),palette=worlds[product.id]||worlds.pamet;
    Object.entries(palette).forEach(([key,value])=>document.body.style.setProperty(`--showroom-${key}`,value));
    document.body.dataset.showroomProduct=product.id;root.dataset.activeProduct=product.id;
    one('.showroom-scene').dataset.number=number(index+1);
    one('#showroom-position').textContent=`${number(index+1)} / ${number(collection.length)}`;
    one('#showroom-title').textContent=product.name;
    one('#showroom-subtitle').textContent=product.subtitle;
    one('#showroom-lead').textContent=leads[product.id]||'';
    one('#showroom-price').textContent=currency(product.price);
    one('#showroom-package').textContent=product.package;
    many('.showroom-add,.showroom-save').forEach(button=>button.dataset.id=product.id);
    one('.showroom-add').setAttribute('aria-label',`Přidat ${product.name} do ukázkového košíku`);
    many('[data-showroom-product]').forEach(button=>{
      const active=button.dataset.showroomProduct===product.id;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));
    });
    many('[data-showroom-direction]').forEach(button=>{
      const previous=button.dataset.showroomDirection==='prev',adjacent=collection[index+(previous?-1:1)];button.disabled=!adjacent;
      button.setAttribute('aria-label',adjacent?`${previous?'Předchozí':'Další'} produkt: ${adjacent.name}`:`${previous?'Začátek':'Konec'} kolekce`);
    });
    paintPreviews();showImage(product);updateCounters();
    if(announce)one('#showroom-status').textContent=`${product.name}. Produkt ${index+1} ze ${collection.length}.`;
  }

  function paintPreviews() {
    const index=collection.findIndex(product=>product.id===state.id);if(index<0)return;
    const locked=new Set(previewLocks.values());
    const candidates=collection.slice(index+1).concat(collection.slice(0,index)).filter(product=>!locked.has(product.id));let cursor=0;
    many('[data-showroom-preview-slot]').forEach(button=>{
      const product=previewLocks.has(button)?collection.find(item=>item.id===previewLocks.get(button)):candidates[cursor++];
      button.hidden=!product;if(!product)return;
      button.dataset.showroomPreview=product.id;button.querySelector('img').src=source(product);button.querySelector('span').textContent=product.name;
      button.setAttribute('aria-label',`Prohlédnout ${product.name}`);button.setAttribute('aria-pressed',String(product.id===state.id));
    });
  }

  function showImage(product) {
    const image=one('#showroom-image'),art=one('.showroom-primary-art'),status=one('#showroom-media-status');
    const request=++state.request,changing=state.imageId&&state.imageId!==product.id;clearTimeout(mediaTimer);
    many('.showroom-outgoing').forEach(node=>node.remove());
    if(changing&&!motion.matches&&image.complete&&image.naturalWidth&&image.classList.contains('is-ready')){
      const ghost=document.createElement('img');ghost.className='showroom-outgoing';ghost.alt='';ghost.setAttribute('aria-hidden','true');ghost.src=image.currentSrc||image.src;art.append(ghost);
      ghost.addEventListener('animationend',()=>ghost.remove(),{once:true});setTimeout(()=>ghost.remove(),650);
    }
    state.imageId=product.id;art.classList.toggle('has-cutout',!!product.showroomImage);
    image.classList.remove('is-ready','is-arriving');image.hidden=false;image.alt=`Balení ${product.fullName}`;
    status.textContent='Načítáme balení…';status.hidden=false;art.setAttribute('aria-busy','true');
    let fallback=false;
    const finish=failed=>{
      if(request!==state.request)return;clearTimeout(mediaTimer);art.removeAttribute('aria-busy');image.hidden=failed;status.hidden=!failed;
      image.classList.toggle('is-ready',!failed);
      if(failed)status.textContent='Balení se nepodařilo načíst. Informace zůstávají dostupné.';
      else if(changing&&!motion.matches){void image.offsetWidth;image.classList.add('is-arriving');}
    };
    image.onload=()=>finish(false);
    image.onerror=()=>{
      if(request!==state.request)return;
      const alternate=product.editorialImage||product.image;
      if(!fallback&&alternate&&source(product)!==alternate){fallback=true;art.classList.remove('has-cutout');image.src=alternate;return;}
      finish(true);
    };
    image.src=source(product);if(image.complete)finish(!image.naturalWidth);else mediaTimer=setTimeout(()=>finish(true),15000);
  }

  function onClick(event) {
    const button=event.target.closest('button');if(!button||!root.contains(button))return;clearTimeout(hoverTimer);
    if(button.dataset.showroomProduct)select(button.dataset.showroomProduct);
    if(button.dataset.showroomPreview)select(previewLocks.get(button)||button.dataset.showroomPreview);
    if(button.dataset.showroomDirection){move(button.dataset.showroomDirection==='prev'?-1:1);if(button.disabled)one('.showroom-direction:not(:disabled)')?.focus({preventScroll:true});}
    if(button.dataset.showroomInfo)openInfo(button.dataset.showroomInfo,button);
  }

  function onKeydown(event) {
    hoverEnabled=false;clearTimeout(hoverTimer);
    if(event.altKey||event.ctrlKey||event.metaKey||document.querySelector('dialog[open]'))return;
    if(event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    if(!root.contains(event.target)&&event.target!==document.body)return;
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();
    const focused=event.target.closest('[data-showroom-product]');
    const index=collection.findIndex(product=>product.id===(focused?.dataset.showroomProduct||state.id));
    const next=event.key==='Home'?0:event.key==='End'?collection.length-1:Math.max(0,Math.min(collection.length-1,index+(event.key==='ArrowRight'?1:-1)));
    select(collection[next].id);
    if(focused)one(`[data-showroom-product="${collection[next].id}"]`).focus({preventScroll:true});
  }

  function createInfoDialog() {
    info=document.getElementById('showroom-info-dialog')||document.createElement('dialog');
    info.id='showroom-info-dialog';info.className='showroom-info-dialog';info.setAttribute('aria-labelledby','showroom-info-title');
    if(!info.isConnected)document.body.append(info);
    info.addEventListener('cancel',event=>{event.preventDefault();closeDialog(info);});
    info.addEventListener('click',event=>{
      const button=event.target.closest('button');
      if(button?.hasAttribute('data-showroom-close'))closeDialog(info);
      if(button?.dataset.showroomInfoTab)setInfoPanel(button.dataset.showroomInfoTab);
      if(event.target===info){const rect=info.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog(info);}
    });
    info.addEventListener('keydown',event=>{
      const tab=event.target.closest('[data-showroom-info-tab]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      const tabs=['ingredients','dosage','warning'],index=tabs.indexOf(tab.dataset.showroomInfoTab);
      const next=event.key==='Home'?0:event.key==='End'?2:(index+(event.key==='ArrowRight'?1:2))%3;
      event.preventDefault();setInfoPanel(tabs[next],true);
    });
  }

  function openInfo(panel,opener) {
    const product=productById(state.id);if(!product)return;state.panel=panel;
    info.innerHTML=`<div class="showroom-info-heading"><div><p class="eyebrow">${escapeHtml(product.category)}</p><h2 id="showroom-info-title" tabindex="-1">${escapeHtml(product.name)}</h2></div><button class="icon-control" data-showroom-close aria-label="Zavřít podrobnosti">${icon('close')}</button></div><p class="showroom-info-description">${escapeHtml(product.description)}</p><div class="showroom-info-meta"><span>${escapeHtml(product.package)}</span><strong>${currency(product.price)}</strong></div><div class="showroom-info-tabs" role="tablist" aria-label="Informace o produktu">${[['ingredients','Složení'],['dosage','Užívání'],['warning','Upozornění']].map(([key,label])=>`<button id="showroom-info-tab-${key}" data-showroom-info-tab="${key}" role="tab" aria-controls="showroom-info-panel-${key}" aria-selected="false" tabindex="-1">${label}</button>`).join('')}</div><div id="showroom-info-panel-ingredients" class="showroom-info-panel" role="tabpanel" aria-labelledby="showroom-info-tab-ingredients" tabindex="0"><p class="showroom-info-label">MNOŽSTVÍ NA JEDNU TOBOLKU</p><ul>${product.ingredients.split(';').map(item=>`<li>${escapeHtml(item.trim())}</li>`).join('')}</ul></div><div id="showroom-info-panel-dosage" class="showroom-info-panel" role="tabpanel" aria-labelledby="showroom-info-tab-dosage" tabindex="0" hidden><p>${escapeHtml(product.dosage)}</p><p class="showroom-info-support">Před užíváním se řiďte aktuální etiketou konkrétního výrobku.</p></div><div id="showroom-info-panel-warning" class="showroom-info-panel" role="tabpanel" aria-labelledby="showroom-info-tab-warning" tabindex="0" hidden><p>${escapeHtml(product.warning)}</p></div><p class="showroom-info-support">Informace vycházejí z dodaných podkladů. Náhled není propojený se skladem a nevytváří skutečné objednávky.</p><button class="button secondary showroom-info-done" data-showroom-close>Zpátky k produktu ${icon('back')}</button>`;
    info._opener=opener;setInfoPanel(panel);
    openDialog('showroom-info-dialog');info.scrollTop=0;info.querySelector('#showroom-info-title').focus({preventScroll:true});
  }

  function setInfoPanel(panel,focus=false) {
    state.panel=panel;
    [...info.querySelectorAll('[data-showroom-info-tab]')].forEach(button=>{
      const active=button.dataset.showroomInfoTab===panel;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;
      info.querySelector(`#showroom-info-panel-${button.dataset.showroomInfoTab}`).hidden=!active;
      if(active&&focus)button.focus({preventScroll:true});
    });
  }

  document.addEventListener('forest:catalog-ready',init);
  document.addEventListener('forest:catalog-error',unavailable);
  if(products.length)init();else setTimeout(unavailable,15000);
})();
