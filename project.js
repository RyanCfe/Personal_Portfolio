(() => {
  const demos = {
    dayline: { title:'Dayline', kind:'App / Weekly planner', description:'A simple place to put the tasks that are floating around in my head. Add one, give it a day, and cross it off when it is done.', note:'Tasks stay in this browser using local storage. No account or server.', explain:'Tasks are stored as a small list of objects. Adding, completing and removing one updates both the list and the count. Local storage brings the list back on the next visit.', stack:'HTML · CSS · JavaScript · localStorage', start:dayline },
    framebook: { title:'Framebook', kind:'App / Watchlist', description:'A tiny watchlist with a rating and a note. The point is remembering what a film or show felt like, not only whether I watched it.', note:'Your entries stay in this browser using local storage.', explain:'Each entry has a title, format, rating and short note. The page builds the list from saved entries and lets you remove them without an account.', stack:'HTML · CSS · JavaScript · localStorage', start:framebook },
    cityflow: { title:'CityFlow', kind:'Data / Scenario explorer', description:'A fictional commuter route, a few sliders, and a question: at what point does demand start to outrun capacity?', note:'The data is simulated for this browser demo. It is not a real Mumbai route or a forecast.', explain:'A daily demand pattern is scaled by the slider. The chart compares each time slot with the chosen capacity and counts the slots above it.', stack:'JavaScript · SVG · simulated data', start:cityflow },
    spendscope: { title:'SpendScope', kind:'Data / CSV explorer', description:'Paste a short transaction list and get a category breakdown. It makes a table much easier to read at a glance.', note:'Data is processed in your browser and is not uploaded. Use the sample or paste your own CSV.', explain:'The parser checks the category and amount columns, groups transactions by category, and calculates totals. It handles simple CSV; quoted commas inside fields are not supported.', stack:'JavaScript · CSV parsing · data aggregation', start:spendscope },
    clusterlab: { title:'Cluster Lab', kind:'ML / K-means playground', description:'Place points on a board, choose how many groups you want, then watch the centroids move toward them.', note:'A real k-means step runs in your browser. The sample points are generated for this demo.', explain:'Each step assigns points to the nearest centroid, then moves each centroid to the average of its assigned points. Different starting positions can lead to different groups.', stack:'JavaScript · SVG · k-means', start:clusterlab },
    neighborlab: { title:'Neighbor Lab', kind:'ML / KNN playground', description:'Move a new point around the board and see which labelled examples are closest. Change k to see when the vote changes.', note:'A real Euclidean-distance nearest-neighbour vote runs in your browser. The points are sample data.', explain:'The page measures distance to each labelled point and takes the nearest k. Their labels vote on the new point; if the vote ties, the closest neighbour wins.', stack:'JavaScript · SVG · k-nearest neighbours', start:neighborlab }
  };
  const slug = new URLSearchParams(location.search).get('demo');
  const demo = demos[slug];
  const $ = (selector, root=document) => root.querySelector(selector);
  const surface = $('#demo-surface');
  if (!demo) {
    document.title = 'Project not found / Ryan N.';
    $('#detail-title').textContent = 'Wrong turn.';
    $('#detail-description').textContent = 'That project is not in the archive.';
    $('#detail-note').textContent = '';
    $('#demo-explain').textContent = '';
    $('#demo-stack').textContent = '';
    surface.innerHTML = '<p>Head back to the project list and choose another door.</p><a class="demo-button" href="projects.html">All projects ↗</a>';
    return;
  }
  document.title = `${demo.title} / Ryan N.`;
  $('#detail-kind').textContent = demo.kind;
  $('#detail-title').textContent = demo.title;
  $('#detail-description').textContent = demo.description;
  $('#detail-note').textContent = demo.note;
  $('#demo-explain').textContent = demo.explain;
  $('#demo-stack').textContent = demo.stack;
  demo.start();

  function readSaved(key, fallback) {
    try { const data = JSON.parse(localStorage.getItem(key)); return Array.isArray(data) ? data : fallback; }
    catch { return fallback; }
  }
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
  function element(tag, text, className='') {
    const node=document.createElement(tag); node.textContent=text;
    if(className) node.className=className;
    return node;
  }
  function dayline() {
    surface.innerHTML = '<h2>This week</h2><form class="demo-toolbar" id="task-form"><label>What needs doing?<input name="task" maxlength="90" required placeholder="Write one task"></label><label>Day<select name="day"><option>Today</option><option>Tomorrow</option><option>Later this week</option></select></label><button>Add task</button><button type="button" class="secondary" id="clear-done">Clear completed</button></form><div class="demo-feedback" id="task-count" role="status"></div><ul class="task-list" id="task-list"></ul>';
    let tasks=readSaved('ryan-dayline-v1',[]);
    const list=$('#task-list');
    function render() {
      list.replaceChildren();
      $('#task-count').textContent=`${tasks.filter(t=>!t.done).length} left to do · ${tasks.filter(t=>t.done).length} completed`;
      if(!tasks.length) list.append(element('li','Nothing here yet. Add a task to start.'));
      tasks.forEach(task=>{
        const li=element('li','',`task-item${task.done?' done':''}`), details=element('div','');
        details.append(element('strong',task.title),element('small',task.day));
        const actions=element('div',''), toggle=element('button',task.done?'Undo':'Done'), remove=element('button','Remove');
        toggle.type=remove.type='button'; toggle.setAttribute('aria-label',`${task.done?'Undo':'Complete'} ${task.title}`); remove.setAttribute('aria-label',`Remove ${task.title}`);
        toggle.addEventListener('click',()=>{task.done=!task.done;save('ryan-dayline-v1',tasks);render()});
        remove.addEventListener('click',()=>{tasks=tasks.filter(t=>t.id!==task.id);save('ryan-dayline-v1',tasks);render()});
        actions.append(toggle,remove);li.append(details,actions);list.append(li);
      });
    }
    $('#task-form').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;const title=form.elements.task.value.trim();if(!title)return;tasks.unshift({id:Date.now()+Math.random(),title,day:form.elements.day.value,done:false});save('ryan-dayline-v1',tasks);form.reset();render()});
    $('#clear-done').addEventListener('click',()=>{tasks=tasks.filter(t=>!t.done);save('ryan-dayline-v1',tasks);render()});render();
  }
  function framebook() {
    surface.innerHTML='<h2>The watchlist</h2><form class="demo-toolbar" id="film-form"><label>Title<input name="title" maxlength="80" required placeholder="Film or series"></label><label>Format<select name="format"><option>Film</option><option>Series</option></select></label><label>Rating<select name="rating"><option value="5">5 / 5</option><option value="4">4 / 5</option><option value="3">3 / 5</option><option value="2">2 / 5</option><option value="1">1 / 5</option></select></label><label>One thought<input name="note" maxlength="140" placeholder="What stayed with you?"></label><button>Save entry</button></form><div class="demo-feedback" id="film-count" role="status"></div><ul class="film-list" id="film-list"></ul>';
    let films=readSaved('ryan-framebook-v1',[]);const list=$('#film-list');
    function render(){list.replaceChildren();$('#film-count').textContent=`${films.length} ${films.length===1?'entry':'entries'} saved on this device`;
      if(!films.length)list.append(element('li','Your shelf is empty. Add the first title.'));
      films.forEach(f=>{const li=element('li','','film-item'),details=element('div','');details.append(element('strong',f.title),element('small',`${f.format} · ${'★'.repeat(f.rating)}${'☆'.repeat(5-f.rating)}${f.note?' · '+f.note:''}`));const remove=element('button','Remove');remove.type='button';remove.setAttribute('aria-label',`Remove ${f.title}`);remove.addEventListener('click',()=>{films=films.filter(x=>x.id!==f.id);save('ryan-framebook-v1',films);render()});li.append(details,remove);list.append(li)});
    }
    $('#film-form').addEventListener('submit',event=>{event.preventDefault();const f=event.currentTarget;const title=f.elements.title.value.trim();if(!title)return;films.unshift({id:Date.now()+Math.random(),title,format:f.elements.format.value,rating:Number(f.elements.rating.value),note:f.elements.note.value.trim()});save('ryan-framebook-v1',films);f.reset();render()});render();
  }
  function cityflow() {
    surface.innerHTML='<h2>Route pressure</h2><div class="demo-toolbar"><label>Average demand <strong id="demand-value"></strong><input id="demand" type="range" min="80" max="280" value="160"></label><label>Capacity per slot <strong id="capacity-value"></strong><input id="capacity" type="range" min="100" max="300" value="180"></label></div><div class="metric-row"><div class="metric"><strong id="peak"></strong><span>Peak demand</span></div><div class="metric"><strong id="pressure"></strong><span>Slots over capacity</span></div><div class="metric"><strong id="total"></strong><span>Passengers across day</span></div></div><svg class="chart" id="flow-chart" viewBox="0 0 720 300" role="img" aria-label="Simulated hourly demand compared with route capacity"></svg><p class="demo-feedback" id="flow-description" role="status"></p>';
    const shape=[.38,.52,1.15,1.4,.9,.7,1.2,1.35,.65],hours=['06','08','09','11','13','15','17','18','21'];
    function render(){const demand=Number($('#demand').value),capacity=Number($('#capacity').value),values=shape.map(n=>Math.round(n*demand)),max=Math.max(400,...values,capacity),over=values.filter(v=>v>capacity).length;
      $('#demand-value').textContent=demand;$('#capacity-value').textContent=capacity;$('#peak').textContent=Math.max(...values);$('#pressure').textContent=`${over} / 9`;$('#total').textContent=values.reduce((a,b)=>a+b,0).toLocaleString();
      const y=n=>250-n/max*205, bars=values.map((v,i)=>`<rect class="bar" x="${45+i*72}" y="${y(v)}" width="38" height="${250-y(v)}"/><text x="${46+i*72}" y="271">${hours[i]}h</text>`).join('');
      $('#flow-chart').innerHTML=`<path class="grid" d="M25 250H700M25 150H700M25 50H700"/>${bars}<path d="M25 ${y(capacity)}H700" stroke="#a9dfcf" stroke-width="3" stroke-dasharray="7 6"/><text x="520" y="${Math.max(22,y(capacity)-8)}">Capacity: ${capacity}</text>`;
      $('#flow-description').textContent=`Peak at ${hours[values.indexOf(Math.max(...values))]}h. ${over} of 9 time slots exceed the chosen capacity.`;
    }
    $('#demand').addEventListener('input',render);$('#capacity').addEventListener('input',render);render();
  }
  function spendscope() {
    surface.innerHTML='<h2>Where did it go?</h2><label for="csv-input">Paste CSV with category,amount columns</label><textarea class="csv-box" id="csv-input" spellcheck="false">category,amount\nFood,240\nTravel,80\nBooks,350\nFood,180\nGames,400\nTravel,120\nBooks,220</textarea><div class="demo-toolbar" style="margin-top:.7rem"><button id="analyse">Analyse data</button><button class="secondary" id="sample">Restore sample</button></div><p class="demo-feedback" id="csv-error" role="status"></p><div class="metric-row" id="spend-metrics"></div><div class="breakdown" id="breakdown"></div>';
    const sample=$('#csv-input').value;
    function render(){const lines=$('#csv-input').value.trim().split(/\r?\n/).map(line=>line.trim()).filter(Boolean);const error=$('#csv-error'),breakdown=$('#breakdown'),metrics=$('#spend-metrics');breakdown.replaceChildren();metrics.replaceChildren();
      if(lines.length<2||lines[0].toLowerCase().replace(/\s/g,'')!=='category,amount'){error.textContent='First line must be category,amount, followed by at least one row.';return}
      const rows=[];for(const line of lines.slice(1)){const parts=line.split(',');const amount=Number(parts[1]?.trim());if(parts.length!==2||!parts[0].trim()||!Number.isFinite(amount)||amount<0){error.textContent=`Check this row: ${line.slice(0,80)}`;return}rows.push({category:parts[0].trim(),amount})}
      error.textContent=`${rows.length} rows analysed in your browser.`;const totals=new Map();rows.forEach(r=>totals.set(r.category,(totals.get(r.category)||0)+r.amount));const sorted=[...totals].sort((a,b)=>b[1]-a[1]);const total=rows.reduce((n,r)=>n+r.amount,0),largest=sorted[0];
      for(const [number,label] of [[total.toLocaleString(),'Total'],[rows.length,'Transactions'],[largest?.[0]||'—','Largest category']]){const div=element('div','','metric');div.append(element('strong',String(number)),element('span',label));metrics.append(div)}
      sorted.forEach(([category,value])=>{const item=element('div','','breakdown-item'),track=element('div','','breakdown-track'),fill=element('i','');fill.style.width=`${total?value/total*100:0}%`;track.append(fill);item.append(element('span',category),track,element('strong',value.toLocaleString()));breakdown.append(item)});
    }
    $('#analyse').addEventListener('click',render);$('#sample').addEventListener('click',()=>{$('#csv-input').value=sample;render()});render();
  }
  function clusterlab() {
    surface.innerHTML='<h2>Find the groups</h2><div class="demo-toolbar"><label>Clusters: <strong id="k-value">3</strong><input id="k" type="range" min="2" max="5" value="3"></label><button id="step">Run one step</button><button class="secondary" id="run-all">Run to settle</button><button class="secondary" id="reset">Reset points</button></div><svg class="plot" id="cluster-plot" viewBox="0 0 600 380" role="img" aria-label="Interactive scatter plot of points and k-means centroids"></svg><div class="demo-legend" id="cluster-legend"></div><p class="demo-feedback" id="cluster-status" role="status"></p>';
    const colors=['#f4bf80','#9fd9cc','#ef9faa','#c7b1ed','#dce48d'];let points=[],centroids=[],iteration=0;
    const plot=$('#cluster-plot');
    function seed(){const centers=[[125,100],[440,115],[280,285]];points=[];centers.forEach(([cx,cy],g)=>{for(let i=0;i<6;i++){const angle=(i*2.4+g)*1.7;points.push({x:cx+Math.cos(angle)*(20+i*7),y:cy+Math.sin(angle)*(18+i*6),group:-1})}});resetCenters()}
    function resetCenters(){iteration=0;const k=Number($('#k').value);centroids=Array.from({length:k},(_,i)=>({x:90+i*410/Math.max(1,k-1),y:180}));points.forEach(p=>p.group=-1);render()}
    function step(){points.forEach(p=>{let best=0,dist=Infinity;centroids.forEach((c,i)=>{const d=(p.x-c.x)**2+(p.y-c.y)**2;if(d<dist){dist=d;best=i}});p.group=best});centroids=centroids.map((c,i)=>{const group=points.filter(p=>p.group===i);return group.length?{x:group.reduce((n,p)=>n+p.x,0)/group.length,y:group.reduce((n,p)=>n+p.y,0)/group.length}:c});iteration++;render()}
    function render(){const ns='http://www.w3.org/2000/svg';plot.replaceChildren();function svg(tag,attrs){const n=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([key,value])=>n.setAttribute(key,String(value)));plot.append(n)}
      svg('path',{d:'M0 190H600M300 0V380',class:'axis'});points.forEach(p=>svg('circle',{cx:p.x,cy:p.y,r:6,fill:p.group<0?'#e6e0cc':colors[p.group]}));centroids.forEach((c,i)=>{svg('path',{d:`M${c.x-11} ${c.y-11}L${c.x+11} ${c.y+11}M${c.x+11} ${c.y-11}L${c.x-11} ${c.y+11}`,class:'centroid',stroke:colors[i]})});
      $('#k-value').textContent=centroids.length;$('#cluster-status').textContent=`${points.length} points · ${iteration} ${iteration===1?'step':'steps'} run. Click the plot to add a point.`;
      $('#cluster-legend').innerHTML=centroids.map((_,i)=>`<span><i style="background:${colors[i]}"></i>Group ${i+1}</span>`).join('');
    }
    plot.addEventListener('click',event=>{const r=plot.getBoundingClientRect();points.push({x:(event.clientX-r.left)/r.width*600,y:(event.clientY-r.top)/r.height*380,group:-1});render()});
    $('#k').addEventListener('input',resetCenters);$('#step').addEventListener('click',step);$('#run-all').addEventListener('click',()=>{for(let i=0;i<12;i++)step()});$('#reset').addEventListener('click',seed);seed();
  }
  function neighborlab() {
    surface.innerHTML='<h2>Who is nearest?</h2><div class="demo-toolbar"><label>Neighbours: <strong id="neighbor-k">3</strong><input id="neighbor-range" type="range" min="1" max="9" step="2" value="3"></label><button class="secondary" id="neighbor-reset">Reset new point</button></div><svg class="plot" id="neighbor-plot" viewBox="0 0 600 380" role="img" aria-label="Interactive KNN classification plot"></svg><div class="demo-legend"><span><i style="background:#f4bf80"></i>Amber</span><span><i style="background:#9fd9cc"></i>Mint</span><span>◆ New point</span></div><p class="demo-feedback" id="neighbor-status" role="status"></p>';
    const training=[{x:100,y:75,c:0},{x:150,y:130,c:0},{x:85,y:220,c:0},{x:220,y:80,c:0},{x:185,y:260,c:0},{x:245,y:180,c:0},{x:345,y:70,c:1},{x:420,y:95,c:1},{x:505,y:170,c:1},{x:385,y:205,c:1},{x:480,y:275,c:1},{x:315,y:300,c:1}],colors=['#f4bf80','#9fd9cc'];let query={x:300,y:185};const plot=$('#neighbor-plot');
    function render(){const k=Number($('#neighbor-range').value),near=training.map(p=>({...p,d:(p.x-query.x)**2+(p.y-query.y)**2})).sort((a,b)=>a.d-b.d).slice(0,k),votes=[near.filter(p=>p.c===0).length,near.filter(p=>p.c===1).length],winner=votes[0]===votes[1]?near[0].c:(votes[0]>votes[1]?0:1),ns='http://www.w3.org/2000/svg';plot.replaceChildren();
      function svg(tag,attrs){const n=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([key,value])=>n.setAttribute(key,String(value)));plot.append(n)}
      svg('path',{d:'M0 190H600M300 0V380',class:'axis'});near.forEach(p=>svg('path',{d:`M${query.x} ${query.y}L${p.x} ${p.y}`,stroke:'#f8e9bb66','stroke-width':2}));training.forEach(p=>svg('circle',{cx:p.x,cy:p.y,r:8,fill:colors[p.c]}));svg('path',{d:`M${query.x} ${query.y-15}L${query.x+15} ${query.y}L${query.x} ${query.y+15}L${query.x-15} ${query.y}Z`,fill:colors[winner],stroke:'#fff7e6','stroke-width':3});
      $('#neighbor-k').textContent=k;$('#neighbor-status').textContent=`Predicted: ${winner?'Mint':'Amber'} · ${votes[0]} Amber, ${votes[1]} Mint among the ${k} nearest. Click the plot to move the diamond.`;
    }
    plot.addEventListener('click',event=>{const r=plot.getBoundingClientRect();query={x:(event.clientX-r.left)/r.width*600,y:(event.clientY-r.top)/r.height*380};render()});$('#neighbor-range').addEventListener('input',render);$('#neighbor-reset').addEventListener('click',()=>{query={x:300,y:185};render()});render();
  }
})();
