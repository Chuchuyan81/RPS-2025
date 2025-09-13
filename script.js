// Правильная инициализация Supabase
const supabaseUrl = "https://kdbbyqsdmucjvsatbiog.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkYmJ5cXNkbXVjanZzYXRiaW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MzQxNzcsImV4cCI6MjA2NjAxMDE3N30.v6wR9s1zCyYL-xN2Rohoi35LJ-f1uA1Y5KPPjQoXhLU";

// Система интернационализации
const translations = {
  ru: {
    title: "🎮 Камень, Ножницы, Бумага",
    "menu.title": "📋 Меню",
    "menu.language": "🌐 Язык",
    "menu.gameModes": "🎮 Режимы игры",
    "menu.playWithBot": "🤖 Играть с ботом",
    "menu.stats": "📊 Статистика",
    "stats.wins": "Победы:",
    "stats.streak": "Серия:",
    "stats.games": "Игры:",
    "room.placeholder": "Введите ID комнаты (4 цифры)",
    "room.create": "🚀 Создать комнату",
    "room.join": "🎯 Присоединиться к игре",
    "room.enterCode": "✨ Введите 4 цифры",
    "game.makeChoice": "🎯 Сделайте ваш выбор!",
    "game.exit": "Завершить игру",
    "choices.rock": "Камень",
    "choices.scissors": "Ножницы", 
    "choices.paper": "Бумага",
    "choices.rock.title": "Камень побеждает ножницы!",
    "choices.scissors.title": "Ножницы побеждают бумагу!",
    "choices.paper.title": "Бумага побеждает камень!",
    "status.ready": "🎉 Всё готово! Давайте играть и веселиться! 🎮",
    "status.connecting": "🤖 Подключаемся к дружелюбному боту... ⚡",
    "status.connected": "🤖✨ Отлично! Бот готов к игре! Покажите свои навыки! 🎯",
    "status.playerJoined": "🎊 Ура! Второй игрок присоединился! Пора играть! 🎪",
    "status.newRound": "🚀 Новый раунд! Время показать свои таланты! ⭐",
    "status.youWon": "🏆 Потрясающе! Вы победили! Вы настоящий чемпион! 🥇",
    "status.youLost": "😊 Хорошая попытка! В следующий раз обязательно получится! 🌟",
    "status.draw": "🤝 Ничья! Отличная игра! Вы оба молодцы! 👏",
    "status.waiting": "⏳ Ожидаем хода",
    "status.connectionRestored": "🌐✨ Отлично! Соединение восстановлено! Продолжаем игру! 🎮",
    
    // Установка приложения
    "install.title": "Установить игру!",
    "install.description": "Добавь игру на главный экран для быстрого доступа",
    "install.benefit1": "Быстрый запуск",
    "install.benefit2": "Работает офлайн",
    "install.benefit3": "Полноэкранный режим",
    "install.install": "Установить",
    "install.later": "Позже",
    "install.success": "Приложение установлено!",
    "install.installed": "Игра установлена на устройство!"
  },
  en: {
    title: "🎮 Rock, Paper, Scissors",
    "menu.title": "📋 Menu",
    "menu.language": "🌐 Language",
    "menu.gameModes": "🎮 Game Modes",
    "menu.playWithBot": "🤖 Play with Bot",
    "menu.stats": "📊 Statistics",
    "stats.wins": "Wins:",
    "stats.streak": "Streak:",
    "stats.games": "Games:",
    "room.placeholder": "Enter room ID (4 digits)",
    "room.create": "🚀 Create Room",
    "room.join": "🎯 Join Game",
    "room.enterCode": "✨ Enter 4 digits",
    "game.makeChoice": "🎯 Make your choice!",
    "game.exit": "Exit game",
    "choices.rock": "Rock",
    "choices.scissors": "Scissors",
    "choices.paper": "Paper",
    "choices.rock.title": "Rock beats scissors!",
    "choices.scissors.title": "Scissors beat paper!",
    "choices.paper.title": "Paper beats rock!",
    "status.ready": "🎉 Everything ready! Let's play and have fun! 🎮",
    "status.connecting": "🤖 Connecting to friendly bot... ⚡",
    "status.connected": "🤖✨ Great! Bot is ready to play! Show your skills! 🎯",
    "status.playerJoined": "🎊 Yay! Second player joined! Time to play! 🎪",
    "status.newRound": "🚀 New round! Time to show your talents! ⭐",
    "status.youWon": "🏆 Amazing! You won! You're a real champion! 🥇",
    "status.youLost": "😊 Good try! Next time it will definitely work! 🌟",
    "status.draw": "🤝 Draw! Great game! You both did great! 👏",
    "status.waiting": "⏳ Waiting for move",
    "status.connectionRestored": "🌐✨ Great! Connection restored! Let's continue the game! 🎮",
    
    // App installation
    "install.title": "Install the game!",
    "install.description": "Add the game to your home screen for quick access",
    "install.benefit1": "Quick launch",
    "install.benefit2": "Works offline",
    "install.benefit3": "Fullscreen mode",
    "install.install": "Install",
    "install.later": "Later",
    "install.success": "App installed!",
    "install.installed": "Game installed on device!"
  }
};

// Текущий язык
let currentLanguage = 'ru';

// Функция определения языка системы
function detectSystemLanguage() {
  const systemLang = navigator.language || navigator.languages[0];
  const langCode = systemLang.split('-')[0];
  
  // Если язык системы русский или английский, используем его
  if (langCode === 'ru' || langCode === 'en') {
    return langCode;
  }
  
  // Иначе используем английский по умолчанию
  return 'en';
}

// Функция смены языка
function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('preferredLanguage', lang);
  
  // Обновляем активную кнопку
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
  
  // Обновляем все тексты
  updateAllTexts();
  
  // Тактильная обратная связь при смене языка
  triggerHapticFeedback('light');
  
  console.log(`Language changed to: ${lang}`);
}

// Функция обновления всех текстов
function updateAllTexts() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[currentLanguage][key];
    if (translation) {
      element.textContent = translation;
    }
  });
  
  // Обновляем placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = translations[currentLanguage][key];
    if (translation) {
      element.placeholder = translation;
    }
  });
  
  // Обновляем title атрибуты
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    const translation = translations[currentLanguage][key];
    if (translation) {
      element.title = translation;
    }
  });
  
  // Обновляем статистику в меню
  updateStatsDisplay();
}

// Функция обновления отображения статистики
function updateStatsDisplay() {
  const winsCount = document.getElementById('wins-count');
  const streakCount = document.getElementById('streak-count');
  const gamesCount = document.getElementById('games-count');
  const streakProgress = document.getElementById('streak-progress');
  const streakText = document.getElementById('streak-text');
  
  if (winsCount) winsCount.textContent = gameState.stats.wins;
  if (streakCount) streakCount.textContent = gameState.stats.streak;
  if (gamesCount) gamesCount.textContent = gameState.stats.totalGames;
  
  // Обновляем прогресс-бар серии побед
  if (streakProgress && streakText) {
    const maxStreak = 5;
    const currentStreak = Math.min(gameState.stats.streak, maxStreak);
    const progressPercent = (currentStreak / maxStreak) * 100;
    
    streakProgress.style.width = `${progressPercent}%`;
    streakText.textContent = `${currentStreak}/${maxStreak}`;
    
    // Добавляем анимацию при достижении максимума
    if (gameState.stats.streak >= maxStreak) {
      streakProgress.style.animation = 'achievementPulse 1s ease-in-out infinite';
    } else {
      streakProgress.style.animation = 'none';
    }
  }
}

