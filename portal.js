const views = document.querySelectorAll('.view');
const navButtons = document.querySelectorAll('#portal-nav button');
const pageTitle = document.querySelector('#page-title');
const sidebar = document.querySelector('.sidebar');
const bookingDialog = document.querySelector('#booking-dialog');
const bookingForm = document.querySelector('#booking-form');
const toast = document.querySelector('#toast');

const titles = {overview:'早上好，林老师',booking:'预约上课',schedule:'我的课表',progress:'课程进度追踪',materials:'教材资源库',review:'课后复习'};
const bookings = [
  {date:'09/04',name:'七年级 A 班',detail:'09:30 · 数学思维 · 教室 3A'},
  {date:'09/05',name:'数学竞赛小组',detail:'14:30 · 专题研习 · 创新实验室'}
];
const materials = [
  {type:'课件',title:'平面几何初步 · 第 3 单元',meta:'PPTX · 12.4 MB',owner:'数学教研组'},
  {type:'教案',title:'相交线与平行线教学设计',meta:'PDF · 2.8 MB',owner:'林沐'},
  {type:'练习',title:'几何基础分层练习 A/B 卷',meta:'DOCX · 1.6 MB',owner:'课程中心'},
  {type:'课件',title:'组合计数专题精讲',meta:'PPTX · 8.2 MB',owner:'竞赛教研组'},
  {type:'练习',title:'期中知识点自测清单',meta:'PDF · 3.1 MB',owner:'七年级组'},
  {type:'教案',title:'图形运动项目式学习方案',meta:'PDF · 4.7 MB',owner:'王岚'}
];
const tasks = [
  {title:'平面几何基础巩固',detail:'七年级 A 班 · 截止 09 月 06 日',done:'31/36'},
  {title:'错题回顾：相交线与平行线',detail:'七年级 B 班 · 截止 09 月 07 日',done:'28/34'},
  {title:'组合计数专题练习',detail:'数学竞赛小组 · 截止 09 月 08 日',done:'9/12'}
];

function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('show'),2400)}
function switchView(name){views.forEach(v=>v.classList.toggle('active',v.id===`${name}-view`));navButtons.forEach(b=>b.classList.toggle('active',b.dataset.view===name));pageTitle.textContent=titles[name];sidebar.classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
navButtons.forEach(button=>button.addEventListener('click',()=>switchView(button.dataset.view)));
document.querySelectorAll('[data-view-link]').forEach(button=>button.addEventListener('click',()=>switchView(button.dataset.viewLink)));
document.querySelector('.mobile-menu').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.querySelector('#today-label').textContent=new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'long',day:'numeric',weekday:'long'}).format(new Date());
document.querySelector('#role-select').addEventListener('change',event=>{const head=event.target.value==='headteacher';showToast(head?'已切换至班主任视角':'已切换至授课教师视角');document.querySelector('.profile strong').textContent=head?'林沐班主任':'林沐老师'});

document.querySelectorAll('[data-open-booking]').forEach(button=>button.addEventListener('click',()=>bookingDialog.showModal()));
function renderBookings(){document.querySelector('#booking-items').innerHTML=bookings.map((b,i)=>`<article class="booking-item"><span>${b.date}</span><div><strong>${b.name}</strong><small>${b.detail}</small></div><button data-cancel="${i}" aria-label="取消预约">×</button></article>`).join('')||'<p>暂无预约</p>';document.querySelectorAll('[data-cancel]').forEach(b=>b.addEventListener('click',()=>{bookings.splice(Number(b.dataset.cancel),1);renderBookings();showToast('预约已取消')}))}
bookingForm.addEventListener('submit',event=>{const submitter=event.submitter;if(!submitter||submitter.value==='cancel')return;event.preventDefault();if(!bookingForm.reportValidity())return;const data=new FormData(bookingForm);const date=new Date(`${data.get('date')}T00:00:00`);bookings.unshift({date:`${date.getMonth()+1}/${date.getDate()}`,name:data.get('className'),detail:`${data.get('time')} · ${data.get('course')} · ${data.get('room')}`});renderBookings();bookingDialog.close();bookingForm.reset();showToast('课程预约成功，已加入课表')});
renderBookings();

const dates=['周一','周二','周三','周四','周五','周六','周日'];document.querySelector('#date-strip').innerHTML=dates.map((d,i)=>`<button class="${i===3?'active':''}">${d}<strong>${i+1}</strong></button>`).join('');document.querySelectorAll('#date-strip button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#date-strip button').forEach(x=>x.classList.remove('active'));b.classList.add('active')}));document.querySelector('#slot-grid').innerHTML=['08:30','09:30','10:30','11:30','13:30','14:30','15:30','16:30'].map((t,i)=>`<button ${[1,5].includes(i)?'disabled':''}>${t}${[1,5].includes(i)?' · 已约':''}</button>`).join('');document.querySelectorAll('#slot-grid button:not(:disabled)').forEach(b=>b.addEventListener('click',()=>{bookingDialog.showModal();bookingForm.elements.time.value=b.textContent.trim()}));

