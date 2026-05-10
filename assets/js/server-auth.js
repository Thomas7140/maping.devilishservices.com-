// server-auth.js — Server authentication and save integration
// References globals from the main inline script:
//   state, statusEl, addLog, loadMisFile, rebuildMIS, downloadText,
//   clearEditorMap, hasMapLoaded, menuHandlers

// ----- Extend state with auth properties -----
Object.assign(state, {
  authModalOpen: false,
  authMode: 'login',
  authUser: null,
  uploadModalOpen: false,
  exportModalOpen: false,
  exportConversionTimer: null,
  exportConversionProgress: 0,
  exportDownloadInfo: null,
  uploadedMaps: [],
  uploadedMapsLoading: false,
  uploadSelectedFile: null,
  uploadRequest: null,
  uploadConversionTimer: null,
  uploadConversionProgress: 0,
});

// ----- DOM refs -----
const openUploadMapBtn   = document.getElementById('openUploadMapBtn');
const openLoginBtn       = document.getElementById('openLoginBtn');
const openRegisterBtn    = document.getElementById('openRegisterBtn');
const logoutBtn          = document.getElementById('logoutBtn');
const userDashboardLink  = document.getElementById('userDashboardLink');
const authUserBadge      = document.getElementById('authUserBadge');
const loginOverlay       = document.getElementById('loginOverlay');
const registerOverlay    = document.getElementById('registerOverlay');
const uploadMapOverlay   = document.getElementById('uploadMapOverlay');
const exportBmsOverlay   = document.getElementById('exportBmsOverlay');
const loginCloseBtn      = document.getElementById('loginCloseBtn');
const registerCloseBtn   = document.getElementById('registerCloseBtn');
const uploadMapCloseBtn  = document.getElementById('uploadMapCloseBtn');
const exportBmsCloseBtn  = document.getElementById('exportBmsCloseBtn');
const loginMessage       = document.getElementById('loginMessage');
const registerMessage    = document.getElementById('registerMessage');
const uploadMapMessage   = document.getElementById('uploadMapMessage');
const exportBmsMessage   = document.getElementById('exportBmsMessage');
const exportBmsProgressGroup  = document.getElementById('exportBmsProgressGroup');
const exportBmsProgressValue  = document.getElementById('exportBmsProgressValue');
const exportBmsProgressFill   = document.getElementById('exportBmsProgressFill');
const exportBmsProgressBoxes  = document.getElementById('exportBmsProgressBoxes');
const exportBmsFilename       = document.getElementById('exportBmsFilename');
const exportBmsPath           = document.getElementById('exportBmsPath');
const switchToRegisterBtn     = document.getElementById('switchToRegisterBtn');
const switchToLoginBtn        = document.getElementById('switchToLoginBtn');
const loginForm               = document.getElementById('loginForm');
const registerForm            = document.getElementById('registerForm');
const uploadMapChooseBtn      = document.getElementById('uploadMapChooseBtn');
const uploadMapSelectedFileEl = document.getElementById('uploadMapSelectedFile');
const uploadMapCancelBtn      = document.getElementById('uploadMapCancelBtn');
const uploadMapSubmitBtn      = document.getElementById('uploadMapSubmitBtn');
const exportBmsCancelBtn      = document.getElementById('exportBmsCancelBtn');
const exportBmsDownloadBtn    = document.getElementById('exportBmsDownloadBtn');
const loginEmail              = document.getElementById('loginEmail');
const loginPassword           = document.getElementById('loginPassword');
const registerDisplayName     = document.getElementById('registerDisplayName');
const registerEmail           = document.getElementById('registerEmail');
const registerPassword        = document.getElementById('registerPassword');
const registerPasswordConfirm = document.getElementById('registerPasswordConfirm');
const loginSubmitBtn          = document.getElementById('loginSubmitBtn');
const registerSubmitBtn       = document.getElementById('registerSubmitBtn');
const uploadProgressOverlay   = document.getElementById('uploadProgressOverlay');
const uploadProgressCloseBtn  = document.getElementById('uploadProgressCloseBtn');
const uploadProgressStatus    = document.getElementById('uploadProgressStatus');
const uploadProgressValue     = document.getElementById('uploadProgressValue');
const uploadProgressFill      = document.getElementById('uploadProgressFill');
const conversionProgressGroup = document.getElementById('conversionProgressGroup');
const conversionProgressValue = document.getElementById('conversionProgressValue');
const conversionProgressFill  = document.getElementById('conversionProgressFill');
const uploadedMapSelect       = document.getElementById('uploadedMapSelect');
const uploadMapInput          = document.getElementById('uploadMapInput');

