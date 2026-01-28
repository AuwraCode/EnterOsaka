# Konfiguracja zmiennych środowiskowych na Vercel

## Problem: "Database connection not available"

Ten błąd oznacza, że zmienne środowiskowe Supabase nie są ustawione na Vercel.

## Rozwiązanie krok po kroku:

### Krok 1: Znajdź swoje klucze Supabase

1. Przejdź do [supabase.com](https://supabase.com) i zaloguj się
2. Wybierz swój projekt (lub utwórz nowy jeśli nie masz)
3. Przejdź do **Settings** (⚙️) → **API**
4. Skopiuj następujące wartości:
   - **Project URL** - to będzie wartość dla `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key - to będzie wartość dla `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Krok 2: Dodaj zmienne na Vercel

1. Przejdź do [vercel.com](https://vercel.com) i zaloguj się
2. Kliknij na swój projekt **EnterOsaka**
3. Przejdź do **Settings** (⚙️) w górnym menu
4. Kliknij **Environment Variables** w lewym menu
5. Dodaj następujące zmienne:

#### Wymagane zmienne:

**NEXT_PUBLIC_SUPABASE_URL**
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Twój Supabase Project URL (np. `https://xxxxx.supabase.co`)
- **Environment**: Wybierz wszystkie (Production, Preview, Development)

**NEXT_PUBLIC_SUPABASE_ANON_KEY**
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Twój Supabase anon key (długi klucz zaczynający się od `eyJ...`)
- **Environment**: Wybierz wszystkie (Production, Preview, Development)

#### Opcjonalne zmienne (dla customizacji):

**NEXT_PUBLIC_ACCESS_CODE**
- **Key**: `NEXT_PUBLIC_ACCESS_CODE`
- **Value**: Kod dostępu do aplikacji (domyślnie: `bet5000`)
- **Environment**: Wybierz wszystkie

**NEXT_PUBLIC_ADMIN_CODE**
- **Key**: `NEXT_PUBLIC_ADMIN_CODE`
- **Value**: Kod dostępu do panelu admina (domyślnie: `admin123`)
- **Environment**: Wybierz wszystkie

### Krok 3: Zapisz i redeploy

1. Kliknij **Save** dla każdej zmiennej
2. Przejdź do zakładki **Deployments**
3. Kliknij na trzy kropki (⋯) przy najnowszym deployment
4. Wybierz **Redeploy**
5. Potwierdź redeploy

Alternatywnie, możesz:
- Zrobić pusty commit i push do GitHub (Vercel automatycznie zbuduje ponownie)
- Lub kliknąć **Redeploy** w ustawieniach projektu

### Krok 4: Weryfikacja

Po redeploy:

1. Odśwież stronę aplikacji
2. Wpisz kod dostępu
3. Sprawdź czy dashboard się ładuje
4. Sprawdź konsolę przeglądarki (F12) - nie powinno być błędów o brakujących zmiennych

## Sprawdzanie czy zmienne są ustawione:

### Metoda 1: Przez Vercel Dashboard
1. Settings → Environment Variables
2. Sprawdź czy widzisz obie zmienne: `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Metoda 2: Przez logi builda
1. Przejdź do Deployments
2. Kliknij na deployment
3. Sprawdź Build Logs - jeśli zmienne nie są ustawione, zobaczysz błędy

### Metoda 3: Przez aplikację
- Jeśli widzisz błąd "Database connection not available", zmienne nie są ustawione lub są nieprawidłowe

## Częste problemy:

### Problem: "Zmienne są ustawione, ale nadal nie działa"
**Rozwiązanie:**
- Upewnij się, że zmienne są ustawione dla **wszystkich środowisk** (Production, Preview, Development)
- Zrób redeploy po dodaniu zmiennych
- Sprawdź czy wartości są poprawne (bez dodatkowych spacji, pełne URL-e)

### Problem: "Nie wiem gdzie znaleźć klucze Supabase"
**Rozwiązanie:**
1. Zaloguj się na supabase.com
2. Wybierz projekt
3. Settings → API
4. Skopiuj **Project URL** i **anon public** key

### Problem: "Redeploy nie pomaga"
**Rozwiązanie:**
- Sprawdź czy zmienne są zapisane (kliknij Save)
- Sprawdź czy wybrałeś wszystkie środowiska (Production, Preview, Development)
- Spróbuj usunąć i dodać zmienne ponownie
- Sprawdź logi builda czy nie ma innych błędów

## Wzór wartości:

### NEXT_PUBLIC_SUPABASE_URL
```
https://xxxxxxxxxxxxx.supabase.co
```

### NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQxMjM0NTY3LCJleHAiOjE5NTY4MTA1Njd9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ WAŻNE**: 
- Nie dodawaj cudzysłowów wokół wartości
- Nie dodawaj spacji na początku lub końcu
- Skopiuj dokładnie wartości z Supabase (bez dodatkowych znaków)

## Kontakt

Jeśli nadal masz problemy:
1. Sprawdź logi builda na Vercel
2. Sprawdź konsolę przeglądarki (F12)
3. Upewnij się, że tabela `transactions` istnieje w Supabase
