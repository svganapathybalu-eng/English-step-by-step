(function(){
"use strict";
/* Easy to change: how the dashboard decides who needs attention */
var INACTIVE_DAYS=3;      /* no lesson finished for this many days = Inactive */
var HELP_BELOW=60;        /* average score under this (after 3+ lessons) = Needs help */
var RELEARN_BELOW=65;     /* batch average under this = suggest re-teaching */

var KEY="trainer-key-v1";
var DAY=86400000;
function $(s){return document.querySelector(s)}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}
function lsGet(k){try{return localStorage.getItem(k)||""}catch(e){return ""}}
function lsSet(k,v){try{if(v)localStorage.setItem(k,v);else localStorage.removeItem(k)}catch(e){}}

var LESSONS=[];ESS.COURSE.forEach(function(m){m.lessons.forEach(function(l){LESSONS.push({no:LESSONS.length+1,title:l.title})})});
var TRACKER_URL=(window.ESS_CONFIG&&ESS_CONFIG.trackerUrl)||"";
var TOTAL=LESSONS.length||44;
var LBYNO={};LESSONS.forEach(function(l){LBYNO[l.no]=l});
var D={scholars:[],lessons:{},missed:[],events:[],gen:0};
var ui={sort:"last",dir:"asc",open:null};

function ago(ms){
  var d=Date.now()-ms;
  if(d<0)d=0;
  if(d<3600000)return Math.max(1,Math.round(d/60000))+" min ago";
  if(d<DAY)return Math.round(d/3600000)+" h ago";
  var days=Math.floor(d/DAY);
  return days===1?"yesterday":days+" days ago";
}
function status(s){
  var days=(Date.now()-s.last)/DAY;
  if(s.done===0)return "new";
  if(s.done>=3&&s.avg<HELP_BELOW)return "help";
  if(days>=INACTIVE_DAYS)return "inactive";
  return "ok";
}
var SLABEL={ok:"On track",help:"Needs help",inactive:"Inactive",new:"Not started"};

function build(events){
  var by={},lesson={},missed={};
  events.forEach(function(e){e.ms=Date.parse(e.t)||0});
  events.sort(function(a,b){return a.ms-b.ms});
  events.forEach(function(e){
    if(!e.id)return;
    var s=by[e.id]||(by[e.id]={id:e.id,name:e.name,batch:e.batch,joined:e.ms,last:e.ms,lessons:{},secs:0,ev:[],att:0,sum:0,spN:0,spSum:0,spSets:{}});
    s.name=e.name;s.batch=e.batch;
    if(e.ms<s.joined)s.joined=e.ms;
    if(e.ms>s.last)s.last=e.ms;
    s.ev.push(e);
    if(e.kind!=="join")s.secs+=Number(e.secs)||0;
    if(e.kind==="speak"){s.spN++;s.spSum+=Number(e.pct)||0;s.spSets[e.lesson]=1}
    if(e.kind==="lesson"){
      var no=Number(e.lessonNo),L=s.lessons[no]||(s.lessons[no]={best:0,tries:0,last:e.ms,missed:[]});
      var pct=Number(e.pct)||0;
      L.best=Math.max(L.best,pct);L.tries++;L.last=e.ms;
      (e.missed||[]).forEach(function(m){L.missed.push(m)});
      s.att++;s.sum+=pct;
      var B=lesson[no]||(lesson[no]={who:{},sum:0,n:0});
      B.who[e.id]=true;B.sum+=pct;B.n++;
    }
    if(e.kind==="lesson"||e.kind==="revise"){
      (e.missed||[]).forEach(function(m){var k=String(m);missed[k]=missed[k]||{text:k,n:0};missed[k].n++});
    }
  });
  var list=Object.keys(by).map(function(id){
    var s=by[id];s.done=Object.keys(s.lessons).length;s.avg=s.att?Math.round(s.sum/s.att):0;s.mins=Math.round(s.secs/60);s.spAvg=s.spN?Math.round(s.spSum/s.spN):0;s.spDone=Object.keys(s.spSets).length;s.st=status(s);return s;
  });
  D.scholars=list;D.lessons=lesson;D.events=events;
  D.missed=Object.keys(missed).map(function(k){return missed[k]}).sort(function(a,b){return b.n-a.n}).slice(0,6);
}

function tiles(){
  var S=D.scholars,week=S.filter(function(s){return Date.now()-s.last<7*DAY&&s.done>0}).length;
  var started=S.filter(function(s){return s.done>0});
  var avg=started.length?Math.round(started.reduce(function(a,s){return a+s.avg},0)/started.length):0;
  var attn=S.filter(function(s){return s.st==="help"||s.st==="inactive"||s.st==="new"}).length;
  var items=[[S.length,"scholars joined"],[week,"studied in the last 7 days"],[attn,"need your attention"],[started.length?avg+"%":"-","average score"]];
  $("#tiles").innerHTML=items.map(function(i){return '<div class="tile"><b>'+esc(i[0])+'</b><span>'+esc(i[1])+'</span></div>'}).join("");
}
function nameList(arr,max){
  var n=arr.slice(0,max||12).map(function(s){return esc(s.name)}).join(", ");
  return n+(arr.length>(max||12)?" and "+(arr.length-(max||12))+" more":"");
}
function todo(){
  var S=D.scholars,out=[];
  var help=S.filter(function(s){return s.st==="help"}).sort(function(a,b){return a.avg-b.avg});
  var idle=S.filter(function(s){return s.st==="inactive"}).sort(function(a,b){return a.last-b.last});
  var nw=S.filter(function(s){return s.st==="new"});
  if(help.length)out.push(['bad',help.length+" scholar"+(help.length>1?"s":"")+" scoring below "+HELP_BELOW+"%",nameList(help.map(function(s){var c=Object.assign({},s);c.name=s.name+" ("+s.avg+"%)";return c})),"Sit with each for 10 minutes. Ask them to redo their lowest lesson and read the Remember box before the questions."]);
  if(idle.length)out.push(['warn',idle.length+" scholar"+(idle.length>1?"s":"")+" not studied for "+INACTIVE_DAYS+" days or more",nameList(idle),"Send a short message today. Ask what is stopping them and give a small target, for example one lesson tonight."]);
  if(nw.length)out.push(['warn',nw.length+" scholar"+(nw.length>1?"s":"")+" signed up but have not finished a lesson",nameList(nw),"Ask them to complete Lesson 1 today. It takes 10 to 15 minutes."]);
  var weak=Object.keys(D.lessons).map(function(no){var B=D.lessons[no];return {no:Number(no),n:Object.keys(B.who).length,avg:Math.round(B.sum/B.n)}})
    .filter(function(x){return x.n>=3&&x.avg<RELEARN_BELOW}).sort(function(a,b){return a.avg-b.avg}).slice(0,3);
  if(weak.length)out.push(['info',"Re-teach in class: "+weak.map(function(w){return (LBYNO[w.no]?LBYNO[w.no].title:"Lesson "+w.no)}).join(", "),weak.map(function(w){return "Lesson "+w.no+": batch average "+w.avg+"% ("+w.n+" scholars)"}).join(" · "),"Spend 10 minutes on these in your next session. Use the examples from the lesson and ask scholars to build the sentences aloud."]);
  if(D.missed.length)out.push(['info',"Questions the batch misses most",D.missed.map(function(m){return esc(m.text)+" ("+m.n+"x)"}).join("<br>"),"Use these as warm-up questions at the start of your next class."]);
  var top=S.filter(function(s){return s.done>=5&&s.avg>=85}).sort(function(a,b){return b.done-a.done}).slice(0,5);
  if(top.length)out.push(['good',"Doing really well",nameList(top),"Praise them in the group. It keeps others motivated."]);
  if(!out.length)out.push(['info',"Nothing urgent right now","Everyone who joined is on track.","Check again after the next class."]);
  $("#todo").innerHTML=out.map(function(a){
    return '<div class="act '+a[0]+'"><h3>'+esc(a[1])+'</h3><p class="names">'+a[2]+'</p><p class="do">'+esc(a[3])+'</p></div>';
  }).join("");
}

function filtered(){
  var q=$("#q").value.trim().toLowerCase(),b=$("#fbatch").value,st=$("#fstatus").value;
  var arr=D.scholars.filter(function(s){return (!q||s.name.toLowerCase().indexOf(q)>-1)&&(!b||s.batch===b)&&(!st||s.st===st)});
  var k=ui.sort,dir=ui.dir==="asc"?1:-1;
  arr.sort(function(x,y){
    var a=x[k],c=y[k];
    if(k==="st"){var o={help:0,inactive:1,new:2,ok:3};a=o[x.st];c=o[y.st]}
    if(typeof a==="string"){return a.localeCompare(c)*dir}
    return (a-c)*dir;
  });
  return arr;
}
var COLS=[["name","Name"],["batch","Batch"],["done","Lessons"],["avg","Avg score"],["last","Last active"],["mins","Minutes"],["spN","Speaking"],["st","Status"]];
function head(){
  $("#thead").innerHTML=COLS.map(function(c){return '<th data-k="'+c[0]+'"'+(ui.sort===c[0]?' aria-sort="'+(ui.dir==="asc"?"ascending":"descending")+'"':'')+'>'+c[1]+'</th>'}).join("");
}
function cellClass(p){return p>=80?"g":p>=60?"a":"r"}
function detail(s){
  var cells="";
  for(var no=1;no<=TOTAL;no++){
    var L=s.lessons[no],t=LBYNO[no]?LBYNO[no].title:"Lesson "+no;
    cells+='<span class="cell '+(L?cellClass(L.best):"")+'" title="'+esc(no+". "+t+(L?" - best "+L.best+"%, "+L.tries+" "+(L.tries===1?"try":"tries"):" - not done"))+'">'+no+'</span>';
  }
  var low=Object.keys(s.lessons).map(function(no){return {no:Number(no),best:s.lessons[no].best,tries:s.lessons[no].tries}}).sort(function(a,b){return a.best-b.best}).slice(0,3).filter(function(x){return x.best<80});
  var miss={};Object.keys(s.lessons).forEach(function(no){s.lessons[no].missed.forEach(function(m){miss[m]=(miss[m]||0)+1})});
  var ml=Object.keys(miss).sort(function(a,b){return miss[b]-miss[a]}).slice(0,6);
  var rec=s.ev.filter(function(e){return e.kind!=="join"}).slice(-6).reverse();
  var sug;
  if(s.st==="new")sug="Ask "+esc(s.name)+" to finish Lesson 1 today.";
  else if(s.st==="inactive")sug="Message "+esc(s.name)+". Last active "+ago(s.last)+". Suggest one lesson tonight.";
  else if(s.st==="help"||low.length)sug="Ask "+esc(s.name)+" to redo "+(low.length?low.map(function(x){return esc((LBYNO[x.no]?LBYNO[x.no].title:"Lesson "+x.no))}).join(", "):"the lowest lessons")+" and read the Remember box first.";
  else if(!s.spN)sug="Lessons are going well, but "+esc(s.name)+" has not tried speaking. Ask for one Speak set today.";
  else if(s.spN&&s.spAvg<60)sug="Speaking is weak ("+s.spAvg+"%). Ask "+esc(s.name)+" to repeat the pronunciation sets and listen before saying.";
  else sug="Doing well. Give "+esc(s.name)+" the next lesson as a target.";
  return '<td colspan="8"><div class="sug"><span class="label">Suggested next step</span>'+sug+'</div><div class="dgrid">'+
    '<div><span class="label">Lessons ('+s.done+' of '+TOTAL+' done)</span><div class="cells">'+cells+'</div><p class="legend">Green 80%+ &middot; Amber 60-79% &middot; Red under 60% &middot; Grey not done</p></div>'+
    '<div><span class="label">Missed most often</span>'+(ml.length?'<ul>'+ml.map(function(m){return '<li>'+esc(m)+(miss[m]>1?' ('+miss[m]+'x)':'')+'</li>'}).join("")+'</ul>':'<p class="note">Nothing recorded yet.</p>')+'</div>'+
    '<div><span class="label">Recent activity</span>'+(rec.length?'<ul>'+rec.map(function(e){return '<li>'+(e.kind==="revise"?"Revision":e.kind==="speak"?esc(e.lesson):"Lesson "+e.lessonNo+" "+esc(e.lesson))+' &middot; '+esc(e.pct)+'% &middot; '+ago(e.ms)+'</li>'}).join("")+'</ul>':'<p class="note">No lessons yet.</p>')+'</div>'+
    '</div></td>';
}
function table(){
  var arr=filtered();head();
  var html="";
  arr.forEach(function(s){
    html+='<tr class="srow" tabindex="0" data-id="'+esc(s.id)+'"><td>'+esc(s.name)+'</td><td>'+esc(s.batch)+'</td><td class="num">'+s.done+' / '+TOTAL+'<span class="mini"><i style="width:'+Math.round(100*s.done/TOTAL)+'%"></i></span></td><td class="num">'+(s.att?s.avg+"%":"-")+'</td><td class="num">'+(s.done||s.ev.length?ago(s.last):"-")+'</td><td class="num">'+s.mins+'</td><td class="num">'+(s.spN?s.spDone+" sets &middot; "+s.spAvg+"%":"-")+'</td><td><span class="chip '+s.st+'">'+SLABEL[s.st]+'</span></td></tr>';
    if(ui.open===s.id)html+='<tr class="det">'+detail(s)+'</tr>';
  });
  $("#tbody").innerHTML=html||'<tr><td colspan="8" class="note">No scholars match.</td></tr>';
}
function lessonTable(){
  var rows="",n=D.scholars.length;
  for(var no=1;no<=TOTAL;no++){
    var B=D.lessons[no],t=LBYNO[no]?LBYNO[no].title:"Lesson "+no;
    var cnt=B?Object.keys(B.who).length:0,avg=B?Math.round(B.sum/B.n):null;
    var sig="",cls="";
    if(!B){sig="Nobody yet";cls="new"}
    else if(cnt>=3&&avg<RELEARN_BELOW){sig="Re-teach";cls="help"}
    else if(avg<80){sig="Watch";cls="inactive"}
    else{sig="Strong";cls="ok"}
    rows+='<tr><td>'+no+'. '+esc(t)+'</td><td class="num">'+cnt+' / '+n+'</td><td class="num">'+(avg==null?"-":avg+"%")+'</td><td><span class="chip '+cls+'">'+sig+'</span></td></tr>';
  }
  $("#lbody").innerHTML=rows;
}
function batches(){
  var cur=$("#fbatch").value,set={};D.scholars.forEach(function(s){set[s.batch]=1});
  var opts='<option value="">All batches</option>'+Object.keys(set).sort().map(function(b){return '<option value="'+esc(b)+'">'+esc(b)+'</option>'}).join("");
  $("#fbatch").innerHTML=opts;$("#fbatch").value=set[cur]?cur:"";
}
function render(){
  tiles();todo();batches();table();lessonTable();
  $("#updated").textContent="Updated "+new Date(D.gen).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
}

function load(key,showErr){
  var url=TRACKER_URL;
  if(!/^https:\/\/script\.google\.com\//.test(url)){showErr("The page does not have your web app URL yet. Put it in config.js (see SETUP.md).");return}
  $("#open").disabled=true;$("#refresh").disabled=true;
  fetch(url+(url.indexOf("?")>-1?"&":"?")+"key="+encodeURIComponent(key))
    .then(function(r){return r.json()})
    .then(function(j){
      $("#open").disabled=false;$("#refresh").disabled=false;
      if(!j.ok){showErr(j.error==="wrong key"?"That secret word is not correct.":"The script said: "+j.error);lsSet(KEY,"");return}
      lsSet(KEY,key);
      D.gen=Date.now();build(j.events||[]);
      $("#gate").hidden=true;$("#board").hidden=false;$("#tools").hidden=false;
      render();
    })
    .catch(function(){$("#open").disabled=false;$("#refresh").disabled=false;showErr("Could not reach your script. Check the internet and the web app URL, and that access is set to Anyone.")});
}
function gateErr(m){$("#gateerr").textContent=m;if($("#gate").hidden)alert_(m)}
function alert_(m){$("#updated").textContent=m}

$("#open").addEventListener("click",function(){var k=$("#key").value.trim();if(!k){gateErr("Type your secret word.");return}$("#gateerr").textContent="";load(k,gateErr)});
$("#key").addEventListener("keydown",function(e){if(e.key==="Enter")$("#open").click()});
$("#refresh").addEventListener("click",function(){load(lsGet(KEY),gateErr)});
$("#lock").addEventListener("click",function(){lsSet(KEY,"");location.reload()});
$("#q").addEventListener("input",table);$("#fbatch").addEventListener("change",table);$("#fstatus").addEventListener("change",table);
$("#thead").addEventListener("click",function(e){
  var th=e.target.closest("th");if(!th)return;var k=th.getAttribute("data-k");
  if(ui.sort===k)ui.dir=ui.dir==="asc"?"desc":"asc";else{ui.sort=k;ui.dir=(k==="name"||k==="batch"||k==="last"||k==="st")?"asc":"desc"}
  table();
});
function toggle(row){var id=row.getAttribute("data-id");ui.open=ui.open===id?null:id;table()}
$("#tbody").addEventListener("click",function(e){var r=e.target.closest(".srow");if(r)toggle(r)});
$("#tbody").addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){var r=e.target.closest(".srow");if(r){e.preventDefault();toggle(r)}}});
$("#csv").addEventListener("click",function(){
  function q(v){v=String(v==null?"":v);if(/^[=+\-@]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"'}
  var lines=[["Name","Batch","Lessons done","Total lessons","Average score %","Minutes studied","Speaking sets","Speaking avg %","Last active","Status"].map(q).join(",")];
  D.scholars.forEach(function(s){lines.push([s.name,s.batch,s.done,TOTAL,s.avg,s.mins,s.spDone,s.spN?s.spAvg:"",new Date(s.last).toISOString(),SLABEL[s.st]].map(q).join(","))});
  var blob=new Blob([lines.join("\n")],{type:"text/csv"}),a=document.createElement("a");
  a.href=URL.createObjectURL(blob);a.download="scholar-progress.csv";document.body.appendChild(a);a.click();a.remove();
});

var saved=lsGet(KEY);
if(saved){$("#key").value=saved;load(saved,gateErr)}
})();