// Функция получения перевода
function t(key) {
  return translations[currentLanguage][key] || key;
}

// Система достижений
const achievements = {
  firstWin: {
    id: 'firstWin',
    name: { ru: 'Первая победа', en: 'First Win' },
    description: { ru: 'Выиграйте свою первую игру', en: 'Win your first game' },
    icon: '🏆',
    condition: (stats) => stats.wins >= 1,
    unlocked: false
  },
  streak3: {
    id: 'streak3',
    name: { ru: 'Серия побед', en: 'Win Streak' },
    description: { ru: 'Выиграйте 3 игры подряд', en: 'Win 3 games in a row' },
    icon: '🔥',
    condition: (stats) => stats.streak >= 3,
    unlocked: false
  },
  streak5: {
    id: 'streak5',
    name: { ru: 'Неудержимый', en: 'Unstoppable' },
    description: { ru: 'Выиграйте 5 игр подряд', en: 'Win 5 games in a row' },
    icon: '⚡',
    condition: (stats) => stats.streak >= 5,
    unlocked: false
  },
  games10: {
    id: 'games10',
    name: { ru: 'Опытный игрок', en: 'Experienced Player' },
    description: { ru: 'Сыграйте 10 игр', en: 'Play 10 games' },
    icon: '🎮',
    condition: (stats) => stats.totalGames >= 10,
    unlocked: false
  },
  games50: {
    id: 'games50',
    name: { ru: 'Ветеран', en: 'Veteran' },
    description: { ru: 'Сыграйте 50 игр', en: 'Play 50 games' },
    icon: '👑',
    condition: (stats) => stats.totalGames >= 50,
    unlocked: false
  },
  botMaster: {
    id: 'botMaster',
    name: { ru: 'Повелитель ботов', en: 'Bot Master' },
    description: { ru: 'Выиграйте 10 игр против бота', en: 'Win 10 games against bot' },
    icon: '🤖',
    condition: (stats) => stats.botWins >= 10,
    unlocked: false
  }
};

// Функция загрузки статистики
function loadStats() {
  const savedStats = localStorage.getItem('rps_stats');
  if (savedStats) {
    gameState.stats = { ...gameState.stats, ...JSON.parse(savedStats) };
  }
  
  const savedAchievements = localStorage.getItem('rps_achievements');
  if (savedAchievements) {
    gameState.achievements = JSON.parse(savedAchievements);
  }
}

// Функция сохранения статистики
function saveStats() {
  localStorage.setItem('rps_stats', JSON.stringify(gameState.stats));
  localStorage.setItem('rps_achievements', JSON.stringify(gameState.achievements));
}

// Функция обновления статистики
function updateStats(result) {
  gameState.stats.totalGames++;
  
  if (result.winner === 'me') {
    gameState.stats.wins++;
    gameState.stats.streak++;
  } else if (result.winner === 'opponent') {
    gameState.stats.losses++;
    gameState.stats.streak = 0;
  } else {
    gameState.stats.draws++;
    gameState.stats.streak = 0;
  }
  
  // Обновляем статистику бота
  if (gameState.playingWithBot && result.winner === 'me') {
    gameState.stats.botWins = (gameState.stats.botWins || 0) + 1;
  }
  
  saveStats();
  checkAchievements();
  updateStatsDisplay();
}

// Функция проверки достижений
function checkAchievements() {
  Object.values(achievements).forEach(achievement => {
    if (!gameState.achievements.includes(achievement.id) && achievement.condition(gameState.stats)) {
      unlockAchievement(achievement);
    }
  });
}

// Функция разблокировки достижения
function unlockAchievement(achievement) {
  gameState.achievements.push(achievement.id);
  saveStats();
  
  // Показываем уведомление о достижении
  showAchievementNotification(achievement);
}

// Функция показа уведомления о достижении
function showAchievementNotification(achievement) {
  const notification = document.createElement('div');
  notification.className = 'achievement-notification';
  notification.innerHTML = `
    <div class="achievement-content">
      <div class="achievement-icon">${achievement.icon}</div>
      <div class="achievement-text">
        <div class="achievement-title">${achievement.name[currentLanguage]}</div>
        <div class="achievement-desc">${achievement.description[currentLanguage]}</div>
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Анимация появления
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Тактильная обратная связь
  triggerHapticFeedback('achievement');
  
  // Убираем уведомление через 4 секунды
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Функция тактильной обратной связи
function triggerHapticFeedback(type = 'light') {
  if ('vibrate' in navigator) {
    switch (type) {
      case 'light':
        navigator.vibrate(50);
        break;
      case 'medium':
        navigator.vibrate(100);
        break;
      case 'heavy':
        navigator.vibrate([100, 50, 100]);
        break;
      case 'success':
        navigator.vibrate([100, 50, 100, 50, 100]);
        break;
      case 'error':
        navigator.vibrate([200, 100, 200]);
        break;
      case 'achievement':
        navigator.vibrate([100, 50, 100, 50, 100, 50, 100]);
        break;
      default:
        navigator.vibrate(50);
    }
  }
}

// Инициализация языка
function initializeLanguage() {
  // Проверяем сохраненный язык
  const savedLanguage = localStorage.getItem('preferredLanguage');
  
  if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
    currentLanguage = savedLanguage;
  } else {
    // Определяем язык системы
    currentLanguage = detectSystemLanguage();
    localStorage.setItem('preferredLanguage', currentLanguage);
  }
  
  // Устанавливаем активную кнопку языка
  setTimeout(() => {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-lang="${currentLanguage}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
    
    // Обновляем все тексты
    updateAllTexts();
  }, 100);
  
  console.log(`Language initialized: ${currentLanguage}`);
}

// Инициализация статистики
function initializeStats() {
  loadStats();
  updateStatsDisplay();
  console.log('Stats initialized:', gameState.stats);
}

// Константы для бот-комнаты
const BOT_ROOM_ID = '9999';
const BOT_PLAYER_ID = 'bot_player_9999';

// Глобальное состояние игры
const gameState = {
  currentRoom: null,      // ID текущей комнаты
  playerId: null,         // Уникальный ID игрока  
  isPlayer1: false,       // Роль игрока
  channel: null,          // Supabase канал
  myChoice: null,         // Мой выбор
  opponentChoice: null,   // Выбор оппонента
  gameStatus: 'idle',     // Статус: idle|waiting|playing|finished
  playingWithBot: false,  // Играем ли мы с ботом
  stats: {                // Статистика игрока
    wins: 0,
    losses: 0,
    draws: 0,
    streak: 0,
    totalGames: 0
  },
  achievements: []        // Полученные достижения
};

// Ждем загрузки Supabase библиотеки
let supabase = null;

// Делаем supabase доступным глобально для отладки
window.supabaseClient = null;

/**
 * Тестирует подключение к Supabase
 * Выполняет простой запрос для проверки работоспособности
 */
async function testConnection() {
  if (!supabase) {
    console.error('Supabase не инициализирован для тестирования');
    showStatus(currentLanguage === 'ru' ? 
      "Ошибка: Supabase не инициализирован" :
      "Error: Supabase not initialized", true);
    return;
  }

  try {
    console.log('🔍 Тестирование подключения к Supabase...');
    
    // Простой запрос для проверки соединения
    const { data, error } = await supabase
      .from('games')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Ошибка тестирования подключения:', error);
      showStatus(currentLanguage === 'ru' ? 
        "Ошибка подключения к базе данных" :
        "Database connection error", true);
      return;
    }
    
    console.log('✅ Подключение к Supabase успешно протестировано');
    console.log('📊 Количество активных игр:', data);
    
  } catch (error) {
    console.error('❌ Исключение при тестировании:', error);
    showStatus(currentLanguage === 'ru' ? 
      "Ошибка тестирования подключения" :
      "Connection testing error", true);
  }
}

// Инициализация после загрузки библиотеки
// Переменная для хранения install prompt
let deferredPrompt;

// Обработка install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('💾 Install prompt доступен');
  e.preventDefault();
  deferredPrompt = e;
  
  // Показываем кастомный install prompt
  showInstallPrompt();
});

// Показ кастомного install prompt
function showInstallPrompt() {
  const installPrompt = document.createElement('div');
  installPrompt.className = 'install-prompt';
  installPrompt.innerHTML = `
    <div class="install-content">
      <div class="install-icon">📱</div>
      <h3>${t('install.title')}</h3>
      <p>${t('install.description')}</p>
      <div class="install-benefits">
        <div class="benefit">🚀 ${t('install.benefit1')}</div>
        <div class="benefit">⚡ ${t('install.benefit2')}</div>
        <div class="benefit">🎮 ${t('install.benefit3')}</div>
      </div>
      <div class="install-actions">
        <button class="install-btn primary" onclick="installApp()">
          ${t('install.install')}
        </button>
        <button class="install-btn secondary" onclick="dismissInstall()">
          ${t('install.later')}
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(installPrompt);
  
  // Анимация появления
  setTimeout(() => {
    installPrompt.classList.add('show');
  }, 100);
}

