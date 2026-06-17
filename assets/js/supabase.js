/* ============================================================
   Supabase-Anbindung (GF-Dashboard)
   Der anon/publishable Key ist bewusst öffentlich – Schreibzugriff
   ist über Row Level Security (RLS) abgesichert. KEIN Service-Role-Key!
   ============================================================ */

const KK_SUPABASE_URL  = 'https://usstijzdensmlyanlwxr.supabase.co';
const KK_SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzc3RpanpkZW5zbWx5YW5sd3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3OTk1NjcsImV4cCI6MjA4MDM3NTU2N30.OGA9Mqr1Y_KB5AOFe9yfSd9ZvqwKBNhofFNtzGe1NoY';

/* Kunde dieses Dashboards (customer_id der komkom_*-Tabellen) */
const KK_CUSTOMER_ID = 'adfe5b1a-742c-4120-9e74-6b97e94f8a5d';

/* Globaler Client (sb). Fällt auf null zurück, falls die CDN-Lib fehlt
   (z. B. offline) – die App nutzt dann lokale Demo-Daten. */
const sb = (window.supabase && window.supabase.createClient)
  ? window.supabase.createClient(KK_SUPABASE_URL, KK_SUPABASE_ANON)
  : null;
