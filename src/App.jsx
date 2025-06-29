import React, { useState, useEffect, useRef, createContext, useContext, useMemo, useCallback } from 'react';

// --- Translation Context ---
const LanguageContext = createContext();

// Translation data
const translations = {
  de: {
    // General
    confirm: 'Bestätigen',
    cancel: 'Abbrechen',
    close: 'Schließen',
    save: 'Speichern',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    addImage: 'Bild hinzufügen',
    addImageCamera: 'Bild hinzufügen (Kamera)',
    addVideo: 'Video hinzufügen',
    addHashtag: 'Hashtag hinzufügen',
    imageTooLarge: 'Bilddatei zu groß (max. 5MB).',
    errorReadingImage: 'Fehler beim Lesen der Bilddatei:',
    errorUploadingImage: 'Fehler beim Hochladen des Bildes.',
    videoLink: 'Video-Link',
    postCreatedSuccess: 'Beitrag erfolgreich erstellt!',
    postIsEmpty: 'Bitte gib Text, ein Bild oder einen Video-Link ein.',
    replies: 'Antworten',
    noRepliesYet: 'Noch keine Antworten.',
    unknownUser: 'Unbekannter Nutzer',
    editReply: 'Antwort bearbeiten',
    deleteReply: 'Antwort löschen',
    replyIsEmpty: 'Antwort kann nicht leer sein. Bitte gib Text, ein Bild oder einen Video-Link ein.',
    replySuccess: 'Antwort erfolgreich hinzugefügt!',
    back: 'Zurück',
    postNotFound: 'Beitrag nicht gefunden.',
    likes: 'Gefällt mir-Angaben',
    postImage: 'Beitrag Bild',
    replyImage: 'Antwort Bild',
    imageNotFound: 'Bild nicht gefunden',
    postButton: 'Posten', // Used for both new posts and replies

    // Greetings
    goodMorning: 'Guten Morgen',
    goodAfternoon: 'Guten Mittag',
    goodEvening: 'Guten Abend',
    goodNight: 'Gute Nacht',

    // App messages
    migratingOldData: 'Alte Daten werden migriert...',
    errorMigratingData: 'Fehler bei der Datenmigration.',
    errorLoadingIndexedDB: 'Fehler beim Laden aus IndexedDB. Versuche localStorage...',
    dataMigrationComplete: 'Datenmigration abgeschlossen!',
    dataImportSuccess: 'Daten erfolgreich importiert und geladen!',
    errorAddingPost: 'Fehler beim Hinzufügen des Beitrags:',
    errorUpdatingPost: 'Fehler beim Aktualisieren des Beitrags in IndexedDB:',
    errorDeletingPost: 'Fehler beim Löschen des Beitrags:',
    confirmDeletePost: 'Möchtest du diesen Beitrag wirklich löschen? Dadurch werden auch alle zugehörigen Antworten unwiderruflich gelöscht.',
    confirmDeleteReply: 'Möchtest du diese Antwort wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
    errorImportingData: 'Fehler beim Importieren der Daten:',
    invalidJsonFormat: 'Fehler beim Importieren der Daten: Ungültiges JSON-Format.',
    noFileSelected: 'Keine Datei ausgewählt.',
    errorReadingFile: 'Fehler beim Lesen der Datei.',
    invalidDataFormat: 'Ungültiges Datenformat für den Import. Bitte eine gültige Tagebuch-JSON-Datei auswählen.',


    // Navigation
    home: 'Startseite',
    profile: 'Profil',
    search: 'Suche',
    settings: 'Einstellungen',

    // PostForm
    whatsHappening: 'Was passiert gerade?',
    post: 'Posten', // Redundant with postButton, but keeping for now if used elsewhere
    selectedImage: 'Ausgewähltes Bild',

    // Profile Page
    yourProfile: 'Dein Profil',
    selectImage: 'Bild auswählen',
    removeImage: 'Bild entfernen',
    changeName: 'Namen ändern',
    nameChangedSuccess: 'Name erfolgreich geändert!',
    nameCannotBeEmpty: 'Name darf nicht leer sein.',
    posts: 'Beiträge:',
    myPosts: 'Meine Beiträge',
    noPostsOnProfile: 'Noch keine Beiträge auf deinem Profil.',

    // Settings Page
    settingsTitle: 'Einstellungen',
    darkMode: 'Dark Mode',
    dataManagement: 'Datenverwaltung',
    exportData: 'Daten exportieren',
    importData: 'Daten importieren',
    darkModeOff: 'Der Dark Mode ist deaktiviert. Die App wird immer im hellen Design angezeigt.',
    darkModeAuto: 'Der Dark Mode wird automatisch zwischen 20:00 Uhr abends und 06:00 Uhr morgens aktiviert.',
    darkModeOn: 'Der Dark Mode ist immer aktiviert. Die App wird durchgehend im dunklen Design angezeigt.',
    dataExportSuccess: 'Daten erfolgreich exportiert!',
    language: 'Sprache', // New translation key
    darkModeOffLabel: 'Aus', // New translation key
    darkModeAutoLabel: 'Auto', // New translation key
    darkModeOnLabel: 'An', // New translation key

    // HashtagSelector
    selectHashtags: 'Hashtags auswählen',
    filterHashtags: 'Hashtags filtern...',
    noHashtagsFound: 'Keine Hashtags gefunden.',

    // Search Page
    searchPosts: 'Suche Beiträge',
    searchPostsPlaceholder: 'Nach Beiträgen suchen...',
    matchingReplies: 'Passende Antworten:',
    searchResults: 'Suchergebnisse',
    filter: 'Filter:',
    clearFilter: 'Filter löschen',
    noPostsMatchingSearch: 'Keine Beiträge gefunden, die deiner Suche entsprechen.',
    hashtags: 'Hashtags',
    noPostsYet: 'Noch keine Beiträge. Starte jetzt!',
  },
  en: {
    // General
    confirm: 'Confirm',
    cancel: 'Cancel',
    close: 'Close',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    addImage: 'Add Image',
    addImageCamera: 'Add Image (Camera)',
    addVideo: 'Add Video',
    addHashtag: 'Add Hashtag',
    imageTooLarge: 'Image file too large (max. 5MB).',
    errorReadingImage: 'Error reading image file:',
    errorUploadingImage: 'Error uploading image.',
    videoLink: 'Video link',
    postCreatedSuccess: 'Post created successfully!',
    postIsEmpty: 'Please enter text, an image, or a video link.',
    replies: 'Replies',
    noRepliesYet: 'No replies yet.',
    unknownUser: 'Unknown User',
    editReply: 'Edit Reply',
    deleteReply: 'Delete Reply',
    replyIsEmpty: 'Reply cannot be empty. Please enter text, an image, or a video link.',
    replySuccess: 'Reply added successfully!',
    back: 'Back',
    postNotFound: 'Post not found.',
    likes: 'Likes',
    postImage: 'Post Image',
    replyImage: 'Reply Image',
    imageNotFound: 'Image not found',
    postButton: 'Post', // New translation key for reply submit button

    // Greetings
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    goodNight: 'Good Night',

    // App messages
    migratingOldData: 'Migrating old data...',
    errorLoadingIndexedDB: 'Error loading from IndexedDB. Trying localStorage...',
    dataMigrationComplete: 'Data migration complete!',
    dataImportSuccess: 'Data imported and loaded successfully!',
    errorAddingPost: 'Error adding post:',
    errorUpdatingPost: 'Error updating post in IndexedDB:',
    errorDeletingPost: 'Error deleting post:',
    confirmDeletePost: 'Are you sure you want to delete this post? All associated replies will be permanently deleted.',
    confirmDeleteReply: 'Are you sure you want to delete this reply? This action cannot be undone.',
    errorImportingData: 'Error importing data:',
    invalidJsonFormat: 'Error importing data: Invalid JSON format.',
    noFileSelected: 'No file selected.',
    errorReadingFile: 'Error reading file.',
    invalidDataFormat: 'Invalid data format for import. Please select a valid diary JSON file.',


    // Navigation
    home: 'Home',
    profile: 'Profile',
    search: 'Search',
    settings: 'Settings',

    // PostForm
    whatsHappening: 'What\'s happening?',
    post: 'Post',
    selectedImage: 'Selected image',

    // Profile Page
    yourProfile: 'Your Profile',
    selectImage: 'Select Image',
    removeImage: 'Remove Image',
    changeName: 'Change Name',
    nameChangedSuccess: 'Name changed successfully!',
    nameCannotBeEmpty: 'Name cannot be empty.',
    posts: 'Posts:',
    myPosts: 'My Posts',
    noPostsOnProfile: 'No posts on your profile yet.',

    // Settings Page
    settingsTitle: 'Settings',
    darkMode: 'Dark Mode',
    dataManagement: 'Data Management',
    exportData: 'Export Data',
    importData: 'Import Data',
    darkModeOff: 'Dark Mode is disabled. The app will always be displayed in the light theme.',
    darkModeAuto: 'Dark Mode is automatically activated between 8 PM and 6 AM.',
    darkModeOn: 'Dark Mode is always enabled. The app will constantly be displayed in the dark theme.',
    dataExportSuccess: 'Data exported successfully!',
    language: 'Language', // New translation key
    darkModeOffLabel: 'Off', // New translation key
    darkModeAutoLabel: 'Auto', // New translation key
    darkModeOnLabel: 'On', // New translation key

    // HashtagSelector
    selectHashtags: 'Select Hashtags',
    filterHashtags: 'Filter hashtags...',
    noHashtagsFound: 'No hashtags found.',

    // Search Page
    searchPosts: 'Search Posts',
    searchPostsPlaceholder: 'Search posts...',
    matchingReplies: 'Matching replies:',
    searchResults: 'Search Results',
    filter: 'Filter:',
    clearFilter: 'Clear Filter',
    noPostsMatchingSearch: 'No posts found matching your search.',
    hashtags: 'Hashtags',
    noPostsYet: 'No posts yet. Start now!',
  },
};

// Custom hook to use translations
const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  const { language, setLanguage, t } = context; // t is now provided by the context
  return { language, setLanguage, t };
};