// Установка приложения
async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('✅ Пользователь установил приложение');
      showStatus(t('install.success'));
      triggerHapticFeedback('success');
    } else {
      console.log('❌ Пользователь отклонил установку');
    }
    
    deferredPrompt = null;
    dismissInstall();
  }
}

// Скрытие install prompt
function dismissInstall() {
  const installPrompt = document.querySelector('.install-prompt');
  if (installPrompt) {
    installPrompt.classList.remove('show');
    setTimeout(() => {
      installPrompt.remove();
    }, 300);
  }
}

// Обработка успешной установки
window.addEventListener('appinstalled', () => {
  console.log('🎉 PWA установлено!');
  showStatus(t('install.installed'));
  triggerHapticFeedback('achievement');
});

// Функция обработки URL параметров для shortcuts
function handleURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get('action');
  const room = urlParams.get('room');
  
  if (action) {
    switch (action) {
      case 'create':
        // Автоматически создаем комнату
        setTimeout(() => {
          createRoom();
        }, 1000);
        break;
      case 'join':
        // Показываем поле для ввода кода комнаты
        const roomInput = document.getElementById('room');
        if (roomInput) {
          roomInput.focus();
        }
        break;
      case 'bot':
        // Автоматически запускаем игру с ботом
        setTimeout(() => {
          playWithBot();
        }, 1000);
        break;
    }
  }
  
  if (room) {
    // Автоматически присоединяемся к комнате
    setTimeout(() => {
      joinRoom(room);
    }, 1000);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Инициализируем язык
  initializeLanguage();
  
  // Инициализируем статистику
  initializeStats();
  
  // Обрабатываем URL параметры для shortcuts
  handleURLParameters();
  
  // Проверяем доступность Supabase
  if (typeof window.supabase === 'undefined') {
    console.error('Supabase library not loaded');
    showStatus("Ошибка загрузки библиотеки Supabase", true);
    return;
  }

  try {
    // Правильная инициализация клиента
    supabase = window.supabase.createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: false // Отключаем персистентность для простоты
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    });

    // Делаем клиент доступным глобально для отладки
    window.supabaseClient = supabase;
    
    console.log('Supabase client initialized:', supabase);
    console.log('Глобальная переменная window.supabaseClient доступна для тестирования');
    showStatus(t('status.ready'));
    
    // Проверяем видимость кнопки бота
    const botButton = document.getElementById('botMenuButton');
    if (botButton) {
      console.log('🤖 Кнопка бота найдена и видна:', botButton.style.display !== 'none');
      console.log('🤖 Стили кнопки бота:', window.getComputedStyle(botButton).display);
    } else {
      console.log('🤖 Кнопка бота не найдена в DOM - это нормально, она в меню');
    }
    
    // Тестируем подключение
    testConnection();
    
    // Инициализируем бот-комнату при загрузке
    initializeBotRoom();
    
    // Добавляем обработчики для сетевых событий
    window.addEventListener('offline', () => {
      showStatus(currentLanguage === 'ru' ? 
        "Нет соединения. Проверяйте интернет." :
        "No connection. Check your internet.", true);
    });

    window.addEventListener('online', () => {
      showStatus(t('status.connectionRestored'));
      if (gameState.currentRoom) {
        subscribeToUpdates();
      }
    });
    
  } catch (error) {
    console.error('Error initializing Supabase:', error);
    showStatus(currentLanguage === 'ru' ? 
      "Ошибка инициализации Supabase: " + error.message :
      "Supabase initialization error: " + error.message, true);
  }
});

/**
 * Инициализация бот-комнаты при загрузке страницы
 * Создает комнату с ботом, если её нет
 */
async function initializeBotRoom() {
  console.log('🤖 Инициализация бот-комнаты...');
  
  if (!supabase) {
    console.error('Supabase не доступен для инициализации бот-комнаты');
    return;
  }

  try {
    await ensureBotRoomExists();
    console.log('🤖 Бот-комната инициализирована успешно');
  } catch (error) {
    console.error('🤖 Ошибка инициализации бот-комнаты:', error);
  }
}

/**
 * Функция для игры с ботом
 * Присоединяется к специальной комнате с ботом
 */
async function playWithBot() {
  console.log('🤖 Функция playWithBot вызвана');
  
  if (!supabase) {
    console.error('Supabase не инициализирован');
    showStatus(currentLanguage === 'ru' ? 
      "Supabase не инициализирован" : 
      "Supabase not initialized", true);
    return;
  }

  console.log('🤖 Начинаем подключение к боту...');
  showLoader(true);
  showStatus(t('status.connecting'));

  try {
    // Устанавливаем флаг игры с ботом
    gameState.playingWithBot = true;
    console.log('🤖 Флаг playingWithBot установлен');
    
    // Генерируем ID игрока
    gameState.playerId = generatePlayerId();
    gameState.isPlayer1 = false; // Игрок всегда второй, бот - первый
    console.log('🤖 ID игрока сгенерирован:', gameState.playerId);
    
    // Проверяем/создаем комнату с ботом
    console.log('🤖 Проверяем/создаем бот-комнату...');
    await ensureBotRoomExists();
    
    // Присоединяемся к комнате с ботом
    console.log('🤖 Присоединяемся к бот-комнате...');
    const { data: updatedGame, error: updateError } = await retryWrapper(() =>
      supabase
        .from("games")
        .update({ 
          player2_id: gameState.playerId,
          status: 'ready',
          updated_at: new Date().toISOString()
        })
        .eq("room_id", BOT_ROOM_ID)
        .select()
        .single()
    );

    if (updateError) {
      console.error('Ошибка при присоединении к бот-комнате:', updateError);
      throw new Error(currentLanguage === 'ru' ? 
        `Ошибка подключения к боту: ${updateError.message}` :
        `Bot connection error: ${updateError.message}`);
    }

    console.log('🤖 Успешно присоединились к бот-комнате:', updatedGame);

    // Обновляем состояние
    gameState.currentRoom = BOT_ROOM_ID;
    gameState.gameStatus = 'ready';

    // Обновляем UI
    const roomInput = document.getElementById("room");
    if (roomInput) {
      roomInput.value = BOT_ROOM_ID;
    }

    console.log('🤖 Показываем игровой UI...');
    showGameUI();
    showStatus(t('status.connected'));
    
    // Активируем кнопки для игры
    toggleChoiceButtons(true);
    
    console.log('🤖 Подписываемся на обновления...');
    subscribeToUpdates();

    // Бот делает первый ход сразу
    console.log('🤖 Бот делает первый ход...');
    await makeBotMove();

    console.log('🤖 Подключение к боту завершено успешно!');

  } catch (error) {
    console.error('🤖 Ошибка подключения к боту:', error);
    showStatus(currentLanguage === 'ru' ? 
      `Ошибка подключения к боту: ${error.message}` :
      `Bot connection error: ${error.message}`, true);
    gameState.playingWithBot = false;
  } finally {
    showLoader(false);
  }
}

/**
 * Обеспечивает существование комнаты с ботом
 */
async function ensureBotRoomExists() {
  try {
    // Проверяем существование комнаты с ботом
    const { data: existingRoom, error: selectError } = await retryWrapper(() =>
      supabase
        .from("games")
        .select("*")
        .eq("room_id", BOT_ROOM_ID)
        .single()
    );

    if (selectError && selectError.code !== 'PGRST116') {
      throw selectError;
    }

    if (!existingRoom) {
      // Создаем новую комнату с ботом
      const gameData = {
        room_id: BOT_ROOM_ID,
        player1_id: BOT_PLAYER_ID,
        player2_id: null,
        player1_choice: null,
        player2_choice: null,
        status: 'waiting_player2',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await retryWrapper(() =>
        supabase
          .from("games")
          .insert([gameData])
          .select()
          .single()
      );

      if (error) {
        throw new Error(currentLanguage === 'ru' ? 
          `Ошибка создания бот-комнаты: ${error.message}` :
          `Bot room creation error: ${error.message}`);
      }

      console.log('Бот-комната создана:', data);
    } else {
      // Сбрасываем состояние существующей комнаты
      const { error: resetError } = await retryWrapper(() =>
        supabase
          .from("games")
          .update({
            player2_id: null,
            player1_choice: null,
            player2_choice: null,
            status: 'waiting_player2',
            updated_at: new Date().toISOString()
          })
          .eq("room_id", BOT_ROOM_ID)
      );

      if (resetError) {
        console.error('Ошибка сброса бот-комнаты:', resetError);
      } else {
        console.log('Бот-комната сброшена для новой игры');
      }
    }
  } catch (error) {
    console.error('Ошибка при обеспечении бот-комнаты:', error);
    throw error;
  }
}

/**
 * Логика бота для автоматических ходов
 * Бот делает случайный выбор без задержки
 */
async function makeBotMove() {
  if (!gameState.playingWithBot || gameState.currentRoom !== BOT_ROOM_ID) {
    return;
  }

  const choices = ['камень', 'ножницы', 'бумага'];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];

  try {
    const { error } = await retryWrapper(() =>
      supabase
        .from("games")
        .update({
          player1_choice: botChoice,
          status: 'playing',
          updated_at: new Date().toISOString()
        })
        .eq("room_id", BOT_ROOM_ID)
    );

    if (error) {
      console.error('Ошибка хода бота:', error);
    } else {
      console.log('Бот сделал ход:', botChoice);
    }
  } catch (error) {
    console.error('Исключение при ходе бота:', error);
  }
}

// Отображение кнопок выбора
function showGameUI() {
  const choices = document.getElementById("choices");
  const roomControls = document.querySelector(".room-controls");
  const actionButton = document.getElementById("actionButton");

  if (choices) choices.style.display = "block";
  
  // Скрываем поле комнаты во время игры
  if (roomControls) {
    roomControls.classList.add("hidden");
  }
  
  if (actionButton) {
    actionButton.style.display = "none"; // Скрываем кнопку действия во время игры
  }

  // Активируем кнопки если игра готова (особенно важно для игрока 2)
  if (gameState.gameStatus === 'ready') {
    toggleChoiceButtons(true);
  } else {
    // Изначально блокируем кнопки выбора для ожидания
    toggleChoiceButtons(false);
  }
}

// Блокировка/разблокировка кнопок выбора
function toggleChoiceButtons(enabled) {
  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach(button => {
    button.disabled = !enabled;
    button.style.opacity = enabled ? "1" : "0.5";
  });
}

// Отправка хода
async function makeMove(choice) {
  if (!gameState.currentRoom || !supabase) return;

  if (gameState.myChoice) {
    showStatus(currentLanguage === 'ru' ? 
      "Вы уже сделали ход в этом раунде!" : 
      "You already made a move in this round!", true);
    triggerHapticFeedback('error');
    return;
  }

  if (gameState.gameStatus !== 'ready' && gameState.gameStatus !== 'playing') {
    showStatus(currentLanguage === 'ru' ? 
      "Игра еще не готова!" : 
      "Game is not ready yet!", true);
    triggerHapticFeedback('error');
    return;
  }
  
  // Тактильная обратная связь при выборе
  triggerHapticFeedback('medium');

  // Сохраняем выбор локально
  gameState.myChoice = choice;
  toggleChoiceButtons(false);
  
  const choiceTranslations = {
    'камень': t('choices.rock'),
    'ножницы': t('choices.scissors'),
    'бумага': t('choices.paper')
  };
  
  showStatus(currentLanguage === 'ru' ? 
    `Ваш выбор: ${choiceTranslations[choice]}. Ожидание хода оппонента...` :
    `Your choice: ${choiceTranslations[choice]}. Waiting for opponent's move...`);

  try {
    // Определяем, какое поле обновлять
    const updateData = {
      updated_at: new Date().toISOString()
    };

    if (gameState.isPlayer1) {
      updateData.player1_choice = choice;
    } else {
      updateData.player2_choice = choice;
    }

    // Если это первый ход в раунде, меняем статус на playing
    if (gameState.gameStatus === 'ready') {
      updateData.status = 'playing';
      gameState.gameStatus = 'playing';
    }

    const { error } = await retryWrapper(() =>
      supabase
        .from("games")
        .update(updateData)
        .eq("room_id", gameState.currentRoom)
    );

    if (error) {
      throw error;
    }

    console.log('Move sent successfully:', choice);

  } catch (error) {
    console.error("Ошибка отправки хода:", error);
    showStatus(currentLanguage === 'ru' ? 
      `Ошибка отправки хода: ${error.message}` :
      `Move sending error: ${error.message}`, true);
    
    // Откатываем изменения
    gameState.myChoice = null;
    toggleChoiceButtons(true);
  }
}

