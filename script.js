const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.desktop-nav');
const languageButton = document.querySelector('.lang-switch');
const storyDialog = document.querySelector('#story-dialog');
const playButton = document.querySelector('.play-link');
const closeDialogButton = document.querySelector('.dialog-close');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
});

navigation.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
});

languageButton.addEventListener('click', () => {
  const isEnglish = languageButton.dataset.language === 'en';
  languageButton.dataset.language = isEnglish ? 'zh' : 'en';
  languageButton.innerHTML = isEnglish ? '中 <span>/ EN</span>' : '<span>中 /</span> EN';
  languageButton.setAttribute('aria-label', isEnglish ? '切换为英文' : 'Switch to Chinese');
});

playButton.addEventListener('click', () => storyDialog.showModal());
closeDialogButton.addEventListener('click', () => storyDialog.close());
storyDialog.addEventListener('click', (event) => {
  if (event.target === storyDialog) storyDialog.close();
});
