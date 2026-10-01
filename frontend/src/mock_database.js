// src/mock_database.js
// Master in-memory product database (populated live from MariaDB 10.6.13)
export const mockDatabase = [];

let liveFetchPromise = null;

/**
 * Fetch latest products catalog from MariaDB API endpoint and synchronize in-memory database
 */
export async function fetchLiveDatabase() {
  if (typeof window === 'undefined' || !window.fetch) {
    return mockDatabase;
  }
  if (liveFetchPromise) {
    return liveFetchPromise;
  }

  liveFetchPromise = (async () => {
    try {
      const res = await fetch('/api/products.php', {
        headers: { 'Accept': 'application/json' }
      });

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
