(function(){
  function stopDrag(){
    const had = state.boxSelecting && state.boxStart && state.boxCurrent;
    const shouldFinalizeClick = !!state.pendingLeftClick && !state.cameraLookActive && !state.gizmoDrag && !state.draggingItem && !had;
    const x0 = had ? Math.min(state.boxStart.sx, state.boxCurrent.sx) : 0;
    const x1 = had ? Math.max(state.boxStart.sx, state.boxCurrent.sx) : 0;
    const y0 = had ? Math.min(state.boxStart.sy, state.boxCurrent.sy) : 0;
    const y1 = had ? Math.max(state.boxStart.sy, state.boxCurrent.sy) : 0;
    const add = state.boxSelectAdditive;
    state.draggingItem = false;
    state.boxSelecting = false;
    state.boxSelectAdditive = false;
    state.boxStart = null;
    state.boxCurrent = null;
    state.lastMouse = null;
    state.dragAnchor = null;
    state.cameraLookActive = false;
    state.cameraLookPending = false;
    state.cameraLookStart = null;
    state.cameraLookButton = 0;
    state.cameraPanActive = false;
    state.cameraPanLastSx = 0;
    state.cameraPanLastSy = 0;
    if (document.pointerLockElement === cv && document.exitPointerLock) document.exitPointerLock();
    if (shouldFinalizeClick){
      const pickedId = state.pendingLeftClick.pickedId;
      selectById(pickedId != null ? pickedId : null);
    }
    state.pendingLeftClick = null;
    if (!had) return;

    const worldA = screenToWorld(x0, y0, 0);
    const worldB = screenToWorld(x1, y1, 0);
    const minX = Math.min(worldA.x, worldB.x);
    const maxX = Math.max(worldA.x, worldB.x);
    const minY = Math.min(worldA.y, worldB.y);
    const maxY = Math.max(worldA.y, worldB.y);
    const candidates = getSpatialCandidatesByWorldRect(minX, minY, maxX, maxY);
    const filteredSet = new Set(getFilteredItems().map((it) => it.id));
    const ids = [];
    for (const it of candidates){
      if (!filteredSet.has(it.id)) continue;
      const p = worldToScreen(rawToWorld(it.x, 'x'), rawToWorld(it.y, 'y'), getItemWorldZ(it));
      if (p.visible && p.sx >= x0 && p.sx <= x1 && p.sy >= y0 && p.sy <= y1) ids.push(it.id);
    }
    if (!add) state.multiSelectedIds.clear();
    for (const id of ids) state.multiSelectedIds.add(id);
    state.selectedId = state.multiSelectedIds.size ? Array.from(state.multiSelectedIds).at(-1) : null;
    renderList();
    refreshLiveMisWindow(false, { force: true });
  }

  cv.addEventListener('click', () => { if (!hasTypingFocus()) cv.focus(); });

  addEventListener('mousemove', (e) => {
    if (document.pointerLockElement !== cv) return;
    if (topViewLocked) return;
    if (!state.cameraLookActive) return;
    if (state.modalOpen || state.draggingItem || state.boxSelecting || state.gizmoDrag || state.pastePlacementActive) return;
    cam.yaw += e.movementX * 0.002;
    cam.pitch -= e.movementY * 0.002;
    cam.pitch = Math.max(-1.55, Math.min(1.55, cam.pitch));
  });

  cv.addEventListener('mousedown', (e) => {
    if (state.modalOpen) return;
    closeItemContextMenu();
    const rect = cv.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    if (e.button !== 0 && e.button !== 2) return;

    state.cameraLookActive = false;
    state.cameraLookPending = false;
    state.cameraLookStart = null;
    state.cameraLookButton = 0;
    if (e.button === 0) state.pendingLeftClick = null;

    if (e.button === 2){
      e.preventDefault();
      state.cameraLookPending = true;
      state.cameraLookButton = 2;
      state.cameraLookStart = { sx, sy };
      state.lastMouse = { sx, sy };
      return;
    }

    if (!state.pastePlacementActive){
      const gizmoMode = pickGizmoModeAt(e.clientX, e.clientY);
      if (gizmoMode && state.selectedId != null){
        const dragItemIds = state.multiSelectedIds.size ? Array.from(state.multiSelectedIds) : [state.selectedId];
        state.gizmoDrag = { mode: gizmoMode, lastX: e.clientX, lastY: e.clientY, itemId: state.selectedId, itemIds: dragItemIds };
        state.lastMouse = { sx, sy };
        return;
      }
    }

    if (state.pastePlacementActive){
      applyPasteAtWorld(screenToWorld(sx, sy, state.pastePreviewWorld?.z || 0));
      state.lastMouse = { sx, sy };
      return;
    }

    const picked = pickItemAtCanvas(sx, sy);
    state.draggingItem = false;
    state.boxSelecting = false;
    state.boxSelectAdditive = false;
    const additiveSelection = !!(e.shiftKey && picked && state.selectedId != null && picked.id !== state.selectedId && state.multiSelectedIds.has(state.selectedId));
    selectById(picked ? picked.id : null, { additive: additiveSelection });
    if (!picked) {
      state.cameraPanActive = true;
      state.cameraPanLastSx = sx;
      state.cameraPanLastSy = sy;
    }
    state.lastMouse = { sx, sy };
  });

  cv.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (state.cameraLookActive || (state.cameraLookPending && state.cameraLookButton === 2)) return;
    const rect = cv.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const picked = pickItemAtCanvas(sx, sy);
    if (picked){
      if (!(picked.id === state.selectedId || state.multiSelectedIds.has(picked.id))) selectById(picked.id);
      showItemContextMenu(e.clientX, e.clientY);
      return;
    }
    if (state.selectedId !== null || state.multiSelectedIds.size > 0 || state.itemClipboardItems.length) showItemContextMenu(e.clientX, e.clientY);
  });

  cv.addEventListener('dblclick', (e) => {
    const rect = cv.getBoundingClientRect();
    const picked = pickItemAtCanvas(e.clientX - rect.left, e.clientY - rect.top);
    if (!picked) return;
    selectById(picked.id);
    openModal();
  });

  cv.addEventListener('mousemove', (e) => {
    if (state.modalOpen) return;
    const rect = cv.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;

    if (state.cameraLookPending){
      const mask = state.cameraLookButton === 2 ? 2 : 1;
      if (e.buttons & mask){
        const start = state.cameraLookStart || { sx, sy };
        const moved = Math.hypot(sx - start.sx, sy - start.sy);
        if (moved > 3){
          state.cameraLookPending = false;
          if (state.cameraLookButton === 1) state.pendingLeftClick = null;
          state.cameraLookActive = true;
          if (document.pointerLockElement !== cv && cv.requestPointerLock) cv.requestPointerLock();
        }
      } else if (!state.cameraLookActive){
        state.cameraLookPending = false;
        state.cameraLookButton = 0;
      }
    }

    if (state.pastePlacementActive){
      const z = state.selectedId ? rawToWorld(getSelected()?.z || 0, 'z') : 0;
      state.pastePreviewWorld = screenToWorld(sx, sy, z);
    }

    if (state.boxSelecting && state.boxStart){
      state.boxCurrent = { sx, sy };
    } else if (state.cameraPanActive && (e.buttons & 1) && !state.draggingItem && !state.gizmoDrag && !state.cameraLookActive){
      const nowW = screenToWorld(sx, sy, 0);
      const prevW = screenToWorld(state.cameraPanLastSx, state.cameraPanLastSy, 0);
      if (nowW && prevW) {
        cam.pos.x -= (nowW.x - prevW.x);
        cam.pos.y -= (nowW.y - prevW.y);
        requestRender();
      }
      state.cameraPanLastSx = sx;
      state.cameraPanLastSy = sy;
    } else if (state.draggingItem && state.selectedId){
      const active = state.items.filter((it) => it.id === state.selectedId || state.multiSelectedIds.has(it.id));
      const zPlane = rawToWorld((active[0]?.z) || 0, 'z');
      const nowW = screenToWorld(sx, sy, zPlane);
      const prevW = state.dragAnchor || nowW;
      const dx = nowW.x - prevW.x;
      const dy = nowW.y - prevW.y;
      for (const it of active){
        if (!kvHas(it, 'position')) continue;
        it.x = worldToRaw(rawToWorld(it.x, 'x') + dx, 'x');
        it.y = worldToRaw(rawToWorld(it.y, 'y') + dy, 'y');
        it.kv.position = `${it.x} ${it.y} ${it.z}`;
        markItemTransformDirty(it.id);
      }
      markItemsChanged({ structure: false });
      state.dragAnchor = nowW;
      scheduleRenderList();
      scheduleLiveMisRefresh();
    }

    state.lastMouse = { sx, sy };
  });

  cv.addEventListener('mouseup', stopDrag);
  cv.addEventListener('mouseleave', () => {
    state.cameraLookActive = false;
    stopDrag();
  });
  cv.addEventListener('wheel', (e) => {
    e.preventDefault();
    applyCanvasWheelZoom(e.deltaY);
  }, { passive: false });

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement === cv) return;
    state.cameraLookActive = false;
    state.cameraLookPending = false;
    state.cameraLookStart = null;
    state.cameraLookButton = 0;
    move.w = 0;
    move.a = 0;
    move.s = 0;
    move.d = 0;
    move.q = 0;
    move.e = 0;
  });
})();