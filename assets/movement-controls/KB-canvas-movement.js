function hasTypingFocus(){
	const el = document.activeElement;
	if (!el || el === cv || el === document.body) return false;
	if (el.isContentEditable) return true;
	const tag = el.tagName;
	if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
	if (tag === 'INPUT'){
		const type = (el.getAttribute('type') || 'text').toLowerCase();
		return type !== 'checkbox' && type !== 'radio' && type !== 'button' && type !== 'submit' && type !== 'reset' && type !== 'range' && type !== 'color' && type !== 'file';
	}
	return false;
}

addEventListener('keydown', (e) => {
	if (hasTypingFocus()) return;
	const k = e.key.toLowerCase();
	const lookActive = (document.pointerLockElement === cv && state.cameraLookActive);
	if (k === 'arrowup' || k === 'arrowdown' || k === 'arrowleft' || k === 'arrowright'){
		e.preventDefault();
	}
	if (k === 'delete'){
		e.preventDefault();
		deleteSelectedItem();
		return;
	}
	if (k === 't'){
		topViewLocked = !topViewLocked;
		if (topViewLocked){
			topViewRestore = { yaw: cam.yaw, pitch: cam.pitch };
			cam.pitch = -Math.PI / 2;
		} else {
			cam.yaw = topViewRestore.yaw;
			cam.pitch = topViewRestore.pitch;
		}
	}
	if (k === 'g') gridVisible = !gridVisible;
	if (k === 'i' && showStatsEl){
		showStatsEl.checked = !showStatsEl.checked;
		syncRenderUiState();
	}
	if (k === 'h' && showAnchorPointsEl){
		showAnchorPointsEl.checked = !showAnchorPointsEl.checked;
		syncRenderUiState();
	}
	if (k === 'f') setGlbWireframeEnabled(!state.glb.wireframeEnabled);
	if (k === 'w' && !lookActive){
		state.transformMode = 'translate';
		updateItemGizmo();
	}
	if (k === 'e' && !lookActive){
		state.transformMode = 'rotate';
		updateItemGizmo();
	}
	if (k === 'w' && lookActive) move.w = 1;
	if (k === 'a') move.a = 1;
	if (k === 's') move.s = 1;
	if (k === 'd') move.d = 1;
	if (k === 'arrowup') move.w = 1;
	if (k === 'arrowleft') move.a = 1;
	if (k === 'arrowdown') move.s = 1;
	if (k === 'arrowright') move.d = 1;
	if (k === 'q') move.q = 1;
	if (k === 'e' && lookActive) move.e = 1;
	if (k === 'r') setRenderMode(renderMode === 'C' ? 'H' : (renderMode === 'H' ? 'D' : 'C'));
	state.keysDown.add(e.code);
});

addEventListener('keyup', (e) => {
	if (hasTypingFocus()) return;
	const k = e.key.toLowerCase();
	if (k === 'w') move.w = 0;
	if (k === 'a') move.a = 0;
	if (k === 's') move.s = 0;
	if (k === 'd') move.d = 0;
	if (k === 'arrowup') move.w = 0;
	if (k === 'arrowleft') move.a = 0;
	if (k === 'arrowdown') move.s = 0;
	if (k === 'arrowright') move.d = 0;
	if (k === 'q') move.q = 0;
	if (k === 'e') move.e = 0;
	state.keysDown.delete(e.code);
});
