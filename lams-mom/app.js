'use strict';

const chapters = [
  { time: '06:00', title: 'Một ngày trên đồng cỏ' },
  { time: '12:00', title: 'Giữa trưa' },
  { time: '17:30', title: 'Nắng cuối ngày' },
  { time: '20:30', title: 'Đêm trên đồng cỏ' },
];

const journey = document.querySelector('.journey');
const stage = document.querySelector('.stage');
const shots = [...document.querySelectorAll('.shot')];
const videos = shots.map(shot => shot.querySelector('video'));
const posters = shots.map(shot => shot.querySelector('img'));
const toggle = document.querySelector('.motion-toggle');
const icon = toggle.querySelector('.motion-icon path');
const title = document.getElementById('chapter-title');
const clock = document.getElementById('clock');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const saveData = navigator.connection?.saveData === true;

let active = 0;
let manualPreference;
let autoplayBlocked = false;
let mediaReady = false;
let visible = false;
let frame = 0;
let requestedVideo;
let paintedShots = [];

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
  const action = allowed ? 'Dừng video' : 'Phát video';
  toggle.setAttribute('aria-label', action);
  toggle.title = action;

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
  active = index;
  title.textContent = chapters[index].title;
  clock.textContent = chapters[index].time;
  syncPlayback();
}

const clamp = value => Math.min(1, Math.max(0, value));

function paintScene(position, progress) {
  const left = Math.min(chapters.length - 2, Math.max(0, Math.floor(position - 0.5)));
  const right = left + 1;
  const cut = clamp((position - left - 0.76) / 0.48);
  const blend = reducedMotion.matches ? Number(cut >= 0.5) : cut * cut * (3 - 2 * cut);
  const layers = blend === 0 ? [left] : blend === 1 ? [right] : [left, right];

  for (const index of paintedShots) {
    if (!layers.includes(index)) shots[index].style.setProperty('--opacity', '0');
  }
  for (const index of layers) loadPoster(index);

  if (layers.includes(left)) shots[left].style.setProperty('--opacity', '1');
  if (layers.includes(right)) shots[right].style.setProperty('--opacity', blend);
  paintedShots = layers;

  stage.style.setProperty('--progress', progress);
  const distanceFromCut = Math.abs(blend - 0.5) * 2;
  stage.style.setProperty('--title-opacity', clamp(distanceFromCut * 1.8));
  stage.style.setProperty('--title-offset', `${(blend < 0.5 ? -1 : 1) * (1 - distanceFromCut) * 12}px`);

  return blend < 0.5 ? left : right;
}

function updateScroll() {
  frame = 0;
  const bounds = journey.getBoundingClientRect();
  const stageHeight = stage.offsetHeight;
  const distance = Math.max(1, bounds.height - stageHeight);
  const progress = Math.min(1, Math.max(0, -bounds.top / distance));
  const position = progress * chapters.length;
  const index = paintScene(position, progress);
  const inView = bounds.bottom > 0 && bounds.top < innerHeight;

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
  scheduleScroll();
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
