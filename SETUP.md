# Instrukcja konfiguracji BetScale Tracker

## Krok 1: Instalacja zależności

```bash
npm install
```

## Krok 2: Konfiguracja Supabase

### 2.1. Utwórz projekt Supabase

1. Przejdź na [supabase.com](https://supabase.com)
2. Zaloguj się lub utwórz konto
3. Kliknij "New Project"
4. Wypełnij formularz:
   - **Name**: BetScale Tracker (lub dowolna nazwa)
   - **Database Password**: Wygeneruj silne hasło (zapisz je!)
   - **Region**: Wybierz najbliższy region (np. West Europe)
5. Kliknij "Create new project" i poczekaj na utworzenie (około 2 minut)

### 2.2. Pobierz klucze API

1. W panelu Supabase przejdź do **Settings** → **API**
2. Skopiuj:
   - **Project URL** (np. `https://xxxxx.supabase.co`)
   - **anon/public key** (długi klucz zaczynający się od `eyJ...`)

### 2.3. Utwórz plik .env.local

W głównym katalogu projektu utwórz plik `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj_anon_key_tutaj
```

**⚠️ WAŻNE**: Nie commituj pliku `.env.local` do repozytorium!

## Krok 3: Utwórz tabelę w bazie danych

1. W panelu Supabase przejdź do **SQL Editor**
2. Kliknij "New query"
3. Skopiuj i wklej całą zawartość pliku `supabase/migrations/001_initial_schema.sql`
4. Kliknij "Run" (lub naciśnij Ctrl+Enter)
5. Powinieneś zobaczyć komunikat o sukcesie

### Weryfikacja tabeli

1. Przejdź do **Table Editor** w panelu Supabase
2. Powinieneś zobaczyć tabelę `transactions`
3. Sprawdź, czy kolumny są poprawne:
   - `id` (uuid)
   - `player` (varchar)
   - `amount` (numeric)
   - `description` (varchar)
   - `transaction_date` (date)
   - `created_at` (timestamp)

## Krok 4: Gotowe!

Aplikacja nie wymaga konfiguracji autoryzacji - działa bez logowania. Wszystkie transakcje są publiczne i widoczne dla wszystkich użytkowników.

## Krok 5: Uruchom aplikację

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: [http://localhost:3000](http://localhost:3000)

## Krok 5: Testowanie

1. Otwórz [http://localhost:3000](http://localhost:3000)
2. Powinieneś zobaczyć dashboard od razu
3. Dodaj pierwszą transakcję!

## Rozwiązywanie problemów

### Błąd: "Invalid API key"
- Sprawdź, czy skopiowałeś poprawny klucz z panelu Supabase
- Upewnij się, że plik `.env.local` jest w głównym katalogu projektu
- Zrestartuj serwer deweloperski (`npm run dev`)

### Błąd: "relation 'transactions' does not exist"
- Upewnij się, że wykonałeś migrację SQL w SQL Editor
- Sprawdź w Table Editor, czy tabela `transactions` istnieje

### Aplikacja nie ładuje się
- Sprawdź konsolę przeglądarki (F12) pod kątem błędów
- Sprawdź terminal, czy nie ma błędów kompilacji
- Upewnij się, że wszystkie zależności są zainstalowane (`npm install`)

## Produkcja

Gdy będziesz gotowy do wdrożenia:

1. **Vercel** (zalecane dla Next.js):
   - Połącz repozytorium z Vercel
   - Dodaj zmienne środowiskowe (`NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY`) w ustawieniach projektu
   - Wdróż!

2. **Inne platformy**:
   - Dodaj zmienne środowiskowe w ustawieniach hostingu
   - Uruchom `npm run build`
   - Wdróż folder `.next`

Pamiętaj, aby dodać zmienne środowiskowe również w ustawieniach hostingu!