// ----- Server API functions -----

async function saveMapToServer(filename, content) {
  const response = await fetch('save_map.php', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename, content }),
  });
  let data = null;
  try { data = await response.json(); } catch (_) {}
  if (!response.ok || !data?.success) {
    throw new Error(data?.error || `Server save failed with HTTP ${response.status}`);
  }
  return data;
}

async function downloadBinaryExport(downloadUrl, filename) {
  const response = await fetch(downloadUrl, { method: 'GET', credentials: 'same-origin' });
  if (!response.ok) {
    let data = null;
    try { data = await response.json(); } catch (_) {}
    throw new Error(data?.error || `Binary download failed with HTTP ${response.status}`);
  }
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename || 'mission.bms';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

async function exportCurrentMapAsBinary(options = {}) {
  if (!state.rawText) {
    statusEl.textContent = 'No map is loaded to export.';
    return false;
  }
  if (!state.authUser) {
    const ok = await syncAuthSession();
    if (!ok) {
      setAuthMessage('Sign in before exporting a binary mission.', 'error');
      openAuthModal('login');
      return false;
    }
  }
  if (options?.saveFirst) {
    const saved = await serverSaveCurrentMap();
    if (!saved) return false;
  }
  const content = rebuildMIS(state.rawText, state.items, state.sectionBlocks);
  let filename = state.filename || 'edited.mis';
  if (!/\.mis$/i.test(filename)) filename += '.mis';
  const targetFilename = filename.replace(/\.mis$/i, '.bms');
  openExportBmsModal({ filename: targetFilename, path: 'Converting to completed-maps...' }, { mode: 'loading' });
  try {
    const response = await fetch('export_binary_mission.php', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ filename, content }),
    });
    let data = null;
    try { data = await response.json(); } catch (_) {}
    if (!response.ok || !data?.success) throw new Error(data?.error || `Binary export failed with HTTP ${response.status}`);
    openExportBmsModal(
      { downloadUrl: data.download_url, filename: data.filename || targetFilename, path: data.path || 'completed-maps' },
      { mode: 'ready' }
    );
    statusEl.textContent = `Exported binary mission to ${data.path || data.filename || 'mission.bms'}.`;
    addLog(`Exported binary mission: ${data.path || data.filename || 'mission.bms'} (${data.bytes || 0} bytes)`);
    return true;
  } catch (err) {
    stopExportBmsProgress();
    addLog(`ERROR exporting binary mission: ${err?.message || 'unknown error'}`);
    statusEl.textContent = 'Failed to export binary mission (see Logs).';
    if (exportBmsMessage) exportBmsMessage.textContent = err?.message || 'Export failed.';
    return false;
  }
}

// Server-side save (used by menu handlers). Falls back to browser save.
async function serverSaveCurrentMap(options = {}) {
  const forcePicker = Boolean(options?.forcePicker);
  if (!state.rawText) return false;
  const out = rebuildMIS(state.rawText, state.items, state.sectionBlocks);
  let filename = state.filename || 'edited.mis';
  if (forcePicker) {
    const chosen = window.prompt('Save completed map as:', filename);
    if (chosen === null) { statusEl.textContent = 'Save canceled.'; return false; }
    filename = chosen.trim() || filename;
  }
  if (!/\.mis$/i.test(filename)) filename += '.mis';
  try {
    const result = await saveMapToServer(filename, out);
    state.filename = result.filename || filename;
    statusEl.textContent = `Saved to ${result.path || state.filename}.`;
    addLog(`Saved map to server: ${result.path || state.filename} (${result.bytes || out.length} bytes)`);
    await refreshUploadedMapList();
    return true;
  } catch (err) {
    addLog(`Server save failed: ${err?.message || 'unknown error'}`);
    statusEl.textContent = `Server save failed: ${err?.message || 'unknown error'}`;
    return false;
  }
}

// ----- Auth helpers -----

function setAuthMessage(message, tone, target) {
  tone = tone || 'info';
  target = target || state.authMode;
  const box = target === 'register' ? registerMessage : loginMessage;
  if (!box) return;
  if (!message) { box.hidden = true; box.textContent = ''; box.dataset.tone = ''; return; }
  box.hidden = false;
  box.textContent = message;
  box.dataset.tone = tone;
}

function clearAuthMessages() {
  setAuthMessage('', 'info', 'login');
  setAuthMessage('', 'info', 'register');
}

