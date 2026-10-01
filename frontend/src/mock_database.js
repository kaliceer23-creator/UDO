// src/mock_database.js
// Master in-memory product database (populated live from MariaDB 10.6.13)
export const mockDatabase = [];

let liveFetchPromise = null;
let syncChannel = null;

// Initialize cross-tab broadcast synchronization channel
if (typeof window !== 'undefined' && typeof window.BroadcastChannel === 'function') {
  try {
    syncChannel = new BroadcastChannel('udo_catalog_sync');
    syncChannel.onmessage = (event) => {
      if (event.data && event.data.type === 'catalog_updated') {
        fetchLiveDatabase(true);
      }
    };
  } catch (err) {
    console.warn('BroadcastChannel initialization notice:', err.message);
  }
}

/**
 * Broadcast catalog updated event to other open tabs
 */
export function broadcastCatalogUpdated() {
  if (syncChannel) {
    try {
      syncChannel.postMessage({
        type: 'catalog_updated',
        timestamp: Date.now()
      });
    } catch (err) {
      console.warn('Broadcast message notice:', err.message);
    }
  }
}

/**
 * Fetch latest products catalog from MariaDB API endpoint and synchronize in-memory database
 * @param {boolean} force - Force cache bypass and re-evaluate request
 */
export async function fetchLiveDatabase(force = false) {
  if (typeof window === 'undefined' || !window.fetch) {
    return mockDatabase;
  }
  if (!force && liveFetchPromise) {
    return liveFetchPromise;
  }

  liveFetchPromise = (async () => {
    try {
      const url = force ? `/api/products.php?t=${Date.now()}` : '/api/products.php';
      const res = await fetch(url, {
        cache: 'no-cache',
        headers: { 'Accept': 'application/json' }
      });

      if (res.status === 304) {
        // Data unchanged on server, existing in-memory database remains valid
        return mockDatabase;
      }

      if (res.ok) {
        const liveData = await res.json();
        if (Array.isArray(liveData)) {
          // Mutate existing array in-place so all imported references remain valid
          mockDatabase.splice(0, mockDatabase.length, ...liveData);
          window.__udoLiveCatalog = mockDatabase;

          // Dispatch event so active storefront views re-render smoothly
          window.dispatchEvent(new CustomEvent('udo:catalog_updated', {
            detail: { products: mockDatabase, count: mockDatabase.length }
          }));
          return mockDatabase;
        }
      }
    } catch (err) {
      console.warn('Live catalog fetch notice:', err.message);
    } finally {
      if (force) {
        liveFetchPromise = null;
      }
    }
    return mockDatabase;
  })();

  return liveFetchPromise;
}

// Automatically initiate background sync in browser environment
if (typeof window !== 'undefined') {
  window.__udoLiveCatalog = mockDatabase;
  fetchLiveDatabase();
}
