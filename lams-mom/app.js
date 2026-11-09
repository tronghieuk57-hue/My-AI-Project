'use strict';

const chapters = [
  { time: '06:00', phase: 'BÌNH MINH', title: 'Một ngày', accent: 'trên đồng cỏ.', description: 'Nắng sớm trải trên triền đồi. Đàn bò thong thả gặm cỏ.' },
  { time: '12:00', phase: 'GIỮA TRƯA', title: 'Giữa ngày', accent: 'bên máng nước.', description: 'Một con bò cúi đầu uống nước, giữa khoảng đồng xanh yên ắng.' },
  { time: '17:30', phase: 'HOÀNG HÔN', title: 'Nắng chiều', accent: 'trên lối về.', description: 'Đàn bò nối nhau đi qua bãi đất khi ngày dần khép lại.' },
  { time: '20:30', phase: 'ĐÊM YÊN', title: 'Đồng cỏ', accent: 'đã lặng im.', description: 'Đàn bò nằm nghỉ trên sườn cỏ. Một ngày khép lại dưới màu xanh của đêm.' },
];

const journey = document.querySelector('.journey');
const stage = document.querySelector('.stage');
const shots = [...document.querySelectorAll('.shot')];
const videos = shots.map(shot => shot.querySelector('video'));
const posters = shots.map(shot => shot.querySelector('img'));
const toggle = document.querySelector('.motion-toggle');
const icon = toggle.querySelector('.motion-icon path');
const label = toggle.querySelector('.motion-label');
const chapter = document.getElementById('chapter');
const phase = document.getElementById('phase');
const lineOne = document.getElementById('line-one');
const lineTwo = document.getElementById('line-two');
const description = document.getElementById('description');
const clock = document.getElementById('clock');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const saveData = navigator.connection?.saveData === true;

let active = 0;
let manualPreference;
let autoplayBlocked = false;
let mediaReady = false;
let visible = false;
let frame = 0;
let fadeTimer;
let requestedVideo;

function motionAllowed() {
  return manualPreference ?? !(reducedMotion.matches || saveData);
}

function loadPoster(index) {
  const poster = posters[index];
  if (poster.dataset.src && !poster.hasAttribute('src')) poster.src = poster.dataset.src;
}

function loadVideo(video) {
  if (video.hasAttribute('src')) return;
  video.preload = 'metadata';
  video.src = video.dataset.src;
}

function syncPlayback() {
  const allowed = motionAllowed() && !autoplayBlocked;
  const video = videos[active];
  const shouldPlay = allowed && visible && mediaReady && !document.hidden;

  icon.setAttribute('d', allowed ? 'M6 4v8m4-8v8' : 'M5 3l8 5-8 5Z');
  label.textContent = allowed ? 'Dừng video' : 'Phát video';

  videos.forEach(candidate => {
    if (candidate !== video || !shouldPlay) candidate.pause();
  });
  if (!shouldPlay) {
    requestedVideo = undefined;
    return;
  }

  if (requestedVideo === video) return;
  requestedVideo = video;
  loadVideo(video);
  video.play().catch(error => {
    if (requestedVideo !== video || error.name === 'AbortError') return;
    autoplayBlocked = true;
    syncPlayback();
  });
}

function changeChapter(index) {
  const previous = active;
  active = index;
  const scene = chapters[index];

  loadPoster(index);
  clearTimeout(fadeTimer);
  shots.forEach((shot, position) => {
    shot.classList.toggle('is-outgoing', position === previous);
    shot.classList.toggle('is-current', position === index);
  });
  fadeTimer = setTimeout(() => shots[previous].classList.remove('is-outgoing'), 780);

  chapter.textContent = String(index + 1).padStart(2, '0');
  phase.textContent = scene.phase;
  lineOne.textContent = scene.title;
  lineTwo.textContent = scene.accent;
  description.textContent = scene.description;
  clock.textContent = scene.time;
  syncPlayback();
}

function updateScroll() {
  frame = 0;
  const bounds = journey.getBoundingClientRect();
  const stageHeight = stage.offsetHeight;
  const distance = Math.max(1, bounds.height - stageHeight);
  const progress = Math.min(1, Math.max(0, -bounds.top / distance));
  const position = progress * chapters.length;
  const index = Math.min(chapters.length - 1, Math.floor(position));
  const inView = bounds.bottom > 0 && bounds.top < innerHeight;

  stage.style.setProperty('--progress', progress.toFixed(4));
  if (inView !== visible) {
    visible = inView;
    if (index === active) syncPlayback();
  }
  if (index !== active) changeChapter(index);

  const next = index + 1;
  if (visible && next < chapters.length && position - index > 0.48) {
    loadPoster(next);
    if (mediaReady && !saveData && motionAllowed() && !autoplayBlocked) loadVideo(videos[next]);
  }
}

function scheduleScroll() {
  if (!frame) frame = requestAnimationFrame(updateScroll);
}

videos.forEach(video => {
  video.addEventListener('playing', () => video.classList.add('has-frame'));
});
toggle.addEventListener('click', () => {
  manualPreference = !motionAllowed() || autoplayBlocked;
  autoplayBlocked = false;
  mediaReady = true;
  syncPlayback();
});
reducedMotion.addEventListener('change', () => {
  manualPreference = undefined;
  syncPlayback();
});
document.addEventListener('visibilitychange', syncPlayback);
addEventListener('scroll', scheduleScroll, { passive: true });
addEventListener('resize', scheduleScroll, { passive: true });
addEventListener('pageshow', scheduleScroll);
document.body.classList.add('is-interactive');
toggle.hidden = false;
updateScroll();

// Keep the opening image visible before dissolving into live footage.
setTimeout(() => {
  mediaReady = true;
  syncPlayback();
}, 650);