// --- Theme Context ---
const ThemeContext = createContext();

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  // KORREKTUR: darkModeSetting wird nun direkt aus localStorage initialisiert
  const [darkModeSetting, setDarkModeSetting] = useState(() => localStorage.getItem('darkModeSetting') || 'auto');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to determine dark mode state based on setting and time
  const determineIsDarkMode = useCallback((setting) => {
    const hour = new Date().getHours();
    if (setting === 'on') {
      return true;
    }
    if (setting === 'off') {
      return false;
    }
    // 'auto' mode: Dark from 20:00 to 06:00
    return hour >= 20 || hour < 6;
  }, []);

  useEffect(() => {
    // KORREKTUR: Initiales Laden des darkModeSetting beim Mounten
    try {
      const storedSetting = localStorage.getItem('darkModeSetting') || 'auto';
      setDarkModeSetting(storedSetting); // Hier wird der State aktualisiert
      setIsDarkMode(determineIsDarkMode(storedSetting));
    } catch (error) {
      setDarkModeSetting('auto'); // Fallback to 'auto'
      setIsDarkMode(determineIsDarkMode('auto'));
    }
  }, [determineIsDarkMode]); // Abhängigkeit hinzugefügt

  // Update dark mode state whenever setting changes
  useEffect(() => {
    setIsDarkMode(determineIsDarkMode(darkModeSetting));
    localStorage.setItem('darkModeSetting', darkModeSetting);
  }, [darkModeSetting, determineIsDarkMode]); // Abhängigkeit hinzugefügt

  // Effect to apply/remove 'dark' class to the html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Optional: Update theme hourly for 'auto' mode (less critical, but ensures dynamic switch)
  useEffect(() => {
    const interval = setInterval(() => {
      if (darkModeSetting === 'auto') {
        setIsDarkMode(determineIsDarkMode('auto'));
      }
    }, 1000 * 60 * 60); // Check every hour
    return () => clearInterval(interval);
  }, [darkModeSetting, determineIsDarkMode]);


  return (
    <ThemeContext.Provider value={{ darkModeSetting, setDarkModeSetting, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
const useTheme = () => useContext(ThemeContext);


// Utility function to get a unique ID
const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

// Utility function to extract hashtags from text
const extractHashtags = (text) => {
  if (!text) return [];
  const matches = text.match(/#([\p{L}\p{N}_]+)/gu);
  return matches ? [...new Set(matches.map(tag => tag.toLowerCase()))] : [];
};

// Utility function to replace hashtags with clickable spans
// Accepts 't' as an argument, so it doesn't call useTranslation internally
const renderTextWithHashtags = (text, onHashtagClick, t) => {
  if (!text) return null;
  const parts = text.split(/(#[\p{L}\p{N}_]+)/gu);
  return parts.map((part, index) => {
    if (part.startsWith('#')) {
      const hashtag = part.toLowerCase();
      return (
        <span
          key={index}
          className="text-blue-600 dark:text-blue-300 cursor-pointer hover:underline"
          onClick={(e) => { e.stopPropagation(); onHashtagClick(hashtag); }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

// Utility function to get video embed URL
const getVideoEmbedUrl = (url) => {
  if (!url) return null;

  // YouTube
  const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/||v\/|)([\w-]{11})(?:\S+)?/);
  if (youtubeMatch && youtubeMatch[1]) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0`;
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/|)(\d+)(?:\S+)?/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=0`;
  }

  // Reddit (native Video-Posts)
  const redditMatch = url.match(/(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/[^/]+\/comments\/([a-z0-9]+)\//);
  if (redditMatch && redditMatch[1]) {
    return `https://www.redditmedia.com/r/video/comments/${redditMatch[1]}/?ref_source=embed&ref=share&embed=true`;
  }

  // TikTok
  const tiktokMatch = url.match(/(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tiktokMatch && tiktokMatch[1]) {
    return `https://www.tiktok.com/embed/${tiktokMatch[1]}`;
  }

  // Instagram (Reels oder Videos)
  const instaMatch = url.match(/(?:https?:\/\/)?(?:www\.)?instagram\.com\/(reel|p|tv)\/([\w-]+)/);
  if (instaMatch && instaMatch[2]) {
    return `https://www.instagram.com/${instaMatch[1]}/${instaMatch[2]}/embed`;
  }

  // Basic check for direct video files (less common for user input, but good to have)
  if (url.match(/\.(mp4|webm|ogg)$/i)) {
    return url;
  }
};

// Utility function to get recommended iframe aspect ratio
const getVideoAspectRatio = (url) => {
  if (!url) return "16/9";

  if (url.includes("youtube.com") || url.includes("youtu.be")) return "16/9";
  if (url.includes("vimeo.com")) return "16/9";
  if (url.includes("redditmedia.com")) return "16/9";
  if (url.includes("tiktok.com")) return "9/16";       // Hochformat
  if (url.includes("instagram.com")) return "9/16";    // Hochformat
  if (url.match(/\.(mp4|webm|ogg)$/i)) return "auto";  // Für Video-Tag, kannst anders behandeln

  return "16/9"; // Default
};

const VideoPlayer = ({ url }) => {
  const embedUrl = getVideoEmbedUrl(url);
  if (!embedUrl) return null;

  const isDirectVideo = url.match(/\.(mp4|webm|ogg)$/i);

  // Hier bekommst du das Seitenverhältnis (z.B. "16/9" oder "9/16")
  const aspectRatio = getVideoAspectRatio(embedUrl);

  return (
    <div className="my-2 p-2 bg-gray-100 rounded-lg shadow-inset-md dark:bg-neutral-900 transition-colors duration-500">
      {isDirectVideo ? (
        <video controls className="w-full h-auto rounded-lg">
          <source src={embedUrl} type={`video/${embedUrl.split('.').pop()}`} />
          Ihr Browser unterstützt das Video-Tag nicht.
        </video>
      ) : (
        <div
          className={`w-full rounded-lg overflow-hidden aspect-[${aspectRatio}]`}
          // Falls du kein Tailwind hast oder Probleme mit Arbitrary Values:
          // style={{ aspectRatio: aspectRatio === "auto" ? undefined : aspectRatio }}
        >
          <iframe
            className="w-full h-full"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded video"
          />
        </div>
      )}
    </div>
  );
};

// HashtagSelector Component
const HashtagSelector = ({ hashtags, onSelect, onClose, t }) => { // Added t prop
  const [filterText, setFilterText] = useState('');
  const filteredHashtags = useMemo(() => {
    return hashtags.filter(tag => tag.includes(filterText.toLowerCase()));
  }, [hashtags, filterText]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-100/50 z-[100] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden dark:bg-neutral-900/50 transition-colors duration-500">
      <div className="bg-gray-100 rounded-2xl shadow-outset-lg p-8 sm:p-10 w-full max-w-2xl mx-auto flex flex-col dark:bg-neutral-900 transition-colors duration-500 max-h-[90vh]">
        <div className="flex justify-between items-center w-full mb-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-neutral-100">{t('selectHashtags')}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 shadow-outset-lg text-gray-600 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-neutral-200"
            title={t('close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <input
          type="text"
          className="w-full p-3 mb-4 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-600"
          placeholder={t('filterHashtags')}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <div className="flex-1 w-full overflow-y-auto flex flex-col gap-3 px-4 pt-4 pb-8"> {/* Added px-4 pt-4 here */}
          {filteredHashtags.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full mt-4 dark:text-neutral-400">{t('noHashtagsFound')}</p>
          ) : (
            filteredHashtags.map(tag => (
              <button
                key={tag}
                onClick={() => onSelect(tag)}
                className="px-6 py-4 rounded-xl bg-gray-100 shadow-outset-lg text-blue-700 font-semibold neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
              >
                {tag}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


// ConfirmationDialog Component
const ConfirmationDialog = ({ message, onConfirm, onCancel, t }) => { // Added t prop
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-100/50 z-[100] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden dark:bg-neutral-900/50 transition-colors duration-500">
      <div className="bg-gray-100 rounded-2xl shadow-outset-lg p-8 sm:p-10 w-full max-w-sm mx-auto flex flex-col dark:bg-neutral-900 transition-colors duration-500">
        <p className="text-xl text-gray-700 mb-6 text-center dark:text-neutral-100">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-xl bg-red-100 shadow-outset-lg text-red-700 font-bold neumorphic-btn-active-press transition-all duration-200 dark:bg-red-800 dark:text-red-200"
          >
            {t('confirm')}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-xl bg-gray-100 shadow-outset-lg text-gray-600 font-bold neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-neutral-200"
          >
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};


// PostForm Component (Jetzt ein modales Fenster)
const PostForm = ({ onAddPost, onClose, userName, allAvailableHashtags, profileImageUrl, t }) => {
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideoInput, setShowVideoInput] = useState(false); // Neuer Status zur Steuerung der Video-Eingabesichtbarkeit
  const [message, setMessage] = useState('');
  const [showHashtagSelector, setShowHashtagSelector] = useState(false); // Neuer Status für die Hashtag-Selektor-Sichtbarkeit
  const messageTimeoutRef = useRef(null);
  const imageInputRef = useRef(null); // Ref für die Bilddatei-Eingabe
  const cameraInputRef = useRef(null); // Ref für die Kamera-Eingabe
  const textareaRef = useRef(null); // Ref für das Textarea-Element
  const [showMoreOptions, setShowMoreOptions] = useState(false); // Neuer Status für das Mehr-Optionen-Dropdown
  const moreOptionsRef = useRef(null); // Neuer Ref für das Mehr-Optionen-Dropdown

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
    }, 3000); // Nachricht verschwindet nach 3 Sekunden
  };

  // Effekt zur automatischen Größenanpassung des Textbereichs
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Höhe zurücksetzen für korrekte scrollHeight-Berechnung

      // Zielgesamthöhe für eine einzelne Zeile (40px)
      const targetTotalHeight = 40; // Entspricht h-10 (2.5rem) in Tailwind

      // Ursprüngliche scrollHeight, wenn leer oder mit einem einzelnen Zeichen
      const initialScrollHeight = textareaRef.current.scrollHeight;

      // Kleiner Schwellenwert, um potenzielle gebrochene Pixel-Renderings zu berücksichtigen
      const threshold = 2;

      if (text.trim() === '') {
        // Wenn leer, auf exakt 40px erzwingen
        textareaRef.current.style.height = `${targetTotalHeight}px`;
      } else if (initialScrollHeight > targetTotalHeight + threshold) {
        // Wenn Inhalt tatsächlich mehr Platz als 40px benötigt (z.B. Umbruch in die nächste Zeile)
        textareaRef.current.style.height = `${initialScrollHeight}px`;
      } else {
        // Wenn Inhalt innerhalb von 40px passt oder nur leicht überschritten wird, auf 40px erzwingen
        textareaRef.current.style.height = `${targetTotalHeight}px`;
      }
      textareaRef.current.style.overflow = 'hidden'; // Scrollleiste immer ausblenden
    }
  }, [text]); // Bei jeder Textänderung erneut ausführen

  // Effekt zum Schließen des "More Options"-Dropdowns beim Klicken außerhalb
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Wenn das Dropdown sichtbar ist UND der Klick außerhalb des Dropdowns UND nicht auf den "..." Button erfolgte
      // Die Prüfung auf event.target.closest('.neumorphic-btn-active-press') stellt sicher, dass der Klick auf den "..." Button selbst
      // das Dropdown nicht sofort wieder schließt.
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target) && !event.target.closest('.neumorphic-btn-active-press')) {
        setShowMoreOptions(false);
      }
    };

    // Event Listener beim Mounten hinzufügen
    document.addEventListener('mousedown', handleClickOutside);

    // Event Listener beim Unmounten entfernen
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreOptionsRef]); // Abhängigkeit von moreOptionsRef

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB Limit
      showMessage(t('imageTooLarge'), true);
      setImageFile(null);
      e.target.value = ''; // Dateieingabe leeren
      return;
    }
    setImageFile(file);
    // Andere Medieneingaben automatisch leeren, wenn ein Bild ausgewählt wird
    setVideoUrl('');
    setShowVideoInput(false); // Video-Eingabe ausblenden, wenn Bild ausgewählt wird
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
    // Bildauswahl automatisch leeren, wenn Video-URL eingegeben wird
    setImageFile(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const handleSelectHashtag = (hashtag) => {
    setText(prevText => `${prevText} ${hashtag} `); // Hashtag mit Leerzeichen hinzufügen
    setShowHashtagSelector(false); // Selektor schließen
  };

  const handleSubmit = async () => {
    if (!text.trim() && !imageFile && !videoUrl.trim()) {
      showMessage(t('postIsEmpty'), true);
      return;
    }

    let imageUrl = null;
    if (imageFile) {
      try {
        imageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      } catch (error) {
        showMessage(t('errorUploadingImage'), true);
        return;
      }
    }

    const hashtags = extractHashtags(text); // Hashtags aus dem Text extrahieren

    const newPost = {
      id: generateUniqueId(),
      text,
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('de-DE'), // Format: HH:MM - TT.MM.JJJJ
      likes: 0,
      imageUrl,
      videoUrl: videoUrl.trim(),
      replies: [],
      likedBy: [], // Array zum Speichern von Benutzer-IDs, die diesen Beitrag geliked haben
      hashtags: hashtags, // Extrahierte Hashtags speichern
    };

    onAddPost(newPost);
    setText('');
    setImageFile(null);
    setVideoUrl('');
    setShowVideoInput(false); // Video-Eingabe nach dem Posten ausblenden
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
    showMessage(t('postCreatedSuccess'));
    onClose(); // Modal nach erfolgreichem Posten schließen
  };

  const toggleVideoInput = () => {
    setShowVideoInput(prev => !prev);
    // Wenn ausgeschaltet wird, Video-URL leeren
    if (showVideoInput) {
      setVideoUrl('');
    }
    // Bildauswahl immer leeren, wenn Video-Eingabe umgeschaltet wird
    setImageFile(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const showSubmitButton = text.trim() !== '' || imageFile || videoUrl.trim() !== '';

  return (
    <>
      {showHashtagSelector && (
        <HashtagSelector
          hashtags={allAvailableHashtags}
          onSelect={handleSelectHashtag}
          onClose={() => setShowHashtagSelector(false)}
          t={t} // t weitergeben
        />
      )}

      <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col p-4 sm:p-8 overflow-hidden dark:bg-neutral-900 transition-colors duration-500">
        {/* Obere Leiste (nur Schließen-Button und Benutzerinfo) */}
        <div className="flex justify-between items-center w-full max-w-2xl mx-auto mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 shadow-outset-lg text-gray-600 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-neutral-200"
              title={t('close')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* PROFILBILD / INITIALEN IM POST-FORMULAR */}
            {profileImageUrl ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={profileImageUrl}
                  alt={t('profile')}
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.3)] pointer-events-none" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-lg font-bold shadow-inset-md dark:bg-blue-800 dark:text-blue-200">
                {userName ? userName[0].toUpperCase() : 'P'}
              </div>
            )}
          </div>
          {/* Post-Button nach unten verschoben */}
        </div>

        {/* Hauptinhaltsbereich (Textarea) */}
        <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col">
          <textarea
            ref={textareaRef}
            className="flex-1 w-full p-3 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-600"
            placeholder={t('whatsHappening')}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          {imageFile && (
            <div className="my-2 p-2 bg-gray-100 rounded-lg shadow-inset-md relative dark:bg-neutral-900">
              <img src={URL.createObjectURL(imageFile)} alt={t('selectedImage')} className="w-full h-auto rounded-lg max-h-48 object-contain" />
              <button
                onClick={() => { setImageFile(null); if (imageInputRef.current) imageInputRef.current.value = ''; if (cameraInputRef.current) cameraInputRef.current.value = ''; }}
                className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 shadow-outset-lg text-gray-600 neumorphic-btn-active-press dark:bg-neutral-700 dark:text-neutral-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          <input
            type="text"
            className={`w-full p-3 mt-2 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 ${showVideoInput ? 'block' : 'hidden'} dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-600`} // Gesteuert durch showVideoInput
            placeholder={t('videoLink')}
            value={videoUrl}
            onChange={handleVideoUrlChange}
          />
        </div>

        {/* Untere Aktionsleiste */}
        <div className="w-full max-w-2xl mx-auto mt-4 p-4 rounded-2xl shadow-outset-lg bg-gray-100 flex items-center dark:bg-neutral-900 relative">
          {message && (
            <div className="text-center text-sm font-semibold text-green-700 bg-green-100 p-2 rounded-xl shadow-inset-md flex-grow mx-4 dark:text-green-300 dark:bg-neutral-900">
              {message}
            </div>
          )}

          {/* Gruppe für linksbündige Buttons (Medien & Hashtags) */}
          {/* ACHTUNG: Das äußere "flex space-x-4" wurde entfernt, da das P-4 des Elternelements und die internen space-x-4 der Gruppen die Ausrichtung steuern. */}

          {/* Standard-Buttons für mittelgroße Bildschirme und größer */}
          <div className="hidden sm:flex space-x-4">
            {/* Bild-Upload-Button */}
            <label htmlFor="imageUpload-md" className={`p-3 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`} title={t('addImage')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="file"
                id="imageUpload-md"
                ref={imageInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={showVideoInput || !!videoUrl}
              />
            </label>

            {/* Kamera-Button */}
            <label htmlFor="cameraCapture-md" className={`p-3 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`} title={t('addImageCamera')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="file"
                id="cameraCapture-md"
                ref={cameraInputRef}
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageChange}
                disabled={showVideoInput || !!videoUrl}
              />
            </label>

            {/* Video-Link-Button */}
            <button
              onClick={toggleVideoInput}
              className={`p-3 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300 ${imageFile ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={t('addVideo')}
              disabled={!!imageFile}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
              </svg>
            </button>

            {/* Hashtag-Auswahl-Button - NUR ANZEIGEN, WENN HASHTAGS EXISTIEREN */}
            {allAvailableHashtags.length > 0 && (
              <button
                onClick={() => setShowHashtagSelector(true)}
                className="p-3 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
                title={t('addHashtag')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </button>
            )}
          </div>

          {/* "Mehr Optionen"-Button für kleine Bildschirme */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowMoreOptions(prev => !prev)}
              className="p-3 rounded-full bg-gray-100 shadow-outset-lg text-gray-600 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-neutral-200"
              title="Weitere Optionen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>

          {/* Schwebendes Dropdown für "Mehr Optionen" */}
          {showMoreOptions && (
            <div
              ref={moreOptionsRef}
              className="absolute bottom-full left-0 mb-3 p-4 rounded-xl shadow-outset-lg bg-gray-100 flex flex-col space-y-3 items-center dark:bg-neutral-800 z-50" // right-0 zu left-0 geändert
            >
              {/* Bild-Upload-Button */}
              <label htmlFor="imageUpload-sm" className={`w-12 h-12 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 flex items-center justify-center ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`} title={t('addImage')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="file"
                  id="imageUpload-sm"
                  ref={imageInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={showVideoInput || !!videoUrl}
                />
              </label>

              {/* Kamera-Button */}
              <label htmlFor="cameraCapture-sm" className={`w-12 h-12 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 flex items-center justify-center ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`} title={t('addImageCamera')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="file"
                  id="cameraCapture-sm"
                  ref={cameraInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={showVideoInput || !!videoUrl}
                />
              </label>

              {/* Video-Link-Button */}
              <button
                onClick={toggleVideoInput}
                className={`w-12 h-12 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300 flex items-center justify-center ${imageFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={t('addVideo')}
                disabled={!!imageFile}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                </svg>
              </button>

              {/* Hashtag-Auswahl-Button - NUR ANZEIGEN, WENN HASHTAGS EXISTIEREN */}
              {allAvailableHashtags.length > 0 && (
                <button
                  onClick={() => { setShowHashtagSelector(true); setShowMoreOptions(false); }} // Dropdown schließen, wenn der Selector geöffnet wird
                  className="w-12 h-12 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300 flex items-center justify-center"
                  title={t('addHashtag')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </button>
              )}
            </div>
          )}
          {/* Gruppe für rechtsbündigen Post-Button */}
          <div className="ml-auto">
            {showSubmitButton && (
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-700 font-bold neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
              >
                {t('postButton')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// EditPostForm Component
const EditPostForm = ({ post, onSave, onClose, userName, allAvailableHashtags, profileImageUrl, t }) => {
  const [text, setText] = useState(post.text);
  const [imageUrl, setImageUrl] = useState(post.imageUrl);
  const [videoUrl, setVideoUrl] = useState(post.videoUrl);
  const [imageFile, setImageFile] = useState(null); // For new image upload
  const [showVideoInput, setShowVideoInput] = useState(!!post.videoUrl); // Initialize based on existing videoUrl
  const [message, setMessage] = useState('');
  const [showHashtagSelector, setShowHashtagSelector] = useState(false);
  const messageTimeoutRef = useRef(null);
  const imageInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const textareaRef = useRef(null); // Ref for the textarea element
  const [showMoreOptions, setShowMoreOptions] = useState(false); // New state for the "More Options" dropdown
  const moreOptionsRef = useRef(null); // New Ref for the "More Options" dropdown


  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  // Effect to auto-resize the textarea and control initial height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height for true scrollHeight calculation

      // Define the target total height for a single line (40px)
      const targetTotalHeight = 40; // Corresponds to h-10 (2.5rem)

      // Get initial scrollHeight when
      const initialScrollHeight = textareaRef.current.scrollHeight;

      // Adding a small threshold to account for potential fractional pixel rendering
      const threshold = 2;

      if (text.trim() === '') {
        // If empty, force to exact 40px
        textareaRef.current.style.height = `${targetTotalHeight}px`;
      } else if (initialScrollHeight > targetTotalHeight + threshold) {
        // If content genuinely needs more space than 40px (e.g., wraps to next line)
        textareaRef.current.style.height = `${initialScrollHeight}px`;
      } else {
        // If content fits within 40px, or is only slightly over due to rendering quirks, force to 40px
        textareaRef.current.style.height = `${targetTotalHeight}px`;
      }
      textareaRef.current.style.overflow = 'hidden'; // Always hide scrollbar
    }
  }, [text]); // Re-run whenever text changes

  // Effect to close the "More Options" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the dropdown is visible AND the click is outside the dropdown AND not on the "..." button itself
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target) && !event.target.closest('.neumorphic-btn-active-press')) {
        setShowMoreOptions(false);
      }
    };

    // Add event listener on mount
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreOptionsRef]); // Dependency on moreOptionsRef


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showMessage(t('imageTooLarge'), true);
        setImageFile(null);
        e.target.value = '';
        return;
      }
      setImageFile(file);
      setImageUrl(null); // Clear existing image URL if new file is selected
      setVideoUrl(''); // Clear video if image selected
      setShowVideoInput(false); // Hide video input if image is selected
    }
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
    setImageFile(null); // Clear image if video URL entered
    setImageUrl(null); // Clear existing image URL
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setImageFile(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (cameraInputRef.current) imageInputRef.current.value = '';
  };

  const handleRemoveVideo = () => {
    setVideoUrl('');
    setShowVideoInput(false); // Hide video input after removing video
  };

  const handleSelectHashtag = (hashtag) => {
    setText(prevText => `${prevText} ${hashtag} `);
    setShowHashtagSelector(false);
  };

  const handleSubmit = async () => {
    if (!text.trim() && !imageUrl && !imageFile && !videoUrl.trim()) {
      showMessage(t('postIsEmpty'), true);
      return;
    }

    let finalImageUrl = imageUrl;
    if (imageFile) {
      try {
        finalImageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      } catch (error) {
        showMessage(t('errorUploadingImage'), true);
        return;
      }
    }

    const hashtags = extractHashtags(text);

    const updatedPost = {
      ...post,
      text,
      imageUrl: finalImageUrl,
      videoUrl: videoUrl.trim(),
      hashtags,
    };
    onSave(updatedPost);
    onClose();
  };

  const toggleVideoInput = () => {
    setShowVideoInput(prev => !prev);
    if (showVideoInput) { // If it was visible and now hiding, clear URL
      setVideoUrl('');
    }
    setImageFile(null);
    setImageUrl(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const showSubmitButton = text.trim() !== '' || imageUrl || imageFile || videoUrl.trim() !== '';


  return (
    <>
      {showHashtagSelector && (
        <HashtagSelector
          hashtags={allAvailableHashtags}
          onSelect={handleSelectHashtag}
          onClose={() => setShowHashtagSelector(false)}
          t={t} // Pass t
        />
      )}

      <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col p-4 sm:p-8 overflow-hidden dark:bg-neutral-900 transition-colors duration-500">
        {/* Top Bar */}
        <div className="flex justify-between items-center w-full max-w-2xl mx-auto mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 shadow-outset-lg text-gray-600 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-neutral-200"
              title={t('close')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {profileImageUrl ? (
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={profileImageUrl}
                  alt={t('profile')}
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.3)] pointer-events-none" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-lg font-bold shadow-inset-md dark:bg-blue-800 dark:text-blue-200">
                {userName ? userName[0].toUpperCase() : 'P'}
              </div>
            )}
          </div>
          {/* Save button moved to bottom */}
        </div>

        {/* Main Content Area (Textarea) */}
        <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col">
          <textarea
            ref={textareaRef}
            className="flex-1 w-full p-3 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-600"
            placeholder={t('whatsHappening')}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
           {(imageUrl || imageFile) && (
            <div className="my-2 p-2 bg-gray-100 rounded-lg shadow-inset-md relative dark:bg-neutral-900">
                <img src={imageFile ? URL.createObjectURL(imageFile) : imageUrl} alt={t('selectedImage')} className="w-full h-auto rounded-lg max-h-48 object-contain" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/CCCCCC/333333?text=' + t('imageNotFound'); }} />
                <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 shadow-outset-lg text-gray-600 neumorphic-btn-active-press dark:bg-neutral-700 dark:text-neutral-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
          )}
          {videoUrl && (
                        <div className="my-2 p-2 bg-gray-100 rounded-lg shadow-inset-md relative dark:bg-neutral-900">
                            <VideoPlayer url={videoUrl} />
                            <button
                                onClick={handleRemoveVideo}
                                className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 shadow-outset-lg text-gray-600 neumorphic-btn-active-press dark:bg-neutral-700 dark:text-neutral-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                    <input
            type="text"
            className={`w-full p-3 mt-2 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 ${showVideoInput ? 'block' : 'hidden'} dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-600`} // Gesteuert durch showVideoInput
            placeholder={t('videoLink')}
            value={videoUrl}
            onChange={handleVideoUrlChange}
          />
        </div>


        {/* Bottom Action Bar */}
        <div className="w-full max-w-2xl mx-auto mt-4 p-4 rounded-2xl shadow-outset-lg bg-gray-100 flex items-center dark:bg-neutral-900 relative">
          {message && (
            <div className="text-center text-sm font-semibold text-green-700 bg-green-100 p-2 rounded-xl shadow-inset-md flex-grow mx-4 dark:text-green-300 dark:bg-neutral-900">
              {message}
            </div>
          )}

          {/* Standard-Buttons für mittelgroße Bildschirme und größer */}
          <div className="hidden sm:flex space-x-4">
            {/* Bild-Upload-Button */}
            <label htmlFor="editPostImageUpload" className={`p-3 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`} title={t('addImage')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="file"
                id="editPostImageUpload"
                ref={imageInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={showVideoInput || !!videoUrl}
              />
            </label>

            {/* Kamera-Button */}
            <label htmlFor="editPostCameraCapture" className={`p-3 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`} title={t('addImageCamera')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="file"
                id="editPostCameraCapture"
                ref={cameraInputRef}
                accept="image/*"
                capture="environment" // or "user" for front camera
                className="hidden"
                onChange={handleImageChange}
                disabled={showVideoInput || !!videoUrl}
              />
            </label>

            {/* Video-Link-Button */}
            <button
              onClick={toggleVideoInput}
              className={`p-3 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300 ${imageFile ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={t('addVideo')}
              disabled={!!imageFile}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
              </svg>
            </button>

            {/* Hashtag-Auswahl-Button - NUR ANZEIGEN, WENN HASHTAGS EXISTIEREN */}
            {allAvailableHashtags.length > 0 && (
              <button
                onClick={() => setShowHashtagSelector(true)}
                className="p-3 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
                title={t('addHashtag')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </button>
            )}
          </div>

          {/* "Mehr Optionen"-Button für kleine Bildschirme */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowMoreOptions(prev => !prev)}
              className="p-3 rounded-full bg-gray-100 shadow-outset-lg text-gray-600 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-neutral-200"
              title="Weitere Optionen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>

          {/* Schwebendes Dropdown für "Mehr Optionen" */}
          {showMoreOptions && (
            <div
              ref={moreOptionsRef}
              className="absolute bottom-full left-0 mb-3 p-4 rounded-xl shadow-outset-lg bg-gray-100 flex flex-col space-y-3 items-center dark:bg-neutral-800 z-50" // right-0 zu left-0 geändert
            >
              {/* Bild-Upload-Button */}
              <label htmlFor="editPostImageUpload-sm" className={`w-12 h-12 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 flex items-center justify-center ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`} title={t('addImage')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="file"
                  id="editPostImageUpload-sm"
                  ref={imageInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={showVideoInput || !!videoUrl}
                />
              </label>

              {/* Kamera-Button */}
              <label htmlFor="editPostCameraCapture-sm" className={`w-12 h-12 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 flex items-center justify-center ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`} title={t('addImageCamera')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="file"
                  id="editPostCameraCapture-sm"
                  ref={cameraInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={showVideoInput || !!videoUrl}
                />
              </label>

              {/* Video-Link-Button */}
              <button
                onClick={toggleVideoInput}
                className={`w-12 h-12 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300 flex items-center justify-center ${imageFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={t('addVideo')}
                disabled={!!imageFile}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                </svg>
              </button>

              {/* Hashtag-Auswahl-Button - NUR ANZEIGEN, WENN HASHTAGS EXISTIEREN */}
              {allAvailableHashtags.length > 0 && (
                <button
                  onClick={() => { setShowHashtagSelector(true); setShowMoreOptions(false); }} // Dropdown schließen, wenn der Selector geöffnet wird
                  className="w-12 h-12 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300 flex items-center justify-center"
                  title={t('addHashtag')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </button>
              )}
            </div>
          )}
          {/* Gruppe für rechtsbündigen "Speichern"-Button */}
          <div className="ml-auto">
            {showSubmitButton && (
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-700 font-bold neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
              >
                {t('save')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ReplyInput (New Component for the fixed reply bar with media options)
const ReplyInput = ({ onAddReply, userName, allAvailableHashtags, profileImageUrl, t }) => { // Added t prop
  const [replyText, setReplyText] = useState('');
  const [imageFile, setImageFile] = useState(null); // State for image in reply
  const [videoUrl, setVideoUrl] = useState(''); // State for video in reply
  const [showVideoInput, setShowVideoInput] = useState(false); // New state for video input visibility
  const [message, setMessage] = useState('');
  const [showHashtagSelector, setShowHashtagSelector] = useState(false); // New state for hashtag selector visibility
  const messageTimeoutRef = useRef(null);
  const imageInputRef = useRef(null);
  const cameraInputRef = useRef(null); // Ref for camera input
  const textareaRef = useRef(null); // Ref for the textarea element

  // Effect to auto-resize the textarea and control initial height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height for true scrollHeight calculation

      // Define the target total height for a single line (40px)
      const targetTotalHeight = 40; // Corresponds to h-10 (2.5rem)

      // Get initial scrollHeight when empty or with a single character
      const initialScrollHeight = textareaRef.current.scrollHeight;

      // Adding a small threshold to account for potential fractional pixel rendering
      const threshold = 2;

      if (replyText.trim() === '') {
        // If empty, force to exact 40px
        textareaRef.current.style.height = `${targetTotalHeight}px`;
      } else if (initialScrollHeight > targetTotalHeight + threshold) {
        // If content genuinely needs more space than 40px (e.g., wraps to next line)
        textareaRef.current.style.height = `${initialScrollHeight}px`;
      } else {
        // If content fits within 40px, or is only slightly over due to rendering quirks, force to 40px
        textareaRef.current.style.height = `${targetTotalHeight}px`;
      }
      textareaRef.current.style.overflow = 'hidden'; // Always hide scrollbar
    }
  }, [replyText]); // Re-run whenever replyText changes

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      showMessage(t('imageTooLarge'), true);
      setImageFile(null);
      e.target.value = '';
      return;
    }
    setImageFile(file);
    setVideoUrl('');
    setShowVideoInput(false); // Hide video input if image is selected
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
    setImageFile(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const handleSelectHashtag = (hashtag) => {
    setReplyText(prevText => `${prevText} ${hashtag} `); // Add hashtag with spaces
    setShowHashtagSelector(false); // Close selector
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim() && !imageFile && !videoUrl.trim()) {
      showMessage(t('replyIsEmpty'), true);
      return;
    }

    let imageUrl = null;
    if (imageFile) {
      try {
        imageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      } catch (error) {
        showMessage(t('errorUploadingImage'), true);
        return;
      }
    }

    const hashtags = extractHashtags(replyText); // Extract hashtags from the reply text

    // Pass userName and profileImageUrl to the onAddReply function
    onAddReply(replyText, imageUrl, videoUrl, hashtags); // No longer passing userName, profileImageUrl directly
    setReplyText('');
    setImageFile(null);
    setVideoUrl('');
    setShowVideoInput(false); // Hide video input after posting
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
    showMessage(t('replySuccess'));
  };

  const toggleVideoInput = () => {
    setShowVideoInput(prev => !prev);
    if (showVideoInput) { // If it was visible and now hiding, clear URL
      setVideoUrl('');
    }
    setImageFile(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const showSubmitButton = replyText.trim() !== '' || imageFile || videoUrl.trim() !== '';

  return (
    <>
      {showHashtagSelector && (
        <HashtagSelector
          hashtags={allAvailableHashtags}
          onSelect={handleSelectHashtag}
          onClose={() => setShowHashtagSelector(false)}
          t={t} // Pass t
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-outset-lg z-40 dark:bg-neutral-900 transition-colors duration-500">
        <div className="w-full max-w-2xl mx-auto flex items-start space-x-2"> {/* items-start for top alignment */}
          {/* PROFILE IMAGE / INITIALS IN REPLY INPUT */}
          {profileImageUrl ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={profileImageUrl}
                alt={t('profile')}
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute inset-0 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.3)] pointer-events-none" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-lg font-bold shadow-inset-md flex-shrink-0 dark:bg-blue-800 dark:text-blue-200">
              {userName ? userName[0].toUpperCase() : 'P'}
            </div>
          )}
          <div className="flex-grow flex flex-col">
            <textarea
              ref={textareaRef}
              className="w-full py-2 px-3 rounded-[1.25rem] bg-gray-100 shadow-inset-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none overflow-hidden mb-2 text-base dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-600"
              placeholder={t('whatsHappening')}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              // Removed onKeyPress handler to allow native Enter key behavior for new lines
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              style={{ boxSizing: 'border-box', lineHeight: '1.5rem' }} // Line height for placeholder/single line
            ></textarea>
            {imageFile && (
              <div className="my-2 p-2 bg-gray-100 rounded-lg shadow-inset-md relative w-full dark:bg-neutral-900">
                <img src={URL.createObjectURL(imageFile)} alt={t('replyImage')} className="w-full h-auto rounded-lg max-h-32 object-contain" />
                <button
                  onClick={() => { setImageFile(null); if (imageInputRef.current) imageInputRef.current.value = ''; if (cameraInputRef.current) cameraInputRef.current.value = ''; }}
                  className="absolute top-0 right-0 m-1 p-1 rounded-full bg-gray-200 shadow-outset-lg text-gray-600 neumorphic-btn-active-press dark:bg-neutral-700 dark:text-neutral-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <input
              type="text"
              className={`w-full p-3 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 ${showVideoInput ? 'block' : 'hidden'} dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-600`} // Controlled by showVideoInput
              placeholder={t('videoLink')}
              value={videoUrl}
              onChange={handleVideoUrlChange}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              inputMode="url"
            />
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto flex items-center mt-2">
          {message && (
            <div className="text-center text-sm font-semibold text-green-700 bg-green-100 p-2 rounded-xl shadow-inset-md flex-grow mx-4 dark:text-green-300 dark:bg-neutral-900">
              {message}
            </div>
          )}
          <div className="flex space-x-2 ml-auto"> {/* Added ml-auto to push to right */}
            <label htmlFor="replyImageUpload" className={`p-2 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="file"
                id="replyImageUpload"
                ref={imageInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                disabled={showVideoInput || !!videoUrl}
              />
            </label>
            {/* Camera Button for Reply */}
            <label htmlFor="replyCameraCapture" className={`p-2 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 ${showVideoInput || videoUrl ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="file"
                id="replyCameraCapture"
                ref={cameraInputRef}
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleImageChange}
                disabled={showVideoInput || !!videoUrl}
              />
            </label>
            <button
              onClick={toggleVideoInput}
              className={`p-2 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300 ${imageFile ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={t('addVideo')}
              disabled={!!imageFile}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
              </svg>
            </button>

            {/* Hashtag Selector Button for Replies - ONLY SHOW IF HASHTAGS EXIST */}
            {allAvailableHashtags.length > 0 && (
              <button
                onClick={() => setShowHashtagSelector(true)}
                className="p-2 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
                title={t('addHashtag')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </button>
            )}

            {/* Post Button for Reply */}
            {showSubmitButton && (
              <button
                onClick={handleSubmitReply}
                className="px-4 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-700 font-bold neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
              >
                {t('postButton')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


// ReplySection Component (Now only displays replies, no input field)
const ReplySection = ({ replies, onLikeReply, userName, onHashtagClick, onEditReply, onDeleteReply, profileImageUrl, t }) => { // Added t prop
  const [editingReplyIndex, setEditingReplyIndex] = useState(null);
  const [editedReplyText, setEditedReplyText] = useState('');
  const [editedReplyImageUrl, setEditedReplyImageUrl] = useState(null);
  const [editedReplyVideoUrl, setEditedReplyVideoUrl] = useState('');
  const [editedReplyImageFile, setEditedReplyImageFile] = useState(null);
  const [showEditedReplyVideoInput, setShowEditedReplyVideoInput] = useState(false); // New state for edited reply video input
  const replyTextareaRef = useRef(null);
  const editedReplyImageInputRef = useRef(null);
  const editedReplyCameraInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const messageTimeoutRef = useRef(null);

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const startEditReply = (reply, index) => {
    setEditingReplyIndex(index);
    setEditedReplyText(reply.text);
    setEditedReplyImageUrl(reply.imageUrl);
    setEditedReplyVideoUrl(reply.videoUrl);
    setEditedReplyImageFile(null); // Clear any pending new image
    setShowEditedReplyVideoInput(!!reply.videoUrl); // Set visibility based on existing video URL
  };

  const handleSaveReply = async (index) => {
    if (!editedReplyText.trim() && !editedReplyImageUrl && !editedReplyImageFile && !editedReplyVideoUrl.trim()) {
      showMessage(t('replyIsEmpty'), true);
      return;
    }

    let finalImageUrl = editedReplyImageUrl;
    if (editedReplyImageFile) {
      try {
        finalImageUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(editedReplyImageFile);
        });
      } catch (error) {
        showMessage(t('errorUploadingImage'), true);
        return;
      }
    }

    const hashtags = extractHashtags(editedReplyText);

    const updatedReply = {
      ...replies[index],
      text: editedReplyText,
      imageUrl: finalImageUrl,
      videoUrl: editedReplyVideoUrl,
      hashtags,
    };
    onEditReply(index, updatedReply);
    setEditingReplyIndex(null);
    setEditedReplyImageFile(null); // Clear file after save
    setShowEditedReplyVideoInput(false); // Hide video input after save
  };

  const handleCancelEditReply = () => {
    setEditingReplyIndex(null);
    setEditedReplyImageFile(null); // Clear file on cancel
    setShowEditedReplyVideoInput(false); // Hide video input on cancel
  };

  const handleDeleteReplyClick = (index) => {
    onDeleteReply(index); // This will now be handled by App.js's confirmation dialog
  };

  const handleEditedReplyImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showMessage(t('imageTooLarge'), true);
        setEditedReplyImageFile(null);
        e.target.value = '';
        return;
      }
      setEditedReplyImageFile(file);
      setEditedReplyImageUrl(null); // Clear existing URL if new file chosen
      setEditedReplyVideoUrl(''); // Clear video if image selected
      setShowEditedReplyVideoInput(false); // Hide video input if image is selected
    }
  };

  const handleEditedReplyVideoUrlChange = (e) => {
    setEditedReplyVideoUrl(e.target.value);
    setEditedReplyImageFile(null); // Clear image if video URL entered
    setEditedReplyImageUrl(null); // Clear existing image URL
    if (editedReplyImageInputRef.current) editedReplyImageInputRef.current.value = '';
    if (editedReplyCameraInputRef.current) editedReplyCameraInputRef.current.value = '';
  };

  const handleRemoveEditedReplyImage = () => {
    setEditedReplyImageUrl(null);
    setEditedReplyImageFile(null);
    if (editedReplyImageInputRef.current) editedReplyImageInputRef.current.value = '';
    if (editedReplyCameraInputRef.current) editedReplyCameraInputRef.current.value = '';
  };

  const handleRemoveEditedReplyVideo = () => {
    setEditedReplyVideoUrl('');
    setShowEditedReplyVideoInput(false); // Hide video input after removing video
  };

  const toggleEditedReplyVideoInput = () => {
    setShowEditedReplyVideoInput(prev => !prev);
    if (showEditedReplyVideoInput) { // If it was visible and now hiding, clear URL
      setEditedReplyVideoUrl('');
    }
    setEditedReplyImageFile(null);
    setEditedReplyImageUrl(null);
    if (editedReplyImageInputRef.current) editedReplyImageInputRef.current.value = '';
    if (editedReplyCameraInputRef.current) editedReplyCameraInputRef.current.value = '';
  };

  // Sort replies from newest to oldest
  const sortedReplies = useMemo(() => [...(replies || [])].sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0)), [replies]);

  useEffect(() => {
    if (editingReplyIndex !== null && replyTextareaRef.current) {
      replyTextareaRef.current.focus();
      replyTextareaRef.current.setSelectionRange(editedReplyText.length, editedReplyText.length);
    }
  }, [editingReplyIndex, editedReplyText]);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-xl shadow-inset-md dark:bg-neutral-900 transition-colors duration-500">
      {message && (
        <div className="text-center text-sm font-semibold text-green-700 bg-green-100 p-2 rounded-xl shadow-inset-md mb-4 dark:text-green-300 dark:bg-neutral-900">
          {message}
        </div>
      )}
      {replies.length === 0 ? (
        <p className="text-gray-500 text-sm dark:text-neutral-400">{t('noRepliesYet')}</p>
      ) : (
        <div className="space-y-3">
          {sortedReplies.map((reply, index) => {
            const hasLikedReply = (reply.likedBy || []).includes(userName);
            const isEditing = editingReplyIndex === index;

            return (
              <div key={index} className="p-3 bg-gray-100 rounded-lg shadow-outset-lg dark:bg-neutral-900">
                <div className="flex items-center space-x-3 mb-2">
                  {profileImageUrl ? (
                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={profileImageUrl}
                        alt={t('profile')}
                        className="w-full h-full object-cover brightness-95"
                      />
                      <div className="absolute inset-0 rounded-full shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2),inset_-3px_-3px_6px_rgba(255,255,255,0.3)] pointer-events-none" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-md font-bold shadow-inset-md dark:bg-blue-800 dark:text-blue-200">
                      {(userName ? userName[0].toUpperCase() : 'P')}
                    </div>
                  )}
                  <p className="text-gray-700 font-semibold text-sm dark:text-neutral-200">{userName || t('unknownUser')}</p>
                </div>

                {isEditing ? (
                  <>
                    <textarea
                      ref={replyTextareaRef}
                      className="w-full p-2 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none dark:bg-neutral-900 dark:text-neutral-200 dark:focus:ring-blue-600"
                      value={editedReplyText}
                      onChange={(e) => setEditedReplyText(e.target.value)}
                      rows={3}
                    ></textarea>
                     {(editedReplyImageUrl || editedReplyImageFile) && (
                        <div className="my-2 p-2 bg-gray-100 rounded-lg shadow-inset-md relative dark:bg-neutral-900">
                            <img src={editedReplyImageFile ? URL.createObjectURL(editedReplyImageFile) : editedReplyImageUrl} alt={t('replyImage')} className="w-full h-auto rounded-lg max-h-48 object-contain" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/CCCCCC/333333?text=' + t('imageNotFound'); }} />
                            <button
                                onClick={handleRemoveEditedReplyImage}
                                className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 shadow-outset-lg text-gray-600 neumorphic-btn-active-press dark:bg-neutral-700 dark:text-neutral-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                    {editedReplyVideoUrl && (
                        <div className="my-2 p-2 bg-gray-100 rounded-lg shadow-inset-md relative dark:bg-neutral-900">
                            <VideoPlayer url={editedReplyVideoUrl} />
                            <button
                                onClick={handleRemoveEditedReplyVideo}
                                className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 shadow-outset-lg text-gray-600 neumorphic-btn-active-press dark:bg-neutral-700 dark:text-neutral-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                    <div className="flex space-x-2 mt-2 items-center">
                        <label htmlFor={`editReplyImageUpload-${index}`} className={`p-2 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 ${showEditedReplyVideoInput || editedReplyVideoUrl ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <input
                                type="file"
                                id={`editReplyImageUpload-${index}`}
                                ref={editedReplyImageInputRef}
                                accept="image/*"
                                className="hidden"
                                onChange={handleEditedReplyImageChange}
                                disabled={showEditedReplyVideoInput || !!editedReplyVideoUrl}
                            />
                        </label>
                        <label htmlFor={`editReplyCameraCapture-${index}`} className={`p-2 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300 ${showEditedReplyVideoInput || editedReplyVideoUrl ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <input
                                type="file"
                                id={`editReplyCameraCapture-${index}`}
                                ref={editedReplyCameraInputRef}
                                accept="image/*"
                                capture="environment"
                                className="hidden"
                                onChange={handleEditedReplyImageChange}
                                disabled={showEditedReplyVideoInput || !!editedReplyVideoUrl}
                            />
                        </label>
                        <button
                            onClick={toggleEditedReplyVideoInput}
                            className={`p-2 rounded-full bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300 ${editedReplyImageUrl || editedReplyImageFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                            title={t('addVideo')}
                            disabled={!!(editedReplyImageUrl || editedReplyImageFile)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            className={`flex-grow p-2 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 ${showEditedReplyVideoInput ? 'block' : 'hidden'} dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-600`}
                            placeholder={t('videoLink')}
                            value={editedReplyVideoUrl}
                            onChange={handleEditedReplyVideoUrlChange}
                        />
                    </div>
                    <div className="flex justify-end space-x-2 mt-3">
                      <button
                        onClick={() => handleSaveReply(index)}
                        className="px-4 py-2 rounded-xl bg-blue-100 shadow-outset-lg text-blue-700 font-semibold neumorphic-btn-active-press dark:bg-blue-800 dark:text-blue-200"
                      >
                        {t('save')}
                      </button>
                      <button
                        onClick={handleCancelEditReply}
                        className="px-4 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-gray-600 font-semibold neumorphic-btn-active-press dark:bg-neutral-900 dark:text-neutral-200"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-800 text-sm break-words whitespace-pre-wrap dark:text-neutral-200">
                      {renderTextWithHashtags(reply.text, onHashtagClick, t)} {/* Pass t here */}
                    </p>
                    {reply.imageUrl && (
                      <div className="my-2 p-2 bg-gray-100 rounded-lg shadow-inset-md dark:bg-neutral-900">
                        <img src={reply.imageUrl} alt={t('replyImage')} className="w-full h-auto rounded-lg max-h-48 object-contain" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/CCCCCC/333333?text=' + t('imageNotFound'); }} />
                      </div>
                    )}
                    {reply.videoUrl && <VideoPlayer url={reply.videoUrl} />}
                    <div className="flex justify-between items-center text-gray-500 text-xs mt-1 dark:text-neutral-400">
                      <span>{reply.timestamp}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onLikeReply(index, userName)}
                          // Add flex and items-center to make content horizontal
                          className={`flex items-center space-x-1 p-2 rounded-xl bg-gray-100 shadow-outset-lg neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900
                            ${hasLikedReply ? 'text-red-500 dark:text-red-300' : 'text-gray-500 dark:text-neutral-400'}` // Preserve like/unlike coloring
                            }
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          {/* Display like count next to the icon */}
                          <span className="ml-1">{reply.likes || 0}</span>
                        </button>
                        <button
                          onClick={() => startEditReply(reply, index)}
                          className="p-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
                          title={t('editReply')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteReplyClick(index)}
                          className="p-2 rounded-xl bg-gray-100 shadow-outset-lg text-red-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-red-300"
                          title={t('deleteReply')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


// Post Component
const Post = ({ post, onLike, onAddReply, onPostClick, isDetailView = false, userName, onHashtagClick, profileImageUrl, onEditPost, onDeletePost, t }) => { // Added t prop
  // Prevent immediate propagation of click event from buttons to the post div
  const stopPropagation = (e) => e.stopPropagation();

  // Check if the current user has liked this post
  const hasLiked = (post.likedBy || []).includes(userName); // Safely access likedBy

  return (
    <div
      className={`bg-gray-100 p-6 rounded-2xl shadow-outset-lg mb-6 ${!isDetailView ? 'cursor-pointer' : ''} dark:bg-neutral-900 transition-colors duration-500`}
      onClick={!isDetailView ? () => onPostClick(post.id) : null}
    >
      {/* Profile Pic and Name */}
      <div className="flex items-center space-x-3 mb-4">
        {/* PROFILE IMAGE / INITIALS IN POST */}
        {profileImageUrl ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={profileImageUrl}
              alt={t('profile')}
              className="w-full h-full object-cover brightness-95"
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.3)] pointer-events-none" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-lg font-bold shadow-inset-md flex-shrink-0 dark:bg-blue-800 dark:text-blue-200">
            {userName ? userName[0].toUpperCase() : 'P'}
          </div>
        )}
        <p className="text-gray-700 font-semibold text-lg dark:text-neutral-200">{userName}</p>
      </div>

      <p className="text-gray-700 text-lg mb-3 break-words whitespace-pre-wrap dark:text-neutral-200">
        {renderTextWithHashtags(post.text, onHashtagClick, t)} {/* Pass t here */}
      </p>
      {post.imageUrl && (
        <div className="my-3 p-2 bg-gray-100 rounded-lg shadow-inset-md relative dark:bg-neutral-900">
          <img src={post.imageUrl} alt={t('postImage')} className="w-full h-auto rounded-lg max-h-96 object-contain" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/CCCCCC/333333?text=' + t('imageNotFound'); }} />
        </div>
      )}
      {post.videoUrl && <VideoPlayer url={post.videoUrl} />}

      {/* This div was holding the timestamp and now holds all action buttons */}
      <div className={`flex flex-col sm:flex-row sm:items-center text-gray-500 text-sm ${isDetailView ? 'border-b border-gray-200 pb-4 mb-4 dark:border-neutral-700 justify-between' : 'mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700'}`}>
        {/* Always show timestamp in one line, span full width on small screens */}
        <span className="whitespace-nowrap w-full sm:w-auto mb-2 sm:mb-0">{post.timestamp}</span>
        {/* Buttons row, takes full width on small screens and aligns to end */}
        {/* Buttons row, takes full width on small screens and aligns to end */}
        {/* Adjusted to flex-wrap for wrapping on small screens, and justify-end to align groups right */}
        <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 ml-auto w-full sm:w-auto">
          {/* Group for Like and Reply buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => { onLike(post.id, userName); stopPropagation(e); }}
              className={`flex items-center space-x-1 p-2 rounded-xl bg-gray-100 shadow-outset-lg font-medium neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900
                ${hasLiked ? 'text-red-500 dark:text-red-300' : 'text-gray-500 dark:text-neutral-400'}` // Preserve like/unlike coloring
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>{post.likes}</span> {/* Always show count inside button */}
            </button>
            {!isDetailView && ( // Only show reply count button on summary view
              <button
                onClick={(e) => { stopPropagation(e); onPostClick(post.id); }} // Click to open detail view
                className="flex items-center space-x-1 p-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-500 font-medium neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 13.5V16a2 2 0 01-2 2H4a2 2 0 01-2-2V8.5a2 2 0 012-2h.5l2-2h4l2 2H16a2 2 0 012 2v5zM5 10a1 1 0 100 2h10a1 1 0 100-2H5z" clipRule="evenodd" />
                </svg>
                <span>{post.replies.length}</span>
              </button>
            )}
          </div>

          {/* Group for Edit and Delete buttons */}
          <div className="flex items-center space-x-4">
            {onEditPost && (
                  <button
                      onClick={(e) => { stopPropagation(e); onEditPost(post); }}
                      className="p-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
                      title={t('edit')}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                  </button>
              )}
              {onDeletePost && (
                  <button
                      onClick={(e) => { stopPropagation(e); onDeletePost(post.id); }}
                      className="p-2 rounded-xl bg-gray-100 shadow-outset-lg text-red-500 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-red-300"
                      title={t('delete')}
                  >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                  </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

// PostDetailView Component (New)
const PostDetailView = ({ post, onLike, onAddReply, onBack, userName, onLikeReply, onHashtagClick, allAvailableHashtags, profileImageUrl, onEditPost, onDeletePost, onEditReply, onDeleteReply, t }) => { // Added t prop
  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col p-4 sm:p-8 overflow-auto pb-32 dark:bg-neutral-900 transition-colors duration-500"> {/* Added padding-bottom for fixed reply input */}
      <div className="w-full max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 px-6 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-700 font-bold neumorphic-btn-active-press transition-all duration-200 flex items-center justify-center space-x-2 dark:bg-neutral-900 dark:text-blue-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{t('back')}</span>
        </button>

        {post ? (
          <>
            {/* Directly render the Post component, no extra container or heading */}
            <Post
                post={post}
                onLike={onLike}
                isDetailView={true}
                userName={userName}
                onHashtagClick={onHashtagClick}
                profileImageUrl={profileImageUrl}
                onEditPost={onEditPost} // Pass edit function to allow editing from detail view
                onDeletePost={onDeletePost} // Pass delete function to allow deleting from detail view
                t={t}
             />
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4 dark:text-neutral-200">{t('replies')}</h3> {/* Only one "Antworten" heading */}
              <ReplySection
                replies={post.replies}
                onLikeReply={(replyIndex, user) => onLikeReply(post.id, replyIndex, user)}
                userName={userName}
                onHashtagClick={onHashtagClick}
                onEditReply={(replyIndex, updatedReply) => onEditReply(post.id, replyIndex, updatedReply)} // Pass post.id along
                onDeleteReply={(replyIndex) => onDeleteReply(post.id, replyIndex)} // Pass post.id along
                profileImageUrl={profileImageUrl}
                t={t} // Pass t
              />
            </div>
          </>
        ) : (
          <div className="w-full max-w-2xl bg-gray-100 p-6 rounded-2xl shadow-outset-lg mb-8 text-center text-gray-600 dark:bg-neutral-900 dark:text-neutral-400">
            {t('postNotFound')}
          </div>
        )}
      </div>
      {/* Fixed reply input at the bottom */}
      {post && <ReplyInput onAddReply={(replyText, imageUrl, videoUrl, hashtags) => onAddReply(post.id, {text: replyText, imageUrl, videoUrl, hashtags})} userName={userName} allAvailableHashtags={allAvailableHashtags} profileImageUrl={profileImageUrl} t={t} />} {/* Pass t here */}
    </div>
  );
};


// Home Page Component
const HomePage = ({ posts, onLikePost, onAddReply, onPostClick, greeting, userName, onHashtagClick, profileImageUrl, onEditPost, onDeletePost, t }) => { // Added t prop
  return (
    <div className="fixed inset-0 bg-gray-100 z-0 flex flex-col p-4 sm:p-8 overflow-auto dark:bg-neutral-900 transition-colors duration-500">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-gray-100 dark:bg-neutral-900 rounded-lg shadow-outset-lg transition-colors duration-500">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 mt-4 text-center dark:text-neutral-100 transition-colors duration-500">{greeting}</h1> {/* Display dynamic greeting */}
        <div className="w-full max-w-2xl mt-8">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center text-lg mt-10 dark:text-neutral-400 transition-colors duration-500">{t('noPostsYet')}</p>
          ) : (
            posts.map(post => (
              <Post
                key={post.id}
                post={post}
                onLike={onLikePost}
                onAddReply={onAddReply}
                onPostClick={onPostClick}
                userName={userName} // Pass userName to Post component for display
                onHashtagClick={onHashtagClick} // Pass onHashtagClick here
                profileImageUrl={profileImageUrl} // Pass profileImageUrl
                onEditPost={onEditPost} // Pass edit function
                onDeletePost={onDeletePost} // Pass delete function
                t={t}
               />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ThreeWayToggle Component
const ThreeWayToggle = ({ options, selectedOption, onSelect, descriptions }) => {
  const selectedIndex = options.findIndex(option => option.value === selectedOption);
  const { isDarkMode } = useTheme(); // Get current dark mode state

  // Define a consistent padding for the slider within the track
  const trackPaddingPx = 4; // Corresponds to p-1 on the parent container (4px)

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex w-full max-w-sm rounded-full bg-gray-100 shadow-inset-md p-1 dark:bg-neutral-900 transition-colors duration-500 overflow-hidden">
        {/* Slider */}
        <div
          className={`absolute rounded-full shadow-neumorphic-slider transition-all duration-300 ease-in-out
            ${isDarkMode ? 'bg-neutral-900' : 'bg-gray-100'}
          `}
          style={{
            left: `calc(${trackPaddingPx}px + ${selectedIndex} * (calc(100% - ${2 * trackPaddingPx}px) / ${options.length}))`,
            top: `${trackPaddingPx}px`,
            // Set height explicitly
            height: `calc(100% - ${2 * trackPaddingPx}px)`,
            width: `calc((100% - ${2 * trackPaddingPx}px) / ${options.length})`,
          }}
        ></div>
        {options.map((option, index) => (
          <button
            key={option.value}
            className={`flex-1 py-2 text-sm font-semibold relative z-10 transition-colors duration-300
              ${selectedOption === option.value
                ? 'text-blue-700 dark:text-blue-300' // Text color on selected neumorphic pill
                : 'text-gray-600 dark:text-neutral-200'
              }`
            }
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {selectedOption && descriptions[selectedOption] && (
        <p className="mt-4 text-center text-gray-600 text-sm italic dark:text-neutral-400 transition-colors duration-500">
          {descriptions[selectedOption]}
        </p>
      )}
    </div>
  );
};


// Profile Page Component (with only profile-specific settings)
const ProfilePage = ({ posts, onLikePost, onAddReply, userName, setUserName, onPostClick, onHashtagClick, profileImageUrl, setProfileImageUrl, onEditPost, onDeletePost, t }) => { // Added t prop
  const [editingName, setEditingName] = useState(false);
  const [tempUserName, setTempUserName] = useState(userName);
  const [message, setMessage] = useState(''); // Local message state for this component
  const messageTimeoutRef = useRef(null);
  const profileImageInputRef = useRef(null); // Ref for profile image file input

  useEffect(() => {
    setTempUserName(userName); // Keep tempName in sync with userName
  }, [userName]);

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
    }, 3000); // Message disappears after 3 seconds
  };

  const handleSaveName = () => {
    if (tempUserName.trim()) {
      setUserName(tempUserName.trim());
      setEditingName(false);
      showMessage(t('nameChangedSuccess'));
    } else {
      showMessage(t('nameCannotBeEmpty'), true);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showMessage(t('imageTooLarge'), true);
        e.target.value = ''; // Clear file input
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageUrl(reader.result);
        showMessage(t('errorUploadingImage'));
      };
      reader.onerror = (error) => {
        showMessage(t('errorUploadingImage'), true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfileImage = () => {
    setProfileImageUrl(null);
    if (profileImageInputRef.current) {
      profileImageInputRef.current.value = ''; // Clear the file input
    }
    showMessage(t('removeImage'));
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-0 flex flex-col p-4 sm:p-8 overflow-auto dark:bg-neutral-900 transition-colors duration-500">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-gray-100 rounded-2xl dark:bg-neutral-900 shadow-outset-lg mb-8 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center dark:text-neutral-100">{t('yourProfile')}</h2>
        <div className="flex flex-col items-center mb-6">
          {/* PROFILE IMAGE / INITIALS ON PROFILE PAGE */}
          {profileImageUrl ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
              <img
                src={profileImageUrl}
                alt={t('profile')}
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute inset-0 rounded-full shadow-[inset_6px_6px_12px_rgba(0,0,0,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.3)] pointer-events-none" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 text-5xl font-bold shadow-inset-xl mb-4 dark:bg-blue-800 dark:text-blue-200">
              {userName ? userName[0].toUpperCase() : 'P'}
            </div>
          )}
          <div className="flex space-x-2 mb-4">
            <label htmlFor="profileImageUpload" className="px-4 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-600 font-semibold text-sm neumorphic-btn-active-press transition-all duration-200 cursor-pointer dark:bg-neutral-900 dark:text-blue-300">
              {t('selectImage')}
              <input
                type="file"
                id="profileImageUpload"
                ref={profileImageInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
            </label>
            {profileImageUrl && (
              <button
                onClick={handleRemoveProfileImage}
                className="px-4 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-red-600 font-semibold text-sm neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-red-300"
              >
                {t('removeImage')}
              </button>
            )}
          </div>

          {!editingName ? (
            <p className="text-xl font-semibold text-gray-800 flex items-center dark:text-neutral-200">
              {userName}
              <button
                onClick={() => setEditingName(true)}
                className="ml-2 p-1 rounded-full bg-gray-100 shadow-outset-lg text-gray-600 neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-neutral-200"
                title={t('changeName')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </p>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                className="p-2 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-neutral-900 dark:text-neutral-200 dark:focus:ring-blue-600"
                value={tempUserName}
                onChange={(e) => setTempUserName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSaveName(); }}
              />
              <button
                onClick={handleSaveName}
                className="px-4 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-600 font-semibold text-sm neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-blue-300"
              >
                {t('save')}
              </button>
              <button
                onClick={() => { setEditingName(false); setTempUserName(userName); }}
                className="px-4 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-gray-600 font-semibold text-sm neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-900 dark:text-neutral-200"
              >
                {t('cancel')}
              </button>
            </div>
          )}
          <p className="text-gray-500 text-sm mt-2 dark:text-neutral-400">{t('posts')} {posts.length}</p>
        </div>

        {message && (
          <div className="mt-4 text-center text-sm font-semibold text-green-700 bg-green-100 p-2 rounded-xl shadow-inset-md dark:text-green-300 dark:bg-neutral-900">
            {message}
          </div>
        )}

        <h3 className="text-2xl font-bold text-gray-700 mb-4 mt-8 text-center border-t pt-4 border-gray-200 dark:text-neutral-100 dark:border-neutral-700">{t('myPosts')}</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center text-lg mt-10 dark:text-neutral-400">{t('noPostsOnProfile')}</p>
        ) : (
          posts.map(post => (
            <Post
              key={post.id}
              post={post}
              onLike={onLikePost}
              onAddReply={onAddReply}
              onPostClick={onPostClick}
              userName={userName}
              onHashtagClick={onHashtagClick}
              profileImageUrl={profileImageUrl}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
              t={t} // Pass t
            />
          ))
        )}
      </div>
    </div>
  );
};


// Settings Page Component (New)
const SettingsPage = ({ posts, setPosts, userName, setUserName, importPostsFromJSON, showGlobalMessage, language, setLanguage, t }) => { // Added t prop
  const [message, setMessage] = useState(''); // Local message state for this component
  const messageTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);
  const { darkModeSetting, setDarkModeSetting } = useTheme();

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
    }, 3000); // Message disappears after 3 seconds
  };

  const handleExportData = () => {
    try {
      const dataToExport = {
        userName: userName,
        posts: posts,
      };
      const jsonString = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `digitales_tagebuch_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showMessage(t('dataExportSuccess'));
    } catch (error) {
      showMessage(t('errorExportingData'), true);
    }
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) {
      showMessage(t('noFileSelected'), true);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData && Array.isArray(importedData.posts) && typeof importedData.userName === 'string') {
          await importPostsFromJSON(importedData.posts); // Use the global import function
          setUserName(importedData.userName);
          showMessage(t('dataImportSuccess'));
          // Trigger a re-load of posts in the App component after import
          showGlobalMessage(t('dataImportSuccess'), false); // Show global message for visibility
        } else {
          showMessage(t('invalidDataFormat'), true);
        }
      } catch (error) {
        showMessage(t('invalidJsonFormat'), true);
      } finally {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
      }
    };
    reader.onerror = () => {
      showMessage(t('errorReadingFile'), true);
    };
    reader.readAsText(file);
  };

  const darkModeOptions = [
    { label: t('darkModeOffLabel'), value: 'off' }, // Use translation key for label
    { label: t('darkModeAutoLabel'), value: 'auto' },
    { label: t('darkModeOnLabel'), value: 'on' },
  ];

  const darkModeDescriptions = {
    off: t('darkModeOff'),
    auto: t('darkModeAuto'),
    on: t('darkModeOn'),
  };

  const languageOptions = [
    { label: 'Deutsch', value: 'de' },
    { label: 'English', value: 'en' },
  ];

  const languageDescriptions = {
    de: 'Die App-Oberfläche wird auf Deutsch angezeigt.',
    en: 'The app interface will be displayed in English.',
  };


  return (
    <div className="fixed inset-0 bg-gray-100 z-0 flex flex-col p-4 sm:p-8 overflow-auto dark:bg-neutral-900 transition-colors duration-500">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-gray-100 rounded-2xl shadow-outset-lg mb-8 dark:bg-neutral-900 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center dark:text-neutral-100">{t('settingsTitle')}</h2>

        <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3 dark:text-neutral-200">{t('language')}</h4>
            <ThreeWayToggle
              options={languageOptions}
              selectedOption={language}
              onSelect={setLanguage}
              descriptions={languageDescriptions}
            />
        </div>

        <div className="mb-6 border-t pt-4 border-gray-200 dark:border-neutral-700">
            <h4 className="text-lg font-semibold text-gray-700 mb-3 dark:text-neutral-200">{t('darkMode')}</h4>
            <ThreeWayToggle
              options={darkModeOptions}
              selectedOption={darkModeSetting}
              onSelect={setDarkModeSetting}
              descriptions={darkModeDescriptions}
            />
        </div>

        <div className="space-y-4 border-t pt-4 border-gray-200 dark:border-neutral-700">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 dark:text-neutral-200">{t('dataManagement')}</h4>
          <button
            onClick={handleExportData}
            className="w-full py-3 rounded-2xl bg-gray-100 shadow-outset-lg text-blue-700 font-bold text-lg neumorphic-btn-active-press transition-all duration-200 flex items-center justify-center space-x-2 dark:bg-neutral-900 dark:text-blue-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{t('exportData')}</span>
          </button>
          <label className="w-full block">
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="w-full py-3 rounded-2xl bg-gray-100 shadow-outset-lg text-blue-700 font-bold text-lg neumorphic-btn-active-press transition-all duration-200 flex items-center justify-center space-x-2 dark:bg-neutral-900 dark:text-blue-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span>{t('importData')}</span>
            </button>
          </label>
        </div>

        {message && (
          <div className="mt-4 text-center text-sm font-semibold text-green-700 bg-green-100 p-2 rounded-xl shadow-inset-md dark:text-green-300 dark:bg-neutral-900">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

// SearchResultItem Component for displaying a post and its relevant replies
const SearchResultItem = ({ item, onLikePost, onAddReply, onPostClick, userName, onHashtagClick, onLikeReply, profileImageUrl, onEditPost, onDeletePost, onEditReply, onDeleteReply, t }) => { // Added t prop
  const post = item.post;
  const relevantReplies = item.relevantReplies;

  // Render the main post
  return (
    <div className="mb-6">
      <Post
        post={post}
        onLike={onLikePost}
        onAddReply={onAddReply}
        onPostClick={onPostClick}
        userName={userName}
        onHashtagClick={onHashtagClick}
        profileImageUrl={profileImageUrl}
        onEditPost={onEditPost} // Pass edit function
        onDeletePost={onDeletePost} // Pass delete function
        t={t} // Pass t
      />
      {relevantReplies && relevantReplies.length > 0 && (
        <div className="ml-4 -mt-4"> {/* Adjust margin-left and margin-top to visually link */}
          <h4 className="text-md font-semibold text-gray-600 mb-2 dark:text-neutral-300">{t('matchingReplies')}</h4>
          {/* Reuse ReplySection, but ensure it displays the correct subset of replies */}
          <ReplySection
            replies={relevantReplies}
            onLikeReply={(replyIndex, user) => onLikeReply(post.id, replyIndex, user)}
            userName={userName}
            onHashtagClick={onHashtagClick}
            onEditReply={(replyIndex, updatedReply) => onEditReply(post.id, replyIndex, updatedReply)} // Pass post.id along
            onDeleteReply={(replyIndex) => onDeleteReply(post.id, replyIndex)} // Pass post.id along
            profileImageUrl={profileImageUrl}
            t={t} // Pass t
          />
        </div>
      )}
    </div>
  );
};


// Search Page Component
const SearchPage = ({ posts, onLikePost, onAddReply, userName, onPostClick, onHashtagClick, selectedHashtag, setSelectedHashtag, onLikeReply, profileImageUrl, onEditPost, onDeletePost, onEditReply, onDeleteReply, t }) => { // Added t prop
  const [searchTerm, setSearchTerm] = useState('');

  // Effect to clear search term if a hashtag is selected externally
  useEffect(() => {
    if (selectedHashtag) {
      setSearchTerm('');
    }
  }, [selectedHashtag]);

  // Function to gather all unique hashtags and their counts
  const getHashtagCounts = () => {
    const hashtagMap = {};
    posts.forEach(post => {
      (post.hashtags || []).forEach(tag => {
        hashtagMap[tag] = (hashtagMap[tag] || 0) + 1;
      });
      post.replies.forEach(reply => {
        (reply.hashtags || []).forEach(tag => {
          hashtagMap[tag] = (hashtagMap[tag] || 0) + 1;
        });
      });
    });
    return Object.entries(hashtagMap).sort((a, b) => a[0].localeCompare(b[0])); // Sort alphabetically by tag
  };

  const allHashtagsWithCounts = getHashtagCounts();

  // Filter posts based on searchTerm OR selectedHashtag
  const filteredSearchItems = useMemo(() => {
    const results = [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    posts.forEach(post => {
      const postHashtags = post.hashtags || [];
      const matchingReplies = [];

      // Check if any replies match
      post.replies.forEach(reply => {
        const replyHashtags = reply.hashtags || [];
        const replyMatchesSearchTerm = reply.text.toLowerCase().includes(lowerCaseSearchTerm);
        const replyMatchesSelectedHashtag = selectedHashtag ? replyHashtags.includes(selectedHashtag) : false;

        if ((searchTerm.trim() !== '' && replyMatchesSearchTerm) || (selectedHashtag && replyMatchesSelectedHashtag)) {
          matchingReplies.push(reply);
        }
      });

      // Check if the main post matches
      const postMatchesSearchTerm = post.text.toLowerCase().includes(lowerCaseSearchTerm);
      const postMatchesSelectedHashtag = selectedHashtag ? postHashtags.includes(selectedHashtag) : false;

      // Add the post if it matches directly OR if any of its replies match
      if ((searchTerm.trim() !== '' && postMatchesSearchTerm) || (selectedHashtag && postMatchesSelectedHashtag) || matchingReplies.length > 0) {
        results.push({
          post: post,
          // Only include replies that actually matched the search criteria
          relevantReplies: matchingReplies
        });
      }
    });

    return results;
  }, [searchTerm, selectedHashtag, posts]);


  return (
    <div className="fixed inset-0 bg-gray-100 z-0 flex flex-col p-4 sm:p-8 overflow-auto dark:bg-neutral-900 transition-colors duration-500">
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-gray-100 rounded-2xl shadow-outset-lg mb-8 dark:bg-neutral-900 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center dark:text-neutral-100">{t('searchPosts')}</h2>
        <input
          type="text"
          className="w-full p-3 mb-4 rounded-xl bg-gray-100 shadow-inset-md text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-blue-600"
          placeholder={t('searchPostsPlaceholder')}
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setSelectedHashtag(null); }} // Clear selected hashtag on text search
          disabled={!!selectedHashtag} // Disable text search if a hashtag is selected
        />

        {/* Conditional rendering for Hashtag List or Search Results */}
        {(searchTerm.trim() === '' && !selectedHashtag && allHashtagsWithCounts.length > 0) ? (
          // Show Hashtag List when no search term and no hashtag is selected
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-700 mb-3 dark:text-neutral-100">{t('hashtags')}</h3>
            <div className="flex flex-col gap-2"> {/* Changed to flex-col for vertical list */}
              {allHashtagsWithCounts.map(([tag, count]) => (
                <button
                  key={tag}
                  onClick={() => setSelectedHashtag(tag)} // Select this hashtag
                  className="w-full text-left px-4 py-2 rounded-xl bg-gray-100 shadow-outset-lg text-blue-700 font-semibold neumorphic-btn-active-press transition-all duration-200 dark:bg-neutral-800 dark:text-blue-300 flex justify-between items-center"
                >
                  <span>{tag}</span>
                  <span className="text-gray-500 text-sm dark:text-neutral-400">{count}</span> {/* Changed text here */}
                </button>
              ))
            }
            </div>
          </div>
        ) : (
          // Show Filtered Results when search term is active OR a hashtag is selected
          <>
            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center dark:text-neutral-100">{t('searchResults')}</h3>
            {selectedHashtag && (
              <div className="mb-4 flex items-center justify-between p-3 rounded-xl bg-blue-100 shadow-inset-md dark:bg-blue-800 dark:text-blue-200 text-blue-700 font-semibold">
                <span>{t('filter')} {selectedHashtag}</span>
                <button
                  onClick={() => setSelectedHashtag(null)}
                  className="ml-2 p-1 rounded-full bg-blue-200 shadow-outset-lg text-blue-700 neumorphic-btn-active-press dark:bg-blue-900 dark:text-blue-200"
                  title={t('clearFilter')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {filteredSearchItems.length === 0 ? (
              <p className="text-gray-500 text-center text-lg mt-10 dark:text-neutral-400">{t('noPostsMatchingSearch')}</p>
            ) : (
              filteredSearchItems.map(item => (
                <SearchResultItem
                  key={item.post.id}
                  item={item}
                  onLikePost={onLikePost}
                  onAddReply={onAddReply}
                  onPostClick={onPostClick}
                  userName={userName}
                  onHashtagClick={onHashtagClick}
                  onLikeReply={onLikeReply} // Pass onLikeReply to SearchResultItem
                  profileImageUrl={profileImageUrl}
                  onEditPost={onEditPost} // Pass edit function
                  onDeletePost={onDeletePost} // Pass delete function
                  onEditReply={onEditReply}
                  onDeleteReply={onDeleteReply}
                  t={t} // Pass t
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Navigation Bar Component (Top Nav)
const NavBar = ({ currentPage, onNavigate, t }) => { // Added t prop
  const navItems = [
    { name: t('home'), page: 'home', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    )},
    { name: t('profile'), page: 'profile', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    )},
    { name: t('search'), page: 'search', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
      </svg>
    )},
    { name: t('settings'), page: 'settings', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 25 25" fill="currentColor">
        <path fillRule="evenodd" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.09-.73-1.72-.98l-.37-2.65c-.06-.24-.27-.42-.52-.42h-4c-.25 0-.46.18-.52.42l-.37 2.65c-.63.25-1.2.58-1.72.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.09.73 1.72.98l.37 2.65c.06.24.27.42.52.42h4c.25 0 .46-.18.52-.42l.37-2.65c.63-.25 1.2-.58 1.72-.98l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" clipRule="evenodd" />
      </svg>
    )},
  ];

  return (
    // NavBar is absolutely positioned within the main content area
    // It will be fixed at top-4 left-4 (or sm:left-8)
    <nav className="absolute top-4 sm:top-8 left-4 sm:left-8 bg-gray-100 shadow-outset-lg rounded-2xl p-4 z-30 dark:bg-neutral-900 transition-colors duration-500">
      <ul className="flex flex-col space-y-2">
        {navItems.map(item => (
          <li key={item.page} className="w-full">
            <button
              onClick={() => onNavigate(item.page)}
              className={`flex items-center justify-start space-x-2 py-2 px-4 rounded-xl text-lg font-semibold w-full
                ${currentPage === item.page
                  ? 'bg-blue-100 text-blue-700 shadow-inset-md dark:bg-blue-800 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-600 shadow-outset-lg neumorphic-btn-active-press dark:bg-neutral-900 dark:text-neutral-200'
                } transition-all duration-200`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.name}</span> {/* Hide text on small screens, show on larger */}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// New Bottom Navigation Bar Component
const BottomNavBar = ({ currentPage, onNavigate, t }) => {
  const navItems = [
    { name: t('home'), page: 'home', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    )},
    { name: t('profile'), page: 'profile', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
      </svg>
    )},
    { name: t('search'), page: 'search', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
      </svg>
    )},
    { name: t('settings'), page: 'settings', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 25 25" fill="currentColor">
        <path fillRule="evenodd" d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.09-.73-1.72-.98l-.37-2.65c-.06-.24-.27-.42-.52-.42h-4c-.25 0-.46.18-.52.42l-.37 2.65c-.63.25-1.2.58-1.72.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.09.73 1.72.98l.37 2.65c.06.24.27.42.52.42h4c.25 0 .46-.18.52-.42l.37-2.65c.63-.25 1.2-.58 1.72-.98l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" clipRule="evenodd" />
      </svg>
    )},
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-outset-lg rounded-t-2xl p-2 z-30 dark:bg-neutral-900 transition-colors duration-500">
      <ul className="flex justify-around items-center w-full">
        {navItems.map(item => (
          <li key={item.page}>
            <button
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-semibold
                ${currentPage === item.page
                  ? 'bg-blue-100 text-blue-700 shadow-inset-md dark:bg-blue-800 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-600 shadow-outset-lg neumorphic-btn-active-press dark:bg-neutral-900 dark:text-neutral-200'
                } transition-all duration-200`}
            >
              {item.icon}
              {/* Diese Zeile wurde entfernt, um den Text zu entfernen: */}
              {/* <span className="mt-1">{item.name}</span> */}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};


// IndexedDB Helper Functions
const DB_NAME = 'diaryDB';
const STORE_NAME = 'posts';
// Increment DB_VERSION to ensure onupgradeneeded is triggered for schema changes
const DB_VERSION = 2; // Changed from 1 to 2

let db = null;

const openDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      reject("Error opening IndexedDB");
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const dbInstance = event.target.result;
      // If the object store doesn't exist, create it.
      // This will run when DB_VERSION is incremented from a previous version.
      if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
        dbInstance.createObjectStore(STORE_NAME, { keyPath: 'id' });
      } else {
      }

      // Handle upgrades for existing stores if schema changes.
      // For version 2, we need to ensure 'hashtags' field exists on existing posts and replies.
      // The app handles 'post.hashtags || []' to prevent errors.
    };
  });
};

const getStore = async (mode) => {
  const database = await openDB();
  const transaction = database.transaction(STORE_NAME, mode);
  return transaction.objectStore(STORE_NAME);
};

const getPostsDB = async () => {
  try {
    const store = await getStore('readonly');
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const result = event.target.result;
        resolve(result);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    return [];
  }
};

const addPostDB = async (post) => {
  try {
    const store = await getStore('readwrite');
    const request = store.add(post);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(post);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    return null;
  }
};

const updatePostDB = async (post) => {
  try {
    const store = await getStore('readwrite');
    const request = store.put(post);
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(post);
      };
      request.onerror = (event) => {
        reject(event.target.error);
      };
    });
  } catch (error) {
    return null;
  }
};

const importPostsFromJSON = async (postsToImport) => {
    try {
        const store = await getStore('readwrite');
        const transaction = store.transaction;

        // Clear existing data before importing new data to avoid duplicates
        const clearRequest = store.clear();
        await new Promise((resolve, reject) => {
            clearRequest.onsuccess = () => {
              resolve();
            };
            clearRequest.onerror = (event) => {
              reject(event.target.error);
            };
        });

        // Add new posts
        for (const post of postsToImport) {
            // Ensure post has an 'id' and other necessary fields if they're missing
            // And ensure 'hashtags' field is present (can be empty array)
            const postToAdd = {
                id: post.id || generateUniqueId(),
                text: post.text || '',
                timestamp: post.timestamp || new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('de-DE'),
                likes: post.likes || 0,
                imageUrl: post.imageUrl || null,
                videoUrl: post.videoUrl || '',
                replies: post.replies || [],
                likedBy: post.likedBy || [],
                hashtags: post.hashtags || [], // Ensure hashtags field is present
            };
            store.add(postToAdd);
        }

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => {
              resolve(true);
            };
            transaction.onerror = (event) => {
              reject(event.target.error);
            };
        });
    } catch (error) {
        return false;
    }
};


// Main App Component
export default function App() {
  const [language, setLanguageState] = useState(() => localStorage.getItem('appLanguage') || 'de'); // Default language is German
  // State to track if the view is mobile (screen width < 640px)
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1100);

  // Memoize the setLanguage function to prevent unnecessary re-renders of LanguageProvider
  const setLanguageAndSave = useMemo(() => (lang) => {
    setLanguageState(lang);
    localStorage.setItem('appLanguage', lang);
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    // Load language from localStorage on mount
    try {
      const storedLanguage = localStorage.getItem('appLanguage') || 'de';
      setLanguageState(storedLanguage);
    } catch (error) {
      setLanguageState('de'); // Fallback to German
    }

    // Add event listener for window resize to determine mobile view
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1100);
    };

    window.addEventListener('resize', handleResize);
    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // NEW: Service Worker Registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            // Service Worker erfolgreich registriert
          })
          .catch(error => {
            // Service Worker Registrierung fehlgeschlagen
          });
      });
    }
  }, []); // Leeres Abhängigkeits-Array sorgt dafür, dass dies nur einmal beim Mounten ausgeführt wird


  const [posts, setPosts] = useState([]);
  // KORREKTUR: userName und profileImageUrl aus localStorage initialisieren
  const [userName, setUserName] = useState(() => localStorage.getItem('diaryUserName') || 'Nutzer'); // Default user name
  const [profileImageUrl, setProfileImageUrl] = useState(() => localStorage.getItem('diaryProfileImageUrl') || null); // New state for profile image URL
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'profile', 'search', 'settings'
  const [selectedPostId, setSelectedPostId] = useState(null); // State for selected post for detail view
  const [showPostForm, setShowPostForm] = useState(false); // State to control new post modal
  const [editingPost, setEditingPost] = useState(null); // State for post being edited
  const [migrationStatus, setMigrationStatus] = useState(''); // New state for migration messages
  const [selectedHashtag, setSelectedHashtag] = useState(null); // New state for selected hashtag in search
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Define t directly within App, using the language state
  const t = useCallback((key) => {
    return translations[language][key] || key;
  }, [language]); // t depends on the language state


  // Function to get personalized greeting based on time of day
  const getGreeting = (name) => {
    const hour = new Date().getHours();
    let greetingTextKey = '';

    if (hour >= 5 && hour < 12) {
      greetingTextKey = 'goodMorning';
    } else if (hour >= 12 && hour < 18) {
      greetingTextKey = 'goodAfternoon';
    } else if (hour >= 18 && hour < 22) {
      greetingTextKey = 'goodEvening';
    } else {
      greetingTextKey = 'goodNight';
    }
    // Now use the t function for greeting
    return `${t(greetingTextKey)}, ${name}!`;
  };

  // Load data from IndexedDB on initial mount
  useEffect(() => {
    const loadData = async () => {
      let loadedPosts = [];
      let loadedUserName = localStorage.getItem('diaryUserName') || 'Nutzer'; // userName still in localStorage for simplicity here
      let loadedProfileImageUrl = localStorage.getItem('diaryProfileImageUrl') || null;

      try {
        // Attempt to load from IndexedDB first
        loadedPosts = await getPostsDB();

        // Data migration logic: If IndexedDB is empty but localStorage has posts, migrate them.
        if (loadedPosts.length === 0) {
          try {
            const storedPosts = JSON.parse(localStorage.getItem('diaryPosts')) || [];
            if (storedPosts.length > 0) {
              setMigrationStatus(t('migratingOldData')); // Use t function
              await importPostsFromJSON(storedPosts);
              loadedPosts = await getPostsDB(); // Reload from IndexedDB after migration
              localStorage.removeItem('diaryPosts'); // Clear old localStorage data after successful migration
              setMigrationStatus(t('dataMigrationComplete')); // Use t function
              setTimeout(() => setMigrationStatus(''), 3000);
            } else {
            }
          } catch (migrationError) {
            setMigrationStatus(t('errorMigratingData')); // Use t function
            setTimeout(() => setMigrationStatus(''), 3000);
            // Fallback: if migration fails, try to load from localStorage if IndexedDB is still empty
            if (loadedPosts.length === 0) {
                loadedPosts = JSON.parse(localStorage.getItem('diaryPosts')) || [];
            }
          }
        }
      } catch (error) {
        setMigrationStatus(t('errorLoadingIndexedDB')); // Use t function
        // Fallback to localStorage if IndexedDB fails completely on load
        loadedPosts = JSON.parse(localStorage.getItem('diaryPosts')) || [];
        setTimeout(() => setMigrationStatus(''), 3000);
      }

      // Final data consistency check/migration for new fields and hashtags
      const migratedPosts = loadedPosts.map(post => {
        const updatedPost = { ...post };
        if (!updatedPost.likedBy) {
          updatedPost.likedBy = [];
        }
        if (typeof updatedPost.likes !== 'number') {
            updatedPost.likes = 0;
        }
        // Ensure hashtags field is present. For old posts, extract from text.
        // For new posts, it will already be set by PostForm.
        if (!updatedPost.hashtags) {
            updatedPost.hashtags = extractHashtags(updatedPost.text);
        }
        if (updatedPost.replies) {
          updatedPost.replies = updatedPost.replies.map(reply => {
            const updatedReply = { ...reply };
            if (!updatedReply.likedBy) {
              updatedReply.likedBy = [];
            }
            if (typeof updatedReply.likes !== 'number') {
                updatedReply.likes = 0;
            }
            // Ensure hashtags field is present for replies.
            if (!updatedReply.hashtags) {
                updatedReply.hashtags = extractHashtags(updatedReply.text);
            }
            // userName and profileImageUrl are no longer stored directly on replies as per new logic.
            // If they were present from old data, they will now be ignored when rendering.
            return updatedReply;
          });
        } else {
            updatedPost.replies = [];
        }
        return updatedPost;
      });

      setPosts(migratedPosts);
      setUserName(loadedUserName); // Set loaded user name
      setProfileImageUrl(loadedProfileImageUrl); // Set loaded profile image
    };

    loadData();
  }, [language, t]); // Depend on language and t to re-run greeting logic on language change


  // NEU: Save userName to Local Storage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('diaryUserName', userName);
    } catch (error) {
    }
  }, [userName]);

  // NEU: Save profileImageUrl to Local Storage whenever it changes
  useEffect(() => {
    try {
      if (profileImageUrl) {
        localStorage.setItem('diaryProfileImageUrl', profileImageUrl);
      } else {
        localStorage.removeItem('diaryProfileImageUrl'); // Remove if null
      }
    } catch (error) {
    }
  }, [profileImageUrl]);

  const handleAddPost = async (newPost) => {
    try {
      const addedPost = await addPostDB(newPost);
      if (addedPost) {
        setPosts(prevPosts => [addedPost, ...prevPosts]);
      }
    } catch (error) {
      // console.error(t('errorAddingPost'), error); // Removed console.log
    }
  };

  const handleLikePost = async (postId, currentUser) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const likedBy = post.likedBy || [];
        const updatedPost = { ...post };
        if (likedBy.includes(currentUser)) {
          updatedPost.likes = post.likes - 1;
          updatedPost.likedBy = likedBy.filter(id => id !== currentUser);
        } else {
          updatedPost.likes = post.likes + 1;
          updatedPost.likedBy = [...likedBy, currentUser];
        }
        updatePostDB(updatedPost); // Update in IndexedDB
        return updatedPost;
      }
      return post;
    }));
  };

  const handleEditPost = (postToEdit) => {
    setEditingPost(postToEdit);
  };

  const handleSaveEditedPost = (updatedPost) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === updatedPost.id) {
        updatePostDB(updatedPost); // Update in IndexedDB
        return updatedPost;
      }
      return post;
    }));
    setEditingPost(null); // Close the edit modal
  };

  const handleDeletePost = (postId) => {
    setConfirmAction({
      type: 'deletePost',
      id: postId,
      message: t('confirmDeletePost'), // Use t function
    });
    setShowConfirmDialog(true);
  };

  const confirmDeletePost = async (postId) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      await new Promise((resolve, reject) => {
        const request = store.delete(postId);
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = (event) => {
          reject(event.target.error);
        };
      });
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      setMigrationStatus(t('errorDeletingPost')); // Use t function
      setTimeout(() => setMigrationStatus(''), 3000);
    } finally {
      setShowConfirmDialog(false);
      setConfirmAction(null);
    }
  };


  const handleLikeReply = async (postId, replyIndex, currentUser) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const updatedReplies = post.replies.map((reply, index) => {
          if (index === replyIndex) {
            const likedBy = reply.likedBy || [];
            const updatedReply = { ...reply };
            if (likedBy.includes(currentUser)) {
              updatedReply.likes = (reply.likes || 0) - 1;
              updatedReply.likedBy = likedBy.filter(id => id !== currentUser);
            } else {
              updatedReply.likes = (reply.likes || 0) + 1;
              updatedReply.likedBy = [...likedBy, currentUser];
            }
            return updatedReply;
          }
          return reply;
        });
        const updatedPost = { ...post, replies: updatedReplies };
        updatePostDB(updatedPost);
        return updatedPost;
      }
      return post;
    }));
  };

  const handleEditReply = async (postId, replyIndex, updatedReply) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const replies = [...post.replies];
        replies[replyIndex] = updatedReply;
        const updatedPost = { ...post, replies };
        updatePostDB(updatedPost);
        return updatedPost;
      }
      return post;
    }));
  };

  const handleDeleteReply = (postId, replyIndex) => {
    setConfirmAction({
      type: 'deleteReply',
      postId: postId,
      replyIndex: replyIndex,
      message: t('confirmDeleteReply'), // Use t function
    });
    setShowConfirmDialog(true);
  };

  const confirmDeleteReply = async (postId, replyIndex) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const updatedReplies = post.replies.filter((_, index) => index !== replyIndex);
        const updatedPost = { ...post, replies: updatedReplies };
        updatePostDB(updatedPost);
        return updatedPost;
      }
      return post;
    }));
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };


  const handleAddReply = async (postId, replyData) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        // userName and profileImageUrl are taken from the current App state, not from replyData,
        // so replies always reflect the current user's profile.
        const newReply = {
          text: replyData.text,
          imageUrl: replyData.imageUrl,
          videoUrl: replyData.videoUrl,
          hashtags: replyData.hashtags,
          timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('de-DE'),
          likes: 0,
          likedBy: []
        };
        const updatedPost = { ...post, replies: [...post.replies, newReply] };
        updatePostDB(updatedPost);
        return updatedPost;
      }
      return post;
    }));
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  const handleBackFromDetail = () => {
    setSelectedPostId(null); // Clear selected post to go back to main view
  };

  const handleHashtagClick = (hashtag) => {
    setSelectedHashtag(hashtag); // Set the clicked hashtag
    setCurrentPage('search'); // Navigate to the search page
  };


  // Function to show a global message at the top level
  const showGlobalMessage = (msg, isError = false) => {
    setMigrationStatus(msg); // Reusing migrationStatus for general global messages
    setTimeout(() => setMigrationStatus(''), 3000);
  };

  // Memoized list of all unique hashtags for the HashtagSelector
  const allAvailableHashtags = useMemo(() => {
    const uniqueHashtags = new Set();
    posts.forEach(post => {
      (post.hashtags || []).forEach(tag => uniqueHashtags.add(tag));
      (post.replies || []).forEach(reply => {
        (reply.hashtags || []).forEach(tag => uniqueHashtags.add(tag));
      });
    });
    const sortedHashtags = Array.from(uniqueHashtags).sort();
    return sortedHashtags;
  }, [posts]); // Recalculate when posts change


  // Dynamic padding for body and scroll behavior based on view state
  useEffect(() => {
    // When a modal/detail view is active, or if the page is fixed to fill the screen
    if (selectedPostId || showPostForm || editingPost || (currentPage !== 'home' && currentPage !== 'profile' && currentPage !== 'search' && currentPage !== 'settings')) {
        document.body.style.setProperty('--dynamic-padding-bottom', '0px');
        document.documentElement.classList.add('overflow-hidden');
        document.body.classList.add('overflow-hidden');
    } else {
        // For regular pages (home, profile, search, settings)
        // Add padding for bottom nav bar only if in mobile view
        if (isMobileView) {
          document.body.style.setProperty('--dynamic-padding-bottom', '6rem'); // Adjust based on BottomNavBar height
        } else {
          document.body.style.setProperty('--dynamic-padding-bottom', '0px');
        }
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
    }

    // Set min-height for html and body to ensure background covers full viewport
    document.documentElement.style.minHeight = '100vh';
    document.body.style.minHeight = '100vh';

    // Cleanup function
    return () => {
      // Reset styles and classes on component unmount
      document.body.style.setProperty('--dynamic-padding-bottom', '0px');
      document.documentElement.classList.remove('overflow-hidden');
      document.body.classList.remove('overflow');
      document.documentElement.style.minHeight = ''; // Remove inline style
      document.body.style.minHeight = ''; // Remove inline style
    };
  }, [selectedPostId, showPostForm, editingPost, currentPage, isMobileView]);


  const renderPage = () => {
    const currentGreeting = getGreeting(userName);

    if (selectedPostId) {
      const post = posts.find(p => p.id === selectedPostId);
      return <PostDetailView
                post={post}
                onLike={handleLikePost}
                onAddReply={handleAddReply}
                onBack={handleBackFromDetail}
                userName={userName}
                onLikeReply={handleLikeReply}
                onHashtagClick={handleHashtagClick}
                allAvailableHashtags={allAvailableHashtags}
                profileImageUrl={profileImageUrl}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
                onEditReply={handleEditReply}
                onDeleteReply={handleDeleteReply}
                t={t}
             />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage
                posts={posts}
                onLikePost={handleLikePost}
                onAddReply={handleAddReply}
                onPostClick={handlePostClick} // Added this
                greeting={currentGreeting}
                userName={userName}
                onHashtagClick={handleHashtagClick}
                profileImageUrl={profileImageUrl}
                onEditPost={handleEditPost} // Pass handleEditPost
                onDeletePost={handleDeletePost} // Pass handleDeletePost
                t={t}
               />;
      case 'profile':
        return (
          <ProfilePage
            posts={posts}
            onLikePost={handleLikePost}
            onAddReply={handleAddReply}
            userName={userName}
            setUserName={setUserName}
            onPostClick={handlePostClick}
            onHashtagClick={handleHashtagClick}
            profileImageUrl={profileImageUrl}
            setProfileImageUrl={setProfileImageUrl}
            onEditPost={handleEditPost} // Pass handleEditPost
            onDeletePost={handleDeletePost} // Pass handleDeletePost
            t={t}
          />
        );
      case 'search':
        return <SearchPage
                posts={posts}
                onLikePost={handleLikePost}
                onAddReply={handleAddReply}
                userName={userName}
                onPostClick={handlePostClick}
                onHashtagClick={handleHashtagClick}
                selectedHashtag={selectedHashtag}
                setSelectedHashtag={setSelectedHashtag}
                onLikeReply={handleLikeReply}
                profileImageUrl={profileImageUrl}
                onEditPost={handleEditPost} // Pass handleEditPost
                onDeletePost={handleDeletePost} // Pass handleDeletePost
                onEditReply={handleEditReply}
                onDeleteReply={handleDeleteReply}
                t={t}
               />;
      case 'settings':
        return (
          <SettingsPage
            posts={posts}
            setPosts={setPosts}
            userName={userName}
            setUserName={setUserName}
            importPostsFromJSON={importPostsFromJSON}
            showGlobalMessage={showGlobalMessage}
            language={language}
            setLanguage={setLanguageAndSave}
            t={t}
          />
        );
      default:
        return <HomePage
                posts={posts}
                onLikePost={handleLikePost}
                onAddReply={handleAddReply}
                onPostClick={handlePostClick} // Added this
                greeting={currentGreeting}
                userName={userName}
                onHashtagClick={handleHashtagClick}
                profileImageUrl={profileImageUrl}
                onEditPost={handleEditPost} // Pass handleEditPost
                onDeletePost={handleDeletePost} // Pass handleDeletePost
                t={t}
               />;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageAndSave, t }}>
      <ThemeProvider>
        {/* Outermost container for the application. The background color is on the individual page components, not here. */}
        <div className="min-h-screen w-full font-inter relative flex justify-center"> {/* Changed to relative and justify-center */}

          {/* Navigation Bar - conditionally rendered based on mobile view and modal state */}
          {!selectedPostId && !showPostForm && !editingPost && (
            isMobileView ? (
              <BottomNavBar currentPage={currentPage} onNavigate={setCurrentPage} t={t} />
            ) : (
              <NavBar currentPage={currentPage} onNavigate={setCurrentPage} t={t} />
            )
          )}

          {/* Main content area: The individual page components (HomePage etc.) now fill the screen and center their content */}
          {/* Added dynamic padding-bottom for mobile view to prevent content being hidden by bottom nav */}
          <div className={`flex-1 flex flex-col items-center w-full z-10 ${isMobileView && !selectedPostId && !showPostForm && !editingPost ? 'pb-24' : ''}`}>
            {migrationStatus && (
              <div className="fixed top-0 left-0 right-0 p-3 bg-blue-100 text-blue-800 text-center shadow-md z-50 dark:bg-blue-900 dark:text-blue-100 transition-colors duration-500">
                {migrationStatus}
              </div>
            )}
            {renderPage()}
          </div>

          {/* Floating Action Button for new post - positioned relative to the main content area (which is now full screen) */}
          {/* Hidden if in mobile view and a specific page other than PostDetailView (which has its own reply input) is active */}
          {!selectedPostId && !showPostForm && !editingPost && !isMobileView && (
            <button
              onClick={() => setShowPostForm(true)}
              className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 w-16 h-16 rounded-full bg-gray-100 text-blue-500 shadow-outset-lg flex items-center justify-center text-3xl font-bold neumorphic-btn-active-press transition-all duration-200 z-40 dark:bg-neutral-900 dark:text-blue-300"
              title={t('post')} // Use t function
            >
              {/* Feather icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}
          {/* Show the Floating Action Button for new post in mobile view only when on home, profile, search, or settings page */}
          {isMobileView && !selectedPostId && !showPostForm && !editingPost && (
            <button
              onClick={() => setShowPostForm(true)}
              className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-gray-100 text-blue-500 shadow-outset-lg flex items-center justify-center text-3xl font-bold neumorphic-btn-active-press transition-all duration-200 z-40 dark:bg-neutral-900 dark:text-blue-300"
              title={t('post')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          )}


          {/* Modals are still fixed to the viewport */}
          {/* PostForm as a modal screen */}
          {showPostForm && (
            <PostForm onAddPost={handleAddPost} onClose={() => setShowPostForm(false)} userName={userName} allAvailableHashtags={allAvailableHashtags} profileImageUrl={profileImageUrl} t={t} />
          )}

          {/* EditPostForm as a modal screen */}
          {editingPost && (
            <EditPostForm post={editingPost} onSave={handleSaveEditedPost} onClose={() => setEditingPost(null)} userName={userName} allAvailableHashtags={allAvailableHashtags} profileImageUrl={profileImageUrl} t={t} />
          )}

          {/* Confirmation Dialog */}
          {showConfirmDialog && confirmAction && (
            <ConfirmationDialog
              message={confirmAction.message}
              onConfirm={() => {
                if (confirmAction.type === 'deletePost') {
                  confirmDeletePost(confirmAction.id);
                } else if (confirmAction.type === 'deleteReply') {
                  confirmDeleteReply(confirmAction.postId, confirmAction.replyIndex);
                }
              }}
              onCancel={() => {
                setShowConfirmDialog(false);
                setConfirmAction(null);
              }}
              t={t}
            />
          )}
        </div>
      </ThemeProvider>
    </LanguageContext.Provider>
  );
}
