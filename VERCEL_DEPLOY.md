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

W sekcji "Environment Variables" dodaj następujące zmienne:

### Wymagane zmienne:

```
NEXT_PUBLIC_SUPABASE_URL=https://twoj-projekt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj_anon_key_tutaj
```

### Opcjonalne zmienne (dla customizacji):

```
NEXT_PUBLIC_ACCESS_CODE=bet5000
NEXT_PUBLIC_ADMIN_CODE=admin123
```

**Gdzie znaleźć wartości:**
- `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY`: W panelu Supabase → Settings → API
- `NEXT_PUBLIC_ACCESS_CODE`: Kod dostępu do aplikacji (domyślnie: bet5000)
- `NEXT_PUBLIC_ADMIN_CODE`: Kod dostępu do panelu admina (domyślnie: admin123)

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
