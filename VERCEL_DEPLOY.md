# Deployment na Vercel

## Krok 1: Przygotowanie projektu

Projekt jest już gotowy do deploymentu na Vercel. Wszystkie pliki konfiguracyjne są na miejscu.

## Krok 2: Utworzenie projektu na Vercel

1. Przejdź na [vercel.com](https://vercel.com)
2. Zaloguj się (możesz użyć konta GitHub)
3. Kliknij "Add New Project"
4. Połącz swoje repozytorium GitHub `AuwraCode/EnterOsaka`
5. Vercel automatycznie wykryje, że to projekt Next.js

## Krok 3: Konfiguracja zmiennych środowiskowych

**⚠️ TO JEST NAJWAŻNIEJSZY KROK!** Bez tych zmiennych aplikacja nie będzie działać.

### Jak dodać zmienne:

1. W Vercel Dashboard przejdź do: **Settings** → **Environment Variables**
2. Kliknij **Add New**
3. Dodaj każdą zmienną osobno

### Wymagane zmienne:

**NEXT_PUBLIC_SUPABASE_URL**
- **Key**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: Twój Supabase Project URL (np. `https://xxxxx.supabase.co`)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development (zaznacz wszystkie!)

**NEXT_PUBLIC_SUPABASE_ANON_KEY**
- **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: Twój Supabase anon key (długi klucz zaczynający się od `eyJ...`)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development (zaznacz wszystkie!)

### Opcjonalne zmienne (dla customizacji):

**NEXT_PUBLIC_ACCESS_CODE**
- **Key**: `NEXT_PUBLIC_ACCESS_CODE`
- **Value**: `bet5000` (lub własny kod)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

**NEXT_PUBLIC_ADMIN_CODE**
- **Key**: `NEXT_PUBLIC_ADMIN_CODE`
- **Value**: `admin123` (lub własny kod)
- **Environment**: ✅ Production, ✅ Preview, ✅ Development

**Gdzie znaleźć wartości Supabase:**
1. Przejdź do [supabase.com](https://supabase.com)
2. Wybierz swój projekt
3. Przejdź do **Settings** → **API**
4. Skopiuj **Project URL** i **anon public** key

**📖 Szczegółowa instrukcja:** Zobacz [VERCEL_ENV_SETUP.md](./VERCEL_ENV_SETUP.md) dla pełnego przewodnika krok po kroku z obrazkami.

## Krok 4: Deployment

1. Kliknij "Deploy"
2. Vercel automatycznie:
   - Zainstaluje zależności (`npm install`)
   - Zbuduje projekt (`npm run build`)
   - Wdroży aplikację
3. Poczekaj na zakończenie builda (około 2-3 minuty)

## Krok 5: Weryfikacja

Po zakończeniu deploymentu:

1. Kliknij na link do aplikacji (np. `enter-osaka.vercel.app`)
2. Sprawdź, czy strona się ładuje
3. Przetestuj funkcjonalności:
   - Logowanie z kodem dostępu
   - Dodawanie transakcji
   - Wyświetlanie statystyk

## Rozwiązywanie problemów

### Błąd: "Environment variables missing"
- Upewnij się, że wszystkie wymagane zmienne środowiskowe są ustawione w Vercel
- Sprawdź, czy nazwy zmiennych są dokładnie takie same (case-sensitive)

### Błąd: "Build failed"
- Sprawdź logi builda w Vercel
- Upewnij się, że wszystkie zależności są w `package.json`
- Sprawdź, czy Supabase URL i klucze są poprawne

### Błąd: "Cannot connect to Supabase"
- Sprawdź, czy URL Supabase jest poprawny
- Upewnij się, że klucz anon jest poprawny
- Sprawdź, czy tabela `transactions` istnieje w bazie danych

## Aktualizacje

Po każdym push do repozytorium GitHub, Vercel automatycznie:
- Wykryje zmiany
- Zbuduje nową wersję
- Wdroży aktualizację

Możesz też ręcznie wywołać redeployment w panelu Vercel.

## Custom Domain (opcjonalnie)

1. W panelu Vercel przejdź do Settings → Domains
2. Dodaj swoją domenę
3. Skonfiguruj DNS zgodnie z instrukcjami Vercel
