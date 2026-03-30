const SB_URL = 'https://tdjtjgsrotfhnodbtmbj.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkanRqZ3Nyb3RmaG5vZGJ0bWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NjM5NjIsImV4cCI6MjA5MDMzOTk2Mn0.jjlbqIjOOiy01Z6RbN6oTK0jdeNYxZ7XbeEg-wFb01A';
const supabase = window.supabase.createClient(SB_URL, SB_KEY);

let user = null;

// Initialization
async function init() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        user = session.user;
        showApp();
    }
}

function showApp() {
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('app-view').style.display = 'flex';
    document.getElementById('user-info').innerText = user.email.split('@')[0];
    loadHistory();
}

async function login() {
    await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: window.location.origin + window.location.pathname }
    });
}

async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
}

async function send() {
    const input = document.getElementById('userInput');
    const msg = input.value.trim();
    if (!msg) return;

    addBubble(msg, 'user');
    input.value = '';

    // Create Loading Bubble
    const loaderId = 'load-' + Date.now();
    const container = document.getElementById('messages-container');
    const loadDiv = document.createElement('div');
    loadDiv.id = loaderId;
    loadDiv.className = 'msg sage';
    loadDiv.innerHTML = '<div class="typing"></div>';
    container.appendChild(loadDiv);
    container.scrollTop = container.scrollHeight;

    try {
        const tone = document.getElementById('ai-tone').value;
        const res = await fetch(`https://sage-ai-nse9.onrender.com/chat?user_id=${user.id}&message=${encodeURIComponent(msg)}&tone=${tone}`, { method: 'POST' });
        const data = await res.json();
        
        document.getElementById(loaderId).innerText = data.reply;
        loadHistory();
    } catch (e) {
        document.getElementById(loaderId).innerText = "Sage is taking a nap. Please wait for the server to wake up.";
    }
}

function addBubble(text, type) {
    const container = document.getElementById('messages-container');
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

async function loadHistory() {
    const { data } = await supabase.from('chat_history').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10);
    const list = document.getElementById('history-list');
    list.innerHTML = data.map(item => `<div class="history-item">${item.message.substring(0,25)}...</div>`).join('');
}

function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

function handleEnter(e) { if(e.key === 'Enter') send(); }

init();