function updateAuthHeader() {
  if (!authUserBadge) return;
  const user = state.authUser;
  if (!user) {
    if (openUploadMapBtn) openUploadMapBtn.hidden = true;
    if (userDashboardLink) userDashboardLink.hidden = true;
    authUserBadge.hidden = true;
    authUserBadge.textContent = '';
    if (openLoginBtn) openLoginBtn.hidden = false;
    if (openRegisterBtn) openRegisterBtn.hidden = false;
    if (logoutBtn) logoutBtn.hidden = true;
    return;
  }
  if (openUploadMapBtn) openUploadMapBtn.hidden = false;
  if (userDashboardLink) userDashboardLink.hidden = false;
  authUserBadge.hidden = false;
  authUserBadge.textContent = `Signed in as ${user.display_name || user.email || 'User'}`;
  if (openLoginBtn) openLoginBtn.hidden = true;
  if (openRegisterBtn) openRegisterBtn.hidden = true;
  if (logoutBtn) logoutBtn.hidden = false;
}

async function syncAuthSession() {
  try {
    const response = await fetch('modules/auth/session.php', {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json' },
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      state.authUser = null; updateAuthHeader(); await refreshUploadedMapList(); return false;
    }
    const previousUserId = state.authUser?.id || null;
    state.authUser = result.authenticated ? (result.user || null) : null;
    updateAuthHeader();
    if ((state.authUser?.id || null) !== previousUserId || !state.uploadedMaps.length) {
      await refreshUploadedMapList();
    }
    return !!state.authUser;
  } catch (_) {
    state.authUser = null; updateAuthHeader(); await refreshUploadedMapList(); return false;
  }
}

function openAuthModal(mode) {
  state.authMode = mode === 'register' ? 'register' : 'login';
  state.authModalOpen = true;
  clearAuthMessages();
  loginOverlay?.classList.toggle('open', state.authMode === 'login');
  registerOverlay?.classList.toggle('open', state.authMode === 'register');
  loginOverlay?.setAttribute('aria-hidden', state.authMode === 'login' ? 'false' : 'true');
  registerOverlay?.setAttribute('aria-hidden', state.authMode === 'register' ? 'false' : 'true');
  if (state.authMode === 'login') loginEmail?.focus();
  else registerDisplayName?.focus();
}

function closeAuthModal() {
  state.authModalOpen = false;
  loginOverlay?.classList.remove('open');
  registerOverlay?.classList.remove('open');
  loginOverlay?.setAttribute('aria-hidden', 'true');
  registerOverlay?.setAttribute('aria-hidden', 'true');
  clearAuthMessages();
}

// ----- Uploaded map list -----

function isLoadableMisUpload(upload) {
  const storedPath = String(upload?.stored_path || '').trim();
  const storedFilename = String(upload?.stored_filename || '').trim();
  const originalFilename = String(upload?.original_filename || '').trim();
  const originalExtension = String(upload?.original_extension || '').trim().toLowerCase();
  if (originalExtension === 'bms') return false;
  if (/^uploads\//i.test(storedPath)) return false;
  if (/\.bms$/i.test(storedPath) || /\.bms$/i.test(storedFilename)) return false;
  if (/\.bms$/i.test(originalFilename) && !/\.mis$/i.test(storedFilename) && !/\.mis$/i.test(storedPath)) return false;
  return /\.mis$/i.test(storedPath) || /\.mis$/i.test(storedFilename);
}

function formatUploadedMapOption(upload) {
  const name = String(upload?.stored_filename || upload?.original_filename || 'uploaded map').replace(/\.bms$/i, '.mis');
  const created = String(upload?.created_at || '').replace('T', ' ').slice(0, 16);
  return created ? `${name} — ${created}` : name;
}

function updateUploadedMapSelect() {
  if (!uploadedMapSelect) return;
  uploadedMapSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  if (!state.authUser) {
    placeholder.textContent = 'Sign in to view uploaded maps';
    uploadedMapSelect.appendChild(placeholder);
    uploadedMapSelect.disabled = true;
    return;
  }
  if (state.uploadedMapsLoading) {
    placeholder.textContent = 'Loading uploaded maps...';
    uploadedMapSelect.appendChild(placeholder);
    uploadedMapSelect.disabled = true;
    return;
  }
  if (!state.uploadedMaps.length) {
    placeholder.textContent = 'No uploaded maps yet';
    uploadedMapSelect.appendChild(placeholder);
    uploadedMapSelect.disabled = true;
    return;
  }
  placeholder.textContent = 'Select an uploaded map...';
  uploadedMapSelect.appendChild(placeholder);
  for (const upload of state.uploadedMaps) {
    const option = document.createElement('option');
    option.value = String(upload?.stored_path || '');
    option.textContent = formatUploadedMapOption(upload);
    option.dataset.filename = String(upload?.stored_filename || upload?.original_filename || 'uploaded.mis');
    option.dataset.originalFilename = String(upload?.original_filename || upload?.stored_filename || 'uploaded.mis');
    option.dataset.status = String(upload?.conversion_status || '');
    uploadedMapSelect.appendChild(option);
  }
  uploadedMapSelect.disabled = false;
}

async function refreshUploadedMapList() {
  if (!uploadedMapSelect) return;
  if (!state.authUser) {
    state.uploadedMaps = []; state.uploadedMapsLoading = false;
    updateUploadedMapSelect(); return;
  }
  state.uploadedMapsLoading = true;
  updateUploadedMapSelect();
  try {
    const response = await fetch('modules/maps/list_uploads.php', {
      method: 'GET', credentials: 'same-origin', headers: { Accept: 'application/json' },
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) throw new Error(result?.error || `Failed to load uploaded maps (${response.status})`);
    state.uploadedMaps = (Array.isArray(result.uploads) ? result.uploads : []).filter(isLoadableMisUpload);
  } catch (error) {
    console.warn('Uploaded map list failed:', error);
    state.uploadedMaps = [];
    if (uploadedMapSelect) {
      uploadedMapSelect.innerHTML = '<option value="">Could not load uploaded maps</option>';
      uploadedMapSelect.disabled = true;
    }
    return;
  } finally {
    state.uploadedMapsLoading = false;
  }
  updateUploadedMapSelect();
}

async function loadSelectedUploadedMap() {
  if (!uploadedMapSelect || !uploadedMapSelect.value) return;
  const selectedOption = uploadedMapSelect.selectedOptions?.[0];
  const storedPath = uploadedMapSelect.value;
  const storedFilename = selectedOption?.dataset?.filename || storedPath.split('/').pop() || 'uploaded.mis';
  try {
    statusEl.textContent = `Loading ${storedFilename}...`;
    const response = await fetch(encodeURI(storedPath), { credentials: 'same-origin' });
    if (!response.ok) throw new Error(`Could not fetch ${storedFilename} (${response.status})`);
    const blob = await response.blob();
    const displayFilename = String(storedFilename || 'uploaded.mis').replace(/\.bms$/i, '.mis');
    const file = new File([blob], displayFilename, { type: blob.type || 'text/plain' });
    await loadMisFile(file);
    statusEl.textContent = `${storedFilename} loaded from uploaded files.`;
  } catch (error) {
    statusEl.textContent = error?.message || 'Could not load uploaded map.';
  } finally {
    uploadedMapSelect.value = '';
  }
}

// ----- Upload map UI -----

function setUploadMapMessage(message, tone) {
  tone = tone || 'info';
  if (!uploadMapMessage) return;
  uploadMapMessage.textContent = message || 'Choose a .mis or .bms file to upload.';
  uploadMapMessage.dataset.tone = tone;
}

function updateUploadSelectionUi() {
  const file = state.uploadSelectedFile;
  if (uploadMapSelectedFileEl) {
    uploadMapSelectedFileEl.textContent = file
      ? `${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`
      : 'No file selected.';
  }
  if (uploadMapSubmitBtn) uploadMapSubmitBtn.disabled = !file;
}

function openUploadSelectionModal() {
  state.uploadModalOpen = true;
  state.uploadSelectedFile = null;
  if (uploadMapInput) uploadMapInput.value = '';
  setUploadMapMessage('Choose a .mis or .bms file to upload.', 'info');
  updateUploadSelectionUi();
  uploadMapOverlay?.classList.add('open');
  uploadMapOverlay?.setAttribute('aria-hidden', 'false');
  uploadMapChooseBtn?.focus();
}

function closeUploadSelectionModal() {
  state.uploadModalOpen = false;
  state.uploadSelectedFile = null;
  if (uploadMapInput) uploadMapInput.value = '';
  updateUploadSelectionUi();
  uploadMapOverlay?.classList.remove('open');
  uploadMapOverlay?.setAttribute('aria-hidden', 'true');
}

// ----- Export BMS UI -----

function ensureExportBmsProgressBoxes(total) {
  total = total || 40;
  if (!exportBmsProgressBoxes) return [];
  const wanted = Math.max(1, Math.trunc(total));
  if (exportBmsProgressBoxes.childElementCount !== wanted) {
    exportBmsProgressBoxes.innerHTML = '';
    for (let i = 0; i < wanted; i++) {
      const box = document.createElement('div');
      box.className = 'exportProgressBox';
      exportBmsProgressBoxes.appendChild(box);
    }
  }
  return Array.from(exportBmsProgressBoxes.children);
}

function setExportBmsProgress(percent) {
  const normalized = Math.max(0, Math.min(100, Number.isFinite(percent) ? percent : 0));
  state.exportConversionProgress = normalized;
  if (exportBmsProgressValue) exportBmsProgressValue.textContent = `${Math.round(normalized)}%`;
  if (exportBmsProgressFill) exportBmsProgressFill.style.width = `${normalized}%`;
  const boxes = ensureExportBmsProgressBoxes(40);
  const activeCount = Math.round((normalized / 100) * boxes.length);
  boxes.forEach((box, i) => box.classList.toggle('filled', i < activeCount));
}

function stopExportBmsProgress() {
  if (state.exportConversionTimer) { clearInterval(state.exportConversionTimer); state.exportConversionTimer = null; }
}

function startExportBmsProgress() {
  stopExportBmsProgress();
  setExportBmsProgress(0);
  state.exportConversionTimer = setInterval(() => {
    const current = Number(state.exportConversionProgress) || 0;
    if (current >= 92) return;
    setExportBmsProgress(current + (current < 40 ? 8 : current < 75 ? 4 : 2));
  }, 180);
}

function openExportBmsModal(info, options) {
  options = options || {};
  const mode = options.mode === 'loading' ? 'loading' : 'ready';
  state.exportModalOpen = true;
  state.exportDownloadInfo = info || null;
  if (exportBmsMessage) exportBmsMessage.textContent = mode === 'loading' ? 'Converting MIS to BMS...' : 'Binary mission conversion complete. Ready to download.';
  if (exportBmsProgressGroup) exportBmsProgressGroup.hidden = mode !== 'loading';
  if (exportBmsFilename) exportBmsFilename.textContent = (info && info.filename) || 'mission.bms';
  if (exportBmsPath) exportBmsPath.textContent = mode === 'loading' ? ((info && info.path) || 'Preparing...') : ((info && info.path) || 'completed-maps');
  if (exportBmsCancelBtn) exportBmsCancelBtn.textContent = mode === 'loading' ? 'Hide' : 'Close';
  if (exportBmsDownloadBtn) exportBmsDownloadBtn.disabled = mode === 'loading';
  exportBmsOverlay?.classList.add('open');
  exportBmsOverlay?.setAttribute('aria-hidden', 'false');
  if (mode === 'loading') { startExportBmsProgress(); exportBmsCloseBtn?.focus(); }
  else { stopExportBmsProgress(); setExportBmsProgress(100); exportBmsDownloadBtn?.focus(); }
}

function closeExportBmsModal() {
  stopExportBmsProgress();
  state.exportModalOpen = false;
  state.exportDownloadInfo = null;
  exportBmsOverlay?.classList.remove('open');
  exportBmsOverlay?.setAttribute('aria-hidden', 'true');
}

async function handleExportBmsDownload() {
  const info = state.exportDownloadInfo;
  if (!info || !info.downloadUrl) { statusEl.textContent = 'No BMS download is available.'; return; }
  try {
    await downloadBinaryExport(info.downloadUrl, info.filename || 'mission.bms');
    statusEl.textContent = `Downloaded ${info.filename || 'mission.bms'}.`;
    closeExportBmsModal();
  } catch (err) {
    addLog(`ERROR downloading exported binary mission: ${err?.message || 'unknown error'}`);
    statusEl.textContent = 'Failed to download exported binary mission (see Logs).';
  }
}

// ----- Upload progress modal -----

function setUploadModalOpen(isOpen) {
  state.uploadModalOpen = !!isOpen;
  uploadProgressOverlay?.classList.toggle('open', !!isOpen);
  uploadProgressOverlay?.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
}

function closeUploadProgressModal() {
  stopConversionProgress();
  setUploadModalOpen(false);
}

function setUploadProgress(percent, message) {
  const normalized = Math.max(0, Math.min(100, Number.isFinite(percent) ? percent : 0));
  if (uploadProgressValue) uploadProgressValue.textContent = `${Math.round(normalized)}%`;
  if (uploadProgressFill) uploadProgressFill.style.width = `${normalized}%`;
  if (message && uploadProgressStatus) uploadProgressStatus.textContent = message;
}

function setConversionProgress(percent, message) {
  const normalized = Math.max(0, Math.min(100, Number.isFinite(percent) ? percent : 0));
  state.uploadConversionProgress = normalized;
  if (conversionProgressValue) conversionProgressValue.textContent = `${Math.round(normalized)}%`;
  if (conversionProgressFill) conversionProgressFill.style.width = `${normalized}%`;
  if (message && uploadProgressStatus) uploadProgressStatus.textContent = message;
}

function stopConversionProgress() {
  if (state.uploadConversionTimer) { window.clearInterval(state.uploadConversionTimer); state.uploadConversionTimer = null; }
}

function startConversionProgress() {
  stopConversionProgress();
  state.uploadConversionProgress = 12;
  if (conversionProgressGroup) conversionProgressGroup.hidden = false;
  setConversionProgress(state.uploadConversionProgress, 'Converting uploaded BMS to MIS...');
  state.uploadConversionTimer = window.setInterval(() => {
    const next = Math.min(94, state.uploadConversionProgress + (Math.random() * 9 + 2));
    setConversionProgress(next, 'Converting uploaded BMS to MIS...');
  }, 280);
}

function resetUploadProgressModal(fileName) {
  stopConversionProgress();
  if (conversionProgressGroup) conversionProgressGroup.hidden = true;
  state.uploadConversionProgress = 0;
  if (conversionProgressValue) conversionProgressValue.textContent = '0%';
  if (conversionProgressFill) conversionProgressFill.style.width = '0%';
  if (uploadProgressCloseBtn) uploadProgressCloseBtn.textContent = 'Cancel';
  setUploadProgress(0, `Preparing upload for ${fileName || 'map'}...`);
}

// ----- Auth form handlers -----

async function postAuthJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({ success: false, error: 'Invalid server response' }));
  if (!response.ok || !result?.success) throw new Error(result?.error || `Request failed (${response.status})`);
  return result;
}

async function handleLogout() {
  try {
    if (logoutBtn) logoutBtn.disabled = true;
    await postAuthJson('modules/auth/logout.php', {});
  } catch (_) {}
  finally {
    state.authUser = null;
    updateAuthHeader();
    closeAuthModal();
    statusEl.textContent = 'Signed out.';
    if (logoutBtn) logoutBtn.disabled = false;
    await refreshUploadedMapList();
  }
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  const email = String(loginEmail?.value || '').trim();
  const password = String(loginPassword?.value || '');
  if (!email || !password) { setAuthMessage('Email and password are required.', 'error'); return; }
  try {
    if (loginSubmitBtn) loginSubmitBtn.disabled = true;
    setAuthMessage('Signing in...', 'info');
    const result = await postAuthJson('modules/auth/login.php', { email, password });
    state.authUser = result.user || null;
    await syncAuthSession();
    statusEl.textContent = `Signed in as ${(result.user && (result.user.display_name || result.user.email)) || email}.`;
    closeAuthModal();
    loginForm.reset();
  } catch (error) {
    setAuthMessage(error?.message || 'Login failed.', 'error');
  } finally {
    if (loginSubmitBtn) loginSubmitBtn.disabled = false;
  }
}

async function handleRegisterSubmit(event) {
  event.preventDefault();
  const display_name = String(registerDisplayName?.value || '').trim();
  const email = String(registerEmail?.value || '').trim();
  const password = String(registerPassword?.value || '');
  const passwordConfirm = String(registerPasswordConfirm?.value || '');
  if (!email || !password) { setAuthMessage('Email and password are required.', 'error'); return; }
  if (password !== passwordConfirm) { setAuthMessage('Passwords do not match.', 'error'); return; }
  try {
    if (registerSubmitBtn) registerSubmitBtn.disabled = true;
    setAuthMessage('Creating account...', 'info');
    const result = await postAuthJson('modules/auth/register.php', { display_name, email, password });
    state.authUser = result.user || null;
    await syncAuthSession();
    statusEl.textContent = `Registered as ${(result.user && (result.user.display_name || result.user.email)) || email}.`;
    closeAuthModal();
    registerForm.reset();
  } catch (error) {
    setAuthMessage(error?.message || 'Registration failed.', 'error');
  } finally {
    if (registerSubmitBtn) registerSubmitBtn.disabled = false;
  }
}

// ----- Upload map flow -----

async function uploadMapFile(file) {
  if (!file) return;
  if (!state.authUser) {
    const ok = await syncAuthSession();
    if (!ok) {
      setUploadMapMessage('Sign in before uploading a map.', 'error');
      openAuthModal('login');
      return;
    }
  }
  const formData = new FormData();
  formData.append('map_file', file, file.name || 'map.mis');
  const isBms = /\.bms$/i.test(String(file.name || ''));
  statusEl.textContent = `Uploading ${file.name || 'map'}...`;
  resetUploadProgressModal(file.name || 'map');
  setUploadModalOpen(true);
  try {
    const result = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      state.uploadRequest = xhr;
      xhr.open('POST', 'modules/maps/upload.php', true);
      xhr.withCredentials = true;
      xhr.upload.addEventListener('progress', (ev) => {
        if (!ev.lengthComputable) return;
        setUploadProgress((ev.loaded / ev.total) * 100, `Uploading ${file.name || 'map'}...`);
      });
      xhr.upload.addEventListener('load', () => {
        setUploadProgress(100, isBms ? 'Upload complete. Starting conversion...' : 'Upload complete. Finalizing...');
        if (isBms) startConversionProgress();
      });
      xhr.addEventListener('error', () => reject(new Error('Map upload failed.')));
      xhr.addEventListener('abort', () => reject(new Error('Map upload cancelled.')));
      xhr.addEventListener('load', () => {
        let parsed;
        try { parsed = JSON.parse(xhr.responseText || 'null') || { success: false, error: 'Invalid server response' }; }
        catch (_) { parsed = { success: false, error: 'Invalid server response' }; }
        if (xhr.status === 401) { reject(new Error(parsed?.error || 'Authentication required')); return; }
        if (xhr.status < 200 || xhr.status >= 300 || !parsed?.success) { reject(new Error(parsed?.error || `Upload failed (${xhr.status})`)); return; }
        resolve(parsed);
      });
      xhr.send(formData);
    });
    const storedPath = String((result.upload && (result.upload.stored_path || result.upload.path)) || '');
    const storedFilename = String((result.upload && (result.upload.stored_filename || (isBms ? String(file.name || '').replace(/\.bms$/i, '.mis') : file.name))) || 'uploaded.mis');
    const displayFilename = storedFilename.replace(/\.bms$/i, '.mis');
    if (isBms) { stopConversionProgress(); setConversionProgress(100, `Conversion finished. Loading map...`); }
    if (!storedPath) {
      statusEl.textContent = `${storedFilename} uploaded.`;
      if (uploadProgressCloseBtn) uploadProgressCloseBtn.textContent = 'Close';
      window.setTimeout(closeUploadProgressModal, 500);
      return;
    }
    const uploadedResponse = await fetch(encodeURI(storedPath), { credentials: 'same-origin' });
    if (!uploadedResponse.ok) {
      statusEl.textContent = `${storedFilename} uploaded to ${storedPath}.`;
      if (uploadProgressCloseBtn) uploadProgressCloseBtn.textContent = 'Close';
      window.setTimeout(closeUploadProgressModal, 500);
      return;
    }
    const uploadedBlob = await uploadedResponse.blob();
    const uploadedFile = new File([uploadedBlob], displayFilename, { type: uploadedBlob.type || 'text/plain' });
    await loadMisFile(uploadedFile);
    await refreshUploadedMapList();
    if (uploadProgressStatus) uploadProgressStatus.textContent = `${displayFilename} uploaded and loaded.`;
    statusEl.textContent = `${displayFilename} uploaded and loaded.`;
    if (uploadProgressCloseBtn) uploadProgressCloseBtn.textContent = 'Close';
    window.setTimeout(closeUploadProgressModal, 650);
  } catch (error) {
    stopConversionProgress();
    const message = error?.message || 'Map upload failed.';
    if (uploadProgressStatus) uploadProgressStatus.textContent = message;
    statusEl.textContent = message;
    if (/Authentication required/i.test(message)) {
      await syncAuthSession();
      setAuthMessage('Your session expired. Sign in again to upload maps.', 'error');
      openAuthModal('login');
    }
    if (uploadProgressCloseBtn) uploadProgressCloseBtn.textContent = 'Close';
  } finally {
    state.uploadRequest = null;
    state.uploadSelectedFile = null;
    if (uploadMapInput) uploadMapInput.value = '';
    updateUploadSelectionUi();
  }
}

