// Shared behaviours across all Mafilika Holdings pages
document.addEventListener('DOMContentLoaded', function(){

  // Nav scroll state
  const nav = document.getElementById('siteNav');
  if(nav){
    window.addEventListener('scroll', ()=>{ nav.classList.toggle('scrolled', window.scrollY > 40); });
  }

  // Mobile burger
  const burger = document.getElementById('burgerBtn');
  if(burger){
    burger.addEventListener('click', ()=>{
      const links = document.querySelector('.nav-links');
      const open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.cssText += 'position:fixed; top:70px; left:0; right:0; background:rgba(7,11,24,.97); flex-direction:column; padding:24px; gap:20px; backdrop-filter:blur(20px);';
    });
  }

  // FAQ accordion (if present on page)
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if(!q || !a) return;
    q.addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o=>{ o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight = null; });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Lead form -> WhatsApp handoff (if a #leadForm exists on the page)
  const leadForm = document.getElementById('leadForm');
  if(leadForm){
    leadForm.addEventListener('submit', function(e){
      e.preventDefault();
      const val = id => { const el = document.getElementById(id); return el ? el.value : ''; };
      const name = val('fname'), company = val('fcompany'), phone = val('fphone'), industry = val('findustry'), message = val('fmessage');
      const text = encodeURIComponent(`Hi Mafilika, I'd like a free strategy session.\nName: ${name}\nCompany: ${company}\nPhone: ${phone}\nIndustry: ${industry}\nGoal: ${message}`);
      window.open(`https://wa.me/27717853990?text=${text}`, '_blank');
    });
  }
});
