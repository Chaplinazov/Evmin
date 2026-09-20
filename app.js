// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.log('Service Worker registered');
    }).catch(err => {
      console.log('Service Worker registration failed: ', err);
    });
  });
}

// Training Logic
let timerInterval;
let timeLeft = 30;
let isRunning = false;
let currentSet = 0;
const totalSets = 4;

const programs = {
  power: [
    { name: 'Силове витягування', desc: 'Максимальне зміцнення глибоких м\'язів корсета' },
    { name: 'Скручування', desc: 'Робота з косими м\'язами живота' },
    { name: 'Статика', desc: 'Утримання статичної позиції під кутом' }
  ],
  rehab: [
    { name: 'Напіввиси', desc: 'Розслаблення м\'язів спини та м\'яке витягування хребта' },
    { name: 'Плавні повороти', desc: 'Відновлення природної рухливості хребців' },
    { name: 'Дихальна вправа', desc: 'Синхронізація дихання з розвантажувальною розтяжкою' }
  ]
};

let currentProgram = 'rehab';
let exerciseIndex = 0;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer-display').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('set-count').textContent = `${currentSet}/${totalSets}`;
}

function toggleTimer() {
  const btn = document.getElementById('timer-btn');
  if (isRunning) {
    clearInterval(timerInterval);
    btn.textContent = 'Старт';
    btn.classList.replace('bg-red-600', 'bg-tactical-olive');
  } else {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        finishSet();
      }
    }, 1000);
    btn.textContent = 'Пауза';
    btn.classList.replace('bg-tactical-olive', 'bg-red-600');
  }
  isRunning = !isRunning;
}

function finishSet() {
  clearInterval(timerInterval);
  isRunning = false;
  currentSet++;
  
  // Visual/Audio Feedback placeholder
  document.getElementById('timer-display').classList.add('text-green-500');
  setTimeout(() => document.getElementById('timer-display').classList.remove('text-green-500'), 2000);

  if (currentSet >= totalSets) {
    nextExercise();
  } else {
    timeLeft = 30;
    document.getElementById('timer-btn').textContent = 'Наст. підхід';
  }
  updateDisplay();
}

function nextExercise() {
  currentSet = 0;
  timeLeft = 30;
  exerciseIndex = (exerciseIndex + 1) % programs[currentProgram].length;
  const exercise = programs[currentProgram][exerciseIndex];
  
  document.getElementById('exercise-name').textContent = exercise.name;
  document.getElementById('exercise-desc').textContent = exercise.desc;
  document.getElementById('timer-btn').textContent = 'Почати вправу';
  updateDisplay();
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = 30;
  currentSet = 0;
  document.getElementById('timer-btn').textContent = 'Старт';
  document.getElementById('timer-btn').classList.replace('bg-red-600', 'bg-tactical-olive');
  updateDisplay();
}

function setAngle(angle) {
  document.getElementById('current-angle').textContent = `${angle}°`;
  // Visual feedback for selected button
  document.querySelectorAll('.angle-btn').forEach(btn => {
    btn.classList.remove('bg-tactical-olive', 'text-white');
    if (btn.textContent === `${angle}°`) {
      btn.classList.add('bg-tactical-olive', 'text-white');
    }
  });
}

function selectProgram(type) {
  currentProgram = type;
  exerciseIndex = 0;
  resetTimer();
  const exercise = programs[currentProgram][0];
  document.getElementById('exercise-name').textContent = exercise.name;
  document.getElementById('exercise-desc').textContent = exercise.desc;
}

// Initialize
updateDisplay();
setAngle(30);

// Video Gallery Logic and Data
const videoData = {
  'X-v5XyT1XwU': {
    title: 'Репортаж телеканалу КИЇВ24',
    desc: 'Ексклюзивний сюжет про РПС Євмінова за участі полковника Сил оборони Володимира Стецюка та головного інженера-розробника з позивним «Тул».'
  },
  '6aK2kpcq2Z0': {
    title: 'Демонстрація мобільності (Shorts)',
    desc: 'Реальне випробування рухливості на 360 градусів у повному екіпіруванні. Бій в обмеженому просторі, нахили, присідання та біг.'
  },
  'RqKDdvtqbk8': {
    title: 'Технічний огляд та налаштування',
    desc: 'Детальна інструкція зі збирання системи, індивідуального підгону висоти рельси та регулювання з\'єднання «Кукумбер» під антропометрію бійця.'
  },
  'NBxzUCDOxh4': {
    title: 'Випробування у бойових умовах',
    desc: 'Реальні відгуки військовослужбовців ЗСУ та польові тести системи на тактичному полігоні Сил оборони України.'
  }
};

function selectVideo(videoId, element) {
  const iframe = document.getElementById('main-video-player');
  if (!iframe) return;
  
  // Set embed URL
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  
  // Update description
  const info = videoData[videoId];
  if (info) {
    document.getElementById('video-title').textContent = info.title;
    document.getElementById('video-desc').textContent = info.desc;
  }
  
  // Update active state class in playlist
  document.querySelectorAll('.video-card').forEach(card => {
    card.classList.remove('border-tactical-accent', 'bg-tactical-olive/20');
    card.classList.add('border-white/5', 'bg-tactical-dark');
  });
  
  if (element) {
    element.classList.remove('border-white/5', 'bg-tactical-dark');
    element.classList.add('border-tactical-accent', 'bg-tactical-olive/20');
  }
}