// ----- Event listeners -----

uploadProgressCloseBtn?.addEventListener('click', () => {
  if (state.uploadRequest) { state.uploadRequest.abort(); state.uploadRequest = null; }
  closeUploadProgressModal();
});
openUploadMapBtn?.addEventListener('click', () => {
  if (!state.authUser) { openAuthModal('login'); return; }
  openUploadSelectionModal();
});
openLoginBtn?.addEventListener('click', () => openAuthModal('login'));
openRegisterBtn?.addEventListener('click', () => openAuthModal('register'));
logoutBtn?.addEventListener('click', handleLogout);
switchToRegisterBtn?.addEventListener('click', () => openAuthModal('register'));
switchToLoginBtn?.addEventListener('click', () => openAuthModal('login'));
loginCloseBtn?.addEventListener('click', closeAuthModal);
registerCloseBtn?.addEventListener('click', closeAuthModal);
uploadMapCloseBtn?.addEventListener('click', closeUploadSelectionModal);
uploadMapCancelBtn?.addEventListener('click', closeUploadSelectionModal);
exportBmsCloseBtn?.addEventListener('click', closeExportBmsModal);
exportBmsCancelBtn?.addEventListener('click', closeExportBmsModal);
exportBmsDownloadBtn?.addEventListener('click', handleExportBmsDownload);
uploadMapChooseBtn?.addEventListener('click', () => uploadMapInput?.click());
uploadMapSubmitBtn?.addEventListener('click', async () => {
  const file = state.uploadSelectedFile;
  if (!file) { setUploadMapMessage('Choose a .mis or .bms file before uploading.', 'error'); return; }
  closeUploadSelectionModal();
  await uploadMapFile(file);
});
loginOverlay?.addEventListener('mousedown', (e) => { if (e.target === loginOverlay) closeAuthModal(); });
registerOverlay?.addEventListener('mousedown', (e) => { if (e.target === registerOverlay) closeAuthModal(); });
uploadMapOverlay?.addEventListener('mousedown', (e) => { if (e.target === uploadMapOverlay) closeUploadSelectionModal(); });
exportBmsOverlay?.addEventListener('mousedown', (e) => { if (e.target === exportBmsOverlay) closeExportBmsModal(); });
loginForm?.addEventListener('submit', handleLoginSubmit);
registerForm?.addEventListener('submit', handleRegisterSubmit);
uploadMapInput?.addEventListener('change', async (event) => {
  const file = (event.target.files && event.target.files[0]) || null;
  state.uploadSelectedFile = file;
  if (!file) { setUploadMapMessage('Choose a .mis or .bms file to upload.', 'info'); updateUploadSelectionUi(); return; }
  if (!/\.(mis|bms)$/i.test(String(file.name || ''))) {
    state.uploadSelectedFile = null;
    if (uploadMapInput) uploadMapInput.value = '';
    setUploadMapMessage('Only .mis and .bms files are supported.', 'error');
    updateUploadSelectionUi();
    return;
  }
  setUploadMapMessage(`Ready to upload ${file.name}.`, 'info');
  updateUploadSelectionUi();
});
uploadedMapSelect?.addEventListener('change', loadSelectedUploadedMap);
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (state.authModalOpen) { closeAuthModal(); return; }
  if (state.exportModalOpen) { closeExportBmsModal(); return; }
  // uploadModalOpen covers both selection and progress — only close selection here
  if (state.uploadModalOpen && uploadMapOverlay?.classList.contains('open')) { closeUploadSelectionModal(); return; }
});

// ----- Patch menu handlers to use server endpoints -----

if (typeof menuHandlers !== 'undefined') {
  // Override Save As to also attempt server save
  const _origSaveAs = menuHandlers['file.saveAs'];
  menuHandlers['file.saveAs'] = async () => {
    if (state.authUser) {
      return serverSaveCurrentMap({ forcePicker: true });
    }
    return _origSaveAs && _origSaveAs();
  };

  menuHandlers['file.exportBinaryMission'] = async () => {
    try { await exportCurrentMapAsBinary(); }
    catch (err) { addLog(`ERROR exporting binary mission: ${err?.message || 'unknown'}`); statusEl.textContent = 'Export failed (see Logs).'; }
  };

  menuHandlers['file.saveAndExport'] = async () => {
    try { await exportCurrentMapAsBinary({ saveFirst: true }); }
    catch (err) { addLog(`ERROR in save-and-export: ${err?.message || 'unknown'}`); statusEl.textContent = 'Save and export failed (see Logs).'; }
  };

  menuHandlers['file.saveAndExportWithStats'] = menuHandlers['file.saveAndExport'];
}

// ----- Init -----
updateAuthHeader();
syncAuthSession();