// Определение победителя
function determineWinner(player1Choice, player2Choice) {
  if (player1Choice === player2Choice) {
    return { winner: 'draw', message: t('status.draw') };
  }
  
  const rules = { 
    'камень': 'ножницы', 
    'ножницы': 'бумага', 
    'бумага': 'камень' 
  };
  
  const player1Wins = rules[player1Choice] === player2Choice;
  
  if (gameState.isPlayer1) {
    return {
      winner: player1Wins ? 'me' : 'opponent',
      message: player1Wins ? t('status.youWon') : t('status.youLost')
    };
  } else {
    return {
      winner: player1Wins ? 'opponent' : 'me',
      message: player1Wins ? t('status.youLost') : t('status.youWon')
    };
  }
}

// Сброс раунда
async function resetRound() {
  if (!gameState.currentRoom || !supabase) return;

  try {
    const { error } = await retryWrapper(() =>
      supabase
        .from("games")
        .update({ 
          player1_choice: null, 
          player2_choice: null, 
          status: 'ready',
          updated_at: new Date().toISOString()
        })
        .eq("room_id", gameState.currentRoom)
    );

    if (error) {
      throw error;
    }

    // Сбрасываем локальное состояние
    gameState.myChoice = null;
    gameState.opponentChoice = null;
    gameState.gameStatus = 'ready';
    
    toggleChoiceButtons(true);
    showStatus(t('status.newRound'));

    console.log('Round reset successfully');

  } catch (error) {
    console.error("Ошибка сброса раунда:", error);
    showStatus(currentLanguage === 'ru' ? 
      `Ошибка сброса раунда: ${error.message}` :
      `Round reset error: ${error.message}`, true);
  }
}