let weekOffset=0;function renderWeek(){const start=new Date();start.setDate(start.getDate()-((start.getDay()+6)%7)+weekOffset*7);const end=new Date(start);end.setDate(start.getDate()+4);document.querySelector('#week-label').textContent=`${start.getMonth()+1}月${start.getDate()}日 — ${end.getMonth()+1}月${end.getDate()}日`;const days=Array.from({length:5},(_,i)=>{const d=new Date(start);d.setDate(start.getDate()+i);return `周${'一二三四五'[i]} ${d.getMonth()+1}/${d.getDate()}`});const times=['08:30','09:30','10:30','11:30','14:30'];let html='<div class="schedule-cell header"></div>'+days.map(d=>`<div class="schedule-cell header">${d}</div>`).join('');times.forEach((t,row)=>{html+=`<div class="schedule-cell time">${t}</div>`;days.forEach((_,col)=>{const lessons={1:['数学思维','七年级 A 班'],7:['数学思维','七年级 B 班'],14:['专题研习','竞赛小组'],18:['阶段复习','七年级 A 班']}[row*5+col];html+=`<div class="schedule-cell">${lessons?`<div class="lesson ${row===2?'orange':''}"><strong>${lessons[0]}</strong><span>${lessons[1]}</span></div>`:''}</div>`})});document.querySelector('#schedule-grid').innerHTML=html}document.querySelector('#prev-week').onclick=()=>{weekOffset--;renderWeek()};document.querySelector('#next-week').onclick=()=>{weekOffset++;renderWeek()};renderWeek();

const courses=[['数学思维 · 七年级 A 班','18 / 24 课时',75,'进度正常','ontrack'],['数学思维 · 七年级 B 班','16 / 24 课时',67,'需关注','risk'],['竞赛专题 · 数学小组','10 / 16 课时',63,'进度正常','ontrack']];document.querySelector('#course-cards').innerHTML=courses.map(c=>`<article class="course-card"><div><h3>${c[0]}</h3><p>最近更新 · 今天</p></div><div><div class="course-progress-top"><span>${c[1]}</span><strong>${c[2]}%</strong></div><progress max="100" value="${c[2]}"></progress></div><span class="${c[4]}">${c[3]}</span></article>`).join('');
function renderMaterials(filter='全部',query=''){document.querySelector('#material-grid').innerHTML=materials.filter(m=>(filter==='全部'||m.type===filter)&&m.title.includes(query)).map(m=>`<article class="material-card"><div class="file-icon">${m.type==='课件'?'PPT':m.type==='教案'?'PDF':'DOC'}</div><span class="tag">${m.type}</span><h3>${m.title}</h3><p>${m.owner}</p><div class="material-meta"><span>${m.meta}</span><button data-download>下载 ↓</button></div></article>`).join('')||'<p>没有找到匹配的资源。</p>';document.querySelectorAll('[data-download]').forEach(b=>b.addEventListener('click',()=>showToast('演示资源已加入下载队列')))}renderMaterials();let activeFilter='全部';document.querySelectorAll('#material-filters button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#material-filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeFilter=b.dataset.filter;renderMaterials(activeFilter,document.querySelector('#material-search').value)}));document.querySelector('#material-search').addEventListener('input',e=>renderMaterials(activeFilter,e.target.value.trim()));document.querySelector('#upload-button').onclick=()=>showToast('上传入口已就绪，可接入学校云盘');

function renderTasks(){document.querySelector('#task-list').innerHTML=tasks.map((t,i)=>`<article class="task-item"><div><h3>${t.title}</h3><p>${t.detail}</p></div><div class="task-stat"><strong>${t.done}</strong><span>已提交</span></div><button data-review="${i}">批阅作业</button></article>`).join('');document.querySelectorAll('[data-review]').forEach(b=>b.addEventListener('click',()=>{b.textContent='已批阅';b.disabled=true;document.querySelector('#review-pending').textContent=Math.max(0,Number(document.querySelector('#review-pending').textContent)-1);document.querySelector('#review-done').textContent=Number(document.querySelector('#review-done').textContent)+1;document.querySelector('#pending-count').innerHTML=`${document.querySelector('#review-pending').textContent} <small>份</small>`;showToast('批阅状态已更新')}))}renderTasks();document.querySelector('#create-review').onclick=()=>showToast('新建复习任务功能已开启');
