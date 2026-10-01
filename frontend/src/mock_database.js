import weldingProducts from './welding_products.json';

// Master in-memory product database (initialized with bundled fallback)
export const mockDatabase = [...weldingProducts];

let liveFetchPromise = null;

/**
 * Fetch latest products catalog from server and synchronize in-memory database
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
      // 1. Attempt to fetch fresh JSON from API endpoint
      const timestamp = Date.now();
      const res = await fetch(`/api/data/welding_products.json?v=${timestamp}`, {
        cache: 'no-store',
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        const liveData = await res.json();
        if (Array.isArray(liveData) && liveData.length > 0) {
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
      // Silently fall back to bundled dataset on offline / dev preview
    }
    return mockDatabase;
  })();

  return liveFetchPromise;
}

// Automatically initiate background sync in browser environment (SWR pattern)
if (typeof window !== 'undefined') {
  window.__udoLiveCatalog = mockDatabase;
  fetchLiveDatabase();
}
