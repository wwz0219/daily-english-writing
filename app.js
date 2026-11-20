const prompts = [
  { title: "A small thing that made me smile", hint: "Write about a small moment from this week that lifted your mood. What happened, and why did it stay with you?" },
  { title: "Somewhere I feel at home", hint: "Describe a place where you feel comfortable. What can you see, hear, or smell there?" },
  { title: "A skill I'd love to learn", hint: "What would you like to learn, and what first step could you take this week?" },
  { title: "A meal I still remember", hint: "Describe a memorable meal. Who were you with, and what made it special?" },
  { title: "My perfect slow morning", hint: "Imagine a peaceful morning with no rush. How would you spend the first few hours?" },
  { title: "Someone who taught me something", hint: "Write about a person who taught you a useful lesson. What did you learn from them?" },
  { title: "One thing I want to make time for", hint: "What would you like to do more often? Why does it matter to you?" },
  { title: "A little adventure nearby", hint: "Plan a small local adventure. Where would you go, and what would you hope to discover?" }
];
const $ = (id) => document.getElementById(id);
const storageKey = "daily-draft-v1";
let state = loadState();
let promptIndex = new Date().getDate() % prompts.length;
function loadState(){try{return JSON.parse(localStorage.getItem(storageKey))||{draft:"",days:[]}}catch{return{draft:"",days:[]}}}
function saveState(){localStorage.setItem(storageKey,JSON.stringify(state))}
function todayKey(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function renderPrompt(){const p=prompts[promptIndex];$("prompt-title").textContent=p.title;$("prompt-hint").textContent=p.hint}
function renderDate(){const d=new Date();$("today-date").textContent=new Intl.DateTimeFormat("en-US",{weekday:"long",month:"short",day:"numeric"}).format(d).toUpperCase()}
function wordCount(text){return text.trim()?text.trim().split(/\s+/).filter(Boolean).length:0}
function renderCount(){const n=wordCount($("essay").value);$("word-count").textContent=`${n} ${n===1?"word":"words"}`}
function renderWeek(){const host=$("week-days"),days=["M","T","W","T","F","S","S"],now=new Date(),dow=(now.getDay()+6)%7,start=new Date(now);start.setDate(now.getDate()-dow);host.innerHTML="";days.forEach((name,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;const el=document.createElement("div");el.className="day"+(state.days.includes(key)?" done":"")+(key===todayKey()?" today":"");el.innerHTML=`<span class="day-mark">${state.days.includes(key)?"✓":"·"}</span><span>${name}</span>`;host.append(el)})}
function renderStreak(){let count=0,d=new Date();if(!state.days.includes(todayKey()))d.setDate(d.getDate()-1);while(state.days.includes(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`)){count++;d.setDate(d.getDate()-1)}$("streak-count").textContent=count}
let toastTimer;function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2400)}
function finish(){if(!$("essay").value.trim()){toast("Write a few sentences first — every start counts.");$("essay").focus();return}if(!state.days.includes(todayKey()))state.days.push(todayKey());saveState();renderWeek();renderStreak();toast("Today's writing is saved. Nice work!")}
$("essay").value=state.draft||"";renderPrompt();renderDate();renderCount();renderWeek();renderStreak();
$("essay").addEventListener("input",()=>{state.draft=$("essay").value;saveState();renderCount()});
$("new-prompt").addEventListener("click",()=>{promptIndex=(promptIndex+1+Math.floor(Math.random()*(prompts.length-1)))%prompts.length;renderPrompt()});
$("finish-writing").addEventListener("click",finish);
$("clear-draft").addEventListener("click",()=>{if(!$("essay").value)return;$("essay").value="";state.draft="";saveState();renderCount();toast("Draft cleared.")});
$("copy-for-chat").addEventListener("click",async()=>{const essay=$("essay").value.trim();if(!essay){toast("Write a few sentences first, then send them for feedback.");$("essay").focus();return}const content=`Please review my English composition. Correct grammar, vocabulary, sentence structure, and flow. Show me a polished version, explain the most important changes, and give me 2–3 specific practice suggestions based on my recurring mistakes.\n\nPrompt: ${$("prompt-title").textContent}\n\n${essay}`;try{await navigator.clipboard.writeText(content);toast("Copied! Paste it into our chat for feedback.")}catch{const field=document.createElement("textarea");field.value=content;document.body.append(field);field.select();document.execCommand("copy");field.remove();toast("Copied! Paste it into our chat for feedback.")}});
