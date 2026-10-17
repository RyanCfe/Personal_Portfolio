    (() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)');
      const canvas = document.querySelector('#stars');
      const ctx = canvas.getContext('2d');
      const hero = document.querySelector('.hero');
      let stars = [], raf = 0, dpr = 1, visible = true, lastDraw = 0;
      function resizeStars() {
        stopStars();
        dpr = Math.min(devicePixelRatio || 1, innerWidth < 620 ? 1 : 1.5);
        const rect = canvas.getBoundingClientRect();
        canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        stars = Array.from({length: Math.min(100, Math.floor(rect.width / 12))}, () => ({x:Math.random()*rect.width,y:Math.random()*rect.height*.67,r:Math.random()*1.3+.25,phase:Math.random()*7}));
        drawStars(0);
        startStars();
      }
      function drawStars(t) {
        const w = canvas.width / dpr, h = canvas.height / dpr;
        ctx.clearRect(0,0,w,h);
        stars.forEach(s => { ctx.globalAlpha = reduced.matches ? .7 : .35 + .55 * (Math.sin(t*.0015+s.phase)**2); ctx.fillStyle='#fff0d9'; ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill(); });
        ctx.globalAlpha=1;
      }
      function stopStars() { if (raf) cancelAnimationFrame(raf); raf=0; }
      function starFrame(t) {
        if (!visible || document.hidden || reduced.matches) { raf=0; return; }
        if (t-lastDraw >= 42) { drawStars(t); lastDraw=t; }
        raf=requestAnimationFrame(starFrame);
      }
      function startStars() {
        if (raf || !visible || document.hidden || reduced.matches || innerWidth < 620) return;
        lastDraw=0;
        raf=requestAnimationFrame(starFrame);
      }
      let resizeTimer;
      addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer=setTimeout(resizeStars, 180); }, {passive:true}); resizeStars();
      if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {
        visible=entry.isIntersecting;
        hero.classList.toggle('is-offscreen', !visible);
        if (visible) startStars(); else stopStars();
      }).observe(hero);
      document.addEventListener('visibilitychange', () => { if (document.hidden) stopStars(); else startStars(); });
      reduced.addEventListener?.('change', () => { stopStars(); drawStars(0); startStars(); });

      const scene = document.querySelector('#world'), walker = document.querySelector('#character'), hint = document.querySelector('#world-hint');
      const stops = [
        {id:'archive', x:16, title:'The archive', note:'Projects and data, with all the messy parts in between.', target:'projects.html'},
        {id:'systems', x:39, title:'Systems lab', note:'The tools I use and the layers I’m learning.', target:'#about'},
        {id:'stories', x:61, title:'After hours', note:'Andor, Haikyu!!, Interstellar, and everything that stayed.', target:'#stories'},
        {id:'contact', x:83, title:'The lookout', note:'Send a question, an idea, or a film recommendation.', target:'#contact'}
      ];
      let walkerX=46, walkingTimer;
      function setWalker(x) { walkerX=Math.max(8,Math.min(91,x)); scene.style.setProperty('--walker',walkerX+'%'); walker.classList.add('walking'); clearTimeout(walkingTimer); walkingTimer=setTimeout(()=>walker.classList.remove('walking'),350); }
      function showStop(stop) { hint.innerHTML='<p class="eyebrow">You found a stop</p><strong>'+stop.title+'</strong><p>'+stop.note+'</p>'; document.querySelector('#radio-label').textContent='RADIO / '+stop.title.toUpperCase(); document.querySelector('#radio-message').textContent=stop.note; }
      function visit(stop) { setWalker(stop.x); showStop(stop); if(stop.target.startsWith('#')) document.querySelector(stop.target)?.scrollIntoView({behavior:reduced.matches?'instant':'smooth'}); else location.href=stop.target; }
      document.querySelectorAll('.stop').forEach(el => {
        const stop=stops.find(s=>s.id===el.dataset.stop);
        el.addEventListener('click',()=>visit(stop));
        el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();visit(stop)}});
        el.addEventListener('pointerenter',()=>showStop(stop));
        el.addEventListener('focus',()=>showStop(stop));
      });
      scene.addEventListener('keydown',e=>{
        if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();setWalker(walkerX+(e.key==='ArrowRight'?7:-7));showStop(stops.reduce((a,b)=>Math.abs(b.x-walkerX)<Math.abs(a.x-walkerX)?b:a));}
        if(e.key==='Enter'&&e.target===scene){e.preventDefault();visit(stops.reduce((a,b)=>Math.abs(b.x-walkerX)<Math.abs(a.x-walkerX)?b:a));}
      });
      let pointerDown=false;
      scene.addEventListener('pointerdown',e=>{ if(e.target.closest?.('.stop'))return; pointerDown=true; });
      scene.addEventListener('pointermove',e=>{ if(!pointerDown)return; const r=scene.getBoundingClientRect(); setWalker((e.clientX-r.left)/r.width*100); });
      addEventListener('pointerup',()=>pointerDown=false);
      hero.addEventListener('pointermove',e=>{if(reduced.matches||innerWidth<620)return;scene.style.setProperty('--scene-shift',((e.clientX/innerWidth)-.5)*-5+'px')},{passive:true});

      const toggle=document.querySelector('#sky-toggle');
      toggle.addEventListener('click',()=>{let dawn=document.body.classList.toggle('dawn');toggle.setAttribute('aria-pressed',String(dawn));toggle.textContent=dawn?'☀  Night mode':'☾  Dawn mode';});
      let queued=false; addEventListener('scroll',()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{let max=document.documentElement.scrollHeight-innerHeight;document.querySelector('#progress').style.transform='scaleX('+(max>0?scrollY/max:0)+')';queued=false})},{passive:true});
    })();