// Подписка на обновления
function subscribeToUpdates() {
  if (!supabase || !gameState.currentRoom) return;

  // Закрываем предыдущие подключения
  cleanup();

  console.log('Subscribing to updates for room:', gameState.currentRoom);

  gameState.channel = supabase
    .channel(`game-room-${gameState.currentRoom}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'games',
        filter: `room_id=eq.${gameState.currentRoom}`
      },
      (payload) => {
        console.log('Received update:', payload);
        handleGameUpdate(payload.new);
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema: 'public',
        table: 'games',
        filter: `room_id=eq.${gameState.currentRoom}`
      },
      () => {
        showStatus(currentLanguage === 'ru' ? 
          "Игра была завершена" :
          "Game was ended", true);
        cleanup();
      }
    )
    .subscribe((status) => {
      console.log('Subscription status:', status);
      if (status === 'SUBSCRIBED') {
        console.log('Successfully subscribed to game updates');
      } else if (status === 'CHANNEL_ERROR') {
        showStatus(currentLanguage === 'ru' ? 
          "Ошибка подключения к обновлениям. Перезагрузите страницу." :
          "Connection error to updates. Reload the page.", true);
      }
    });
}

// Обработка обновлений игры
function handleGameUpdate(gameData) {
  const { player1_choice, player2_choice, status, player2_id } = gameData;

  console.log('Handling game update:', gameData);

  // Обновляем статус подключения игроков
  if (status === 'ready' && player2_id) {
    console.log('🚀 Второй игрок присоединился! Предыдущий статус:', gameState.gameStatus);
    if (gameState.gameStatus === 'waiting' || gameState.gameStatus === 'waiting_player2') {
      if (gameState.playingWithBot) {
        showStatus(t('status.connected'));
      } else {
        showStatus(t('status.playerJoined'));
      }
    }
    gameState.gameStatus = 'ready';
    // Активируем кнопки для обоих игроков когда игра готова
    toggleChoiceButtons(true);
    console.log('✅ Игра готова! Кнопки активированы. Новый статус:', gameState.gameStatus);
  }

  // Обрабатываем ходы
  if (player1_choice || player2_choice) {
    const myChoice = gameState.isPlayer1 ? player1_choice : player2_choice;
    const opponentChoice = gameState.isPlayer1 ? player2_choice : player1_choice;

    // Обновляем локальное состояние
    if (myChoice && !gameState.myChoice) {
      gameState.myChoice = myChoice;
    }
    if (opponentChoice && !gameState.opponentChoice) {
      gameState.opponentChoice = opponentChoice;
      if (gameState.playingWithBot) {
        showStatus(currentLanguage === 'ru' ? 
          "Бот сделал ход. Ожидание результата..." :
          "Bot made a move. Waiting for result...");
      } else {
        showStatus(currentLanguage === 'ru' ? 
          "Оппонент сделал ход. Ожидание результата..." :
          "Opponent made a move. Waiting for result...");
      }
    }

    // Если оба сделали ходы, показываем результат
    if (player1_choice && player2_choice) {
      const result = determineWinner(player1_choice, player2_choice);
      const myChoiceDisplay = gameState.isPlayer1 ? player1_choice : player2_choice;
      const opponentChoiceDisplay = gameState.isPlayer1 ? player2_choice : player1_choice;
      
      const opponentName = gameState.playingWithBot ? 
        (currentLanguage === 'ru' ? "Бот" : "Bot") : 
        (currentLanguage === 'ru' ? "Оппонент" : "Opponent");
      
      // Показываем результат с цветовым различием и выбором соперника
      showGameResult(result, myChoiceDisplay, opponentChoiceDisplay, opponentName);
      
      gameState.gameStatus = 'finished';
      toggleChoiceButtons(false);
      
      // Автоматический сброс через 4 секунды
      setTimeout(() => {
        resetRound();
      }, 4000);
    }
  }

  // Если играем с ботом и игрок сделал ход, запускаем ход бота
  if (gameState.playingWithBot && player2_choice && !player1_choice) {
    makeBotMove();
  }
}

// Очистка ресурсов
// Удаление комнаты из БД после игры
async function deleteRoomFromDB() {
  if (!gameState.currentRoom || !supabase) {
    return;
  }

  try {
    const { error } = await retryWrapper(() =>
      supabase
        .from("games")
        .delete()
        .eq("room_id", gameState.currentRoom)
    );

    if (error) {
      console.error('Error deleting room:', error);
    } else {
      console.log(`Room ${gameState.currentRoom} deleted from database`);
    }
  } catch (error) {
    console.error('Exception deleting room:', error);
  }
}

function cleanup() {
  if (gameState.channel) {
    supabase.removeChannel(gameState.channel);
    gameState.channel = null;
  }
}

// Полная очистка при выходе
async function fullCleanup() {
  // Удаляем комнату из БД перед очисткой состояния (но не бот-комнату)
  if (gameState.currentRoom && gameState.currentRoom !== BOT_ROOM_ID) {
    await deleteRoomFromDB();
  } else if (gameState.playingWithBot && gameState.currentRoom === BOT_ROOM_ID) {
    // Для бот-комнаты просто сбрасываем player2
    try {
      await retryWrapper(() =>
        supabase
          .from("games")
          .update({
            player2_id: null,
            player1_choice: null,
            player2_choice: null,
            status: 'waiting_player2',
            updated_at: new Date().toISOString()
          })
          .eq("room_id", BOT_ROOM_ID)
      );
      console.log('Бот-комната сброшена после выхода игрока');
    } catch (error) {
      console.error('Ошибка сброса бот-комнаты:', error);
    }
  }
  
  cleanup();
  
  // Сброс состояния игры
  gameState.currentRoom = null;
  gameState.playerId = null;
  gameState.isPlayer1 = false;
  gameState.myChoice = null;
  gameState.opponentChoice = null;
  gameState.gameStatus = 'idle';
  gameState.playingWithBot = false;

  // Сброс UI
  const choices = document.getElementById("choices");
  const roomControls = document.querySelector(".room-controls");
  const roomInput = document.getElementById("room");
  const actionButton = document.getElementById("actionButton");

  if (choices) choices.style.display = "none";
  
  // Показываем поле комнаты обратно
  if (roomControls) {
    roomControls.classList.remove("hidden");
  }
  
  if (roomInput) {
    roomInput.disabled = false;
    roomInput.value = "";
  }
  if (actionButton) {
    actionButton.style.display = "block";
    actionButton.textContent = "Создать комнату";
    // Восстанавливаем правильный обработчик
    actionButton.onclick = null;
    actionButton.onclick = handleAction;
  }

  toggleChoiceButtons(false);
  
  const statusMessage = gameState.playingWithBot ? 
    (currentLanguage === 'ru' ? "Игра с ботом завершена." : "Bot game ended.") : 
    (currentLanguage === 'ru' ? "Игра завершена. Комната удалена из базы данных." : "Game ended. Room deleted from database.");
  showStatus(statusMessage);
}

// Обработка закрытия страницы
window.addEventListener('beforeunload', (event) => {
  if (gameState.currentRoom) {
    // Синхронный вызов для удаления комнаты
    deleteRoomFromDB();
    cleanup();
  }
});

// Обработка потери фокуса страницы
document.addEventListener('visibilitychange', () => {
  if (document.hidden && gameState.currentRoom) {
    console.log("Страница скрыта");
  } else if (!document.hidden && gameState.currentRoom) {
    console.log("Страница видима");
  }
});

/**
 * Обертка для повторных попыток сетевых запросов с exponential backoff
 * @param {Function} asyncFn - Асинхронная функция для выполнения
 * @param {number} maxRetries - Максимальное количество попыток (по умолчанию 3)
 * @returns {Promise} - Результат выполнения функции
 */
async function retryWrapper(asyncFn, maxRetries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      lastError = error;
      console.error(`Попытка ${attempt} не удалась: ${error.message}`);
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// === PWA ФУНКЦИОНАЛЬНОСТЬ ===

// Дополнительные функции для управления PWA установкой
function initializePWAFeatures() {
  console.log('🚀 Инициализация PWA функций');
  
  // Проверяем, если уже в PWA режиме
  if (isPWAMode()) {
    console.log('🔧 Приложение запущено в PWA режиме');
    hidePWAFeatures();
  }
  
  // Добавляем обработчики для кнопки установки
  setupInstallButton();
  
  // Отслеживаем изменения режима отображения
  watchForPWAMode();
}

// Проверка PWA режима (более точная)
function isPWAMode() {
  const displayMode = getPWADisplayMode();
  return displayMode === 'pwa' || 
         window.navigator.standalone === true ||
         document.referrer.includes('android-app://');
}

// Получение режима отображения
function getPWADisplayMode() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'pwa';
  }
  if (window.matchMedia('(display-mode: minimal-ui)').matches) {
    return 'minimal-ui';
  }
  if (window.matchMedia('(display-mode: fullscreen)').matches) {
    return 'fullscreen';
  }
  return 'browser';
}

// Скрытие PWA элементов если уже установлено
function hidePWAFeatures() {
  const installBtn = document.getElementById('install-btn');
  const pwaFeatures = document.querySelector('.pwa-features');
  
  if (installBtn) {
    installBtn.style.display = 'none';
  }
  
  if (pwaFeatures) {
    pwaFeatures.innerHTML = `
      <p class="features-text">
        🎉 <strong>Приложение установлено!</strong>
        • Работает офлайн • Быстрая загрузка • Доступно с рабочего стола
      </p>
    `;
  }
}

// Настройка кнопки установки
function setupInstallButton() {
  const installBtn = document.getElementById('install-btn');
  if (!installBtn) return;
  
  // Проверяем, нужно ли показывать кнопку
  if (shouldShowInstallButton()) {
    // Для iOS показываем сразу
    if (isIOSDevice() && !isPWAMode()) {
      showIOSInstallInstructions();
    }
    
    // Для Android ждем событие beforeinstallprompt (уже обработано в HTML)
  }
}

// Проверка необходимости показа кнопки установки
function shouldShowInstallButton() {
  return isMobileDevice() && 
         !isPWAMode() && 
         !localStorage.getItem('pwa-install-dismissed');
}

// Проверка iOS устройства
function isIOSDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Показ инструкций для iOS
function showIOSInstallInstructions() {
  const installBtn = document.getElementById('install-btn');
  if (!installBtn) return;
  
  installBtn.style.display = 'block';
  installBtn.onclick = () => {
    showIOSInstallModal();
  };
}

// Модальное окно для iOS
function showIOSInstallModal() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 20px;
    box-sizing: border-box;
  `;
  
  modal.innerHTML = `
    <div style="
      background: white;
      border-radius: 20px;
      padding: 30px;
      max-width: 350px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    ">
      <h3 style="margin: 0 0 20px 0; color: #333;">📱 Установить приложение</h3>
      <div style="text-align: left; margin: 20px 0; line-height: 1.6; color: #666;">
        <p style="margin: 10px 0;"><strong>1.</strong> Нажмите кнопку "Поделиться" (📤) внизу экрана</p>
        <p style="margin: 10px 0;"><strong>2.</strong> Выберите "На экран Домой" или "Add to Home Screen"</p>
        <p style="margin: 10px 0;"><strong>3.</strong> Нажмите "Добавить"</p>
        <p style="margin: 20px 0 0 0; text-align: center; color: #28a745; font-weight: bold;">
          🎉 Приложение появится на рабочем столе!
        </p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 10px;
      ">Понятно</button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Закрытие по клику вне модального окна
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  };
}

// Отслеживание изменений PWA режима
function watchForPWAMode() {
  // Проверяем при изменении медиа-запросов
  const mediaQuery = window.matchMedia('(display-mode: standalone)');
  mediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
      console.log('🎉 Переключение в PWA режим');
      hidePWAFeatures();
    }
  });
}

// Проверка мобильного устройства (улучшенная)
function isMobileDevice() {
  // Проверка User Agent
  const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Проверка сенсорного экрана
  const touchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Проверка размера экрана
  const smallScreen = window.innerWidth <= 768;
  
  // Проверка iPad с клавиатурой (определяется как desktop)
  const iPadPro = navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
  
  return userAgent || (touchScreen && smallScreen) || iPadPro;
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  // Небольшая задержка для загрузки других скриптов
  setTimeout(initializePWAFeatures, 100);
});

// Дополнительная проверка при загрузке страницы
window.addEventListener('load', () => {
  console.log('📋 PWA статус при загрузке:');
  console.log('- Мобильное устройство:', isMobileDevice());
  console.log('- PWA режим:', isPWAMode());
  console.log('- Режим отображения:', getPWADisplayMode());
  console.log('- iOS устройство:', isIOSDevice());
});

// Позитивная функция для показа статуса
function showStatus(message, isError = false) {
  const result = document.getElementById('result');
  if (!result) return;
  
  if (isError) {
    // Делаем ошибки менее негативными
    result.innerHTML = `<div class="status-message error-message">
      <span>😅 ${message}</span>
      <br><small>${currentLanguage === 'ru' ? 'Не переживайте, всё получится! 💪' : "Don't worry, everything will work out! 💪"}</small>
    </div>`;
    result.className = 'result error';
  } else {
    // Используем переводы для стандартных сообщений
    let positiveMessage = message;
    
    // Проверяем, есть ли перевод для этого сообщения
    const messageKey = Object.keys(translations[currentLanguage]).find(key => 
      translations[currentLanguage][key] === message
    );
    
    if (messageKey) {
      positiveMessage = translations[currentLanguage][messageKey];
    } else {
      // Делаем сообщения более позитивными для старых сообщений
      if (message.includes('Готов к игре') || message.includes('Ready to play')) {
        positiveMessage = t('status.ready');
      } else if (message.includes('Подключение к боту') || message.includes('Connecting to bot')) {
        positiveMessage = t('status.connecting');
      } else if (message.includes('Подключились к боту') || message.includes('Connected to bot')) {
        positiveMessage = t('status.connected');
      } else if (message.includes('Второй игрок присоединился') || message.includes('Second player joined')) {
        positiveMessage = t('status.playerJoined');
      } else if (message.includes('Новый раунд') || message.includes('New round')) {
        positiveMessage = t('status.newRound');
      } else if (message.includes('Вы победили') || message.includes('You won')) {
        positiveMessage = t('status.youWon');
      } else if (message.includes('Вы проиграли') || message.includes('You lost')) {
        positiveMessage = t('status.youLost');
      } else if (message.includes('Ничья') || message.includes('Draw')) {
        positiveMessage = t('status.draw');
      } else if (message.includes('Ожидание хода') || message.includes('Waiting for move')) {
        positiveMessage = t('status.waiting');
      } else if (message.includes('Соединение восстановлено') || message.includes('Connection restored')) {
        positiveMessage = t('status.connectionRestored');
      }
    }
    
    result.innerHTML = `<div class="status-message success-message">
      <span>${positiveMessage}</span>
    </div>`;
    result.className = 'result success';
  }
  
  // Добавляем анимацию появления
  result.style.animation = 'none';
  result.offsetHeight; // Trigger reflow
  result.style.animation = 'resultPulse 0.5s ease-in-out';
}

// Обновление текста кнопки в зависимости от ввода
function updateButton() {
  const roomInput = document.getElementById('room');
  const actionButton = document.getElementById('actionButton');
  
  if (!roomInput || !actionButton) return;
  
  const roomValue = roomInput.value.trim();
  const buttonText = actionButton.querySelector('span');
  
  if (roomValue === '') {
    buttonText.textContent = t('room.create');
    actionButton.className = 'action-btn';
  } else if (roomValue.length === 4 && /^\d{4}$/.test(roomValue)) {
    buttonText.textContent = t('room.join');
    actionButton.className = 'action-btn';
  } else {
    buttonText.textContent = t('room.enterCode');
    actionButton.className = 'action-btn';
  }
}

// Обработка действий с кнопкой
async function handleAction() {
  const roomInput = document.getElementById('room');
  const actionButton = document.getElementById('actionButton');
  
  if (!roomInput || !actionButton) return;
  
  const roomValue = roomInput.value.trim();
  
  if (roomValue === '') {
    // Создаем новую комнату
    triggerHapticFeedback('medium');
    await createRoom();
  } else if (roomValue.length === 4 && /^\d{4}$/.test(roomValue)) {
    // Присоединяемся к существующей комнате
    triggerHapticFeedback('medium');
    await joinRoom(roomValue);
  } else {
    showStatus(currentLanguage === 'ru' ? 
      '✨ Пожалуйста, введите корректный ID комнаты из 4 цифр! 🎯' :
      '✨ Please enter a valid 4-digit room ID! 🎯', true);
    triggerHapticFeedback('error');
  }
}

// Создание новой комнаты
async function createRoom() {
  if (!supabase) {
    showStatus(currentLanguage === 'ru' ? 
      '😅 Сервис не готов. Попробуйте через секунду! ⏰' :
      '😅 Service not ready. Try again in a second! ⏰', true);
    return;
  }
  
  showStatus(currentLanguage === 'ru' ? 
    '🎨 Создаём вашу уникальную комнату... ✨' :
    '🎨 Creating your unique room... ✨');
  
  try {
    // Генерируем ID игрока
    gameState.playerId = generatePlayerId();
    gameState.isPlayer1 = true;
    
    // Пытаемся создать уникальный room_id
    let room_id;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      room_id = Math.floor(1000 + Math.random() * 9000).toString();
      
      // Проверяем уникальность
      const { data: existingRoom } = await supabase
        .from('games')
        .select('room_id')
        .eq('room_id', room_id)
        .single();
      
      if (!existingRoom) {
        break; // Комната уникальна
      }
      
      attempts++;
    }
    
    if (attempts >= maxAttempts) {
      showStatus(currentLanguage === 'ru' ? 
        '😅 Слишком много комнат! Попробуйте ещё раз! 🎲' :
        '😅 Too many rooms! Try again! 🎲', true);
      return;
    }
    
    // Создаем комнату
    const gameData = {
      room_id: room_id,
      player1_id: gameState.playerId,
      player2_id: null,
      player1_choice: null,
      player2_choice: null,
      status: 'waiting_player2',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('games')
      .insert([gameData])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    // Успешно создали комнату
    gameState.currentRoom = room_id;
    gameState.gameStatus = 'waiting_player2';
    
    const roomInput = document.getElementById('room');
    if (roomInput) {
      roomInput.value = room_id;
    }
    
    // Показываем игровой интерфейс создателю комнаты
    showGameUI();
    showStatus(currentLanguage === 'ru' ? 
      `🎉 Ваша комната создана! ID: ${room_id} 🎊 Ожидание второго игрока...` :
      `🎉 Your room created! ID: ${room_id} 🎊 Waiting for second player...`);
    console.log('🏠 Комната создана, ожидание второго игрока. Статус:', gameState.gameStatus);
    subscribeToUpdates();
    
  } catch (error) {
    console.error('Ошибка создания комнаты:', error);
    showStatus(currentLanguage === 'ru' ? 
      '😅 Что-то пошло не так при создании комнаты! Попробуйте ещё раз! 🔄' :
      '😅 Something went wrong creating the room! Try again! 🔄', true);
  }
}

// Присоединение к комнате
async function joinRoom(roomId) {
  if (!supabase) {
    showStatus(currentLanguage === 'ru' ? 
      '😅 Сервис не готов. Попробуйте через секунду! ⏰' :
      '😅 Service not ready. Try again in a second! ⏰', true);
    return;
  }
  
  showStatus(currentLanguage === 'ru' ? 
    '🚀 Присоединяемся к игре... ✨' :
    '🚀 Joining the game... ✨');
  
  try {
    // Проверяем существование комнаты
    const { data: room, error: selectError } = await supabase
      .from('games')
      .select('*')
      .eq('room_id', roomId)
      .single();
    
    if (selectError) {
      showStatus(currentLanguage === 'ru' ? 
        '😅 Комната не найдена! Проверьте ID! 🔍' :
        '😅 Room not found! Check the ID! 🔍', true);
      return;
    }
    
    if (room.player2_id) {
      showStatus(currentLanguage === 'ru' ? 
        '😅 Комната уже заполнена! Попробуйте другую! 🎪' :
        '😅 Room is already full! Try another one! 🎪', true);
      return;
    }
    
    // Присоединяемся к комнате
    gameState.playerId = generatePlayerId();
    gameState.isPlayer1 = false;
    
    const { data, error } = await supabase
      .from('games')
      .update({
        player2_id: gameState.playerId,
        status: 'ready',
        updated_at: new Date().toISOString()
      })
      .eq('room_id', roomId)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    // Успешно присоединились
    gameState.currentRoom = roomId;
    gameState.gameStatus = 'ready';
    
    showGameUI();
    showStatus(currentLanguage === 'ru' ? 
      '🎊 Отлично! Вы присоединились к игре! Удачи! 🍀' :
      '🎊 Great! You joined the game! Good luck! 🍀');
    subscribeToUpdates();
    
  } catch (error) {
    console.error('Ошибка присоединения:', error);
    showStatus(currentLanguage === 'ru' ? 
      '😅 Не удалось присоединиться! Попробуйте ещё раз! 🔄' :
      '😅 Failed to join! Try again! 🔄', true);
  }
}

// Генерация ID игрока
function generatePlayerId() {
  return 'player_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Вспомогательная функция для показа загрузки
function showLoader(show) {
  const actionButton = document.getElementById('actionButton');
  if (actionButton) {
    actionButton.disabled = show;
    if (show) {
      const buttonText = actionButton.querySelector('span');
      if (buttonText) {
        buttonText.textContent = currentLanguage === 'ru' ? '⏳ Загружаем...' : '⏳ Loading...';
      }
    }
  }
}

/**
 * Выход из игры и возврат на главный экран
 * Очищает состояние игры и показывает главное меню
 */
async function exitGame() {
  console.log('🚪 Выход из игры...');
  
  // Тактильная обратная связь при выходе
  triggerHapticFeedback('light');
  
  try {
    // Полная очистка состояния
    await fullCleanup();
    
    // Сброс состояния игры
    gameState.currentRoom = null;
    gameState.playerId = null;
    gameState.isPlayer1 = false;
    gameState.myChoice = null;
    gameState.opponentChoice = null;
    gameState.gameStatus = 'idle';
    gameState.playingWithBot = false;
    
    // Скрываем игровые элементы
    const choices = document.getElementById('choices');
    const result = document.getElementById('result');
    const roomControls = document.querySelector('.room-controls');
    const roomInput = document.getElementById('room');
    const actionButton = document.getElementById('actionButton');
    
    if (choices) choices.style.display = 'none';
    if (result) {
      result.innerHTML = '';
      result.className = 'result';
    }
    
    // Показываем поле комнаты обратно
    if (roomControls) {
      roomControls.classList.remove('hidden');
    }
    
    if (roomInput) {
      roomInput.value = '';
      roomInput.disabled = false;
    }
    if (actionButton) {
      actionButton.style.display = 'block';
      const buttonText = actionButton.querySelector('span');
      if (buttonText) {
        buttonText.textContent = t('room.create');
      }
      actionButton.disabled = false;
    }
    
    showStatus(currentLanguage === 'ru' ? 
      "Добро пожаловать! Создайте комнату или присоединитесь к существующей." :
      "Welcome! Create a room or join an existing one.");
    
  } catch (error) {
    console.error('Ошибка при выходе из игры:', error);
    showStatus(currentLanguage === 'ru' ? 
      "Произошла ошибка при выходе из игры" :
      "An error occurred while exiting the game", true);
  }
}

/**
 * Показывает результат игры с цветовым различием и выбором соперника
 * @param {Object} result - результат игры от determineWinner
 * @param {string} myChoice - мой выбор
 * @param {string} opponentChoice - выбор соперника
 * @param {string} opponentName - имя соперника (Бот/Оппонент)
 */
function showGameResult(result, myChoice, opponentChoice, opponentName) {
  const resultElement = document.getElementById('result');
  if (!resultElement) return;
  
  // Определяем иконки для выборов
  const choiceIcons = {
    'камень': '🪨',
    'ножницы': '✂️',
    'бумага': '📄'
  };
  
  // Определяем переводы для выборов
  const choiceTranslations = {
    'камень': t('choices.rock'),
    'ножницы': t('choices.scissors'),
    'бумага': t('choices.paper')
  };
  
  // Определяем класс для цветового различия
  let resultClass = 'result';
  if (result.winner === 'me') {
    resultClass += ' win';
  } else if (result.winner === 'draw') {
    resultClass += ' draw';
  } else {
    resultClass += ' lose';
  }
  
  // Создаем HTML для отображения результата
  const resultHTML = `
    <div class="status-message">
      <div style="font-size: 1.2rem; margin-bottom: 1rem;">
        ${result.message}
      </div>
      <div class="choices-display">
        <div class="player-choice">
          <span class="choice-icon">${choiceIcons[myChoice]}</span>
          <div class="choice-label">${currentLanguage === 'ru' ? 'Вы' : 'You'}: ${choiceTranslations[myChoice]}</div>
        </div>
        <div class="player-choice">
          <span class="choice-icon">${choiceIcons[opponentChoice]}</span>
          <div class="choice-label">${opponentName}: ${choiceTranslations[opponentChoice]}</div>
        </div>
      </div>
    </div>
  `;
  
  resultElement.innerHTML = resultHTML;
  resultElement.className = resultClass;
  
  // Обновляем статистику
  updateStats(result);
  
  // Тактильная обратная связь в зависимости от результата
  if (result.winner === 'me') {
    triggerHapticFeedback('success');
  } else if (result.winner === 'opponent') {
    triggerHapticFeedback('error');
  } else {
    triggerHapticFeedback('medium');
  }
  
  // Добавляем анимацию появления
  resultElement.style.animation = 'none';
  resultElement.offsetHeight; // Trigger reflow
  resultElement.style.animation = 'resultPulse 0.5s ease-in-out';
}
