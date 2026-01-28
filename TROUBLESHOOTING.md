# Rozwiązywanie problemów - BetScale Tracker

## Problem: "Email not confirmed" / "Email nie został potwierdzony"

### Rozwiązanie 1: Wyłącz wymaganie potwierdzenia email (ZALECANE)

Jeśli chcesz, aby użytkownicy mogli logować się od razu po rejestracji:

1. Przejdź do panelu Supabase
2. **Authentication** → **Providers** → **Email** → kliknij ikonę ustawień (⚙️)
3. **Wyłącz** opcję "Confirm email"
4. Zapisz zmiany
5. Spróbuj zalogować się ponownie

### Rozwiązanie 2: Potwierdź email

Jeśli chcesz zachować potwierdzenie email:

1. **Sprawdź skrzynkę pocztową** - Supabase wysyła email z linkiem potwierdzającym
2. **Kliknij link w emailu** - przekieruje Cię do `/auth/callback` i automatycznie zaloguje
3. Jeśli nie otrzymałeś emaila:
   - Sprawdź folder SPAM
   - Kliknij "Wyślij ponownie email potwierdzający" na stronie logowania
   - Sprawdź, czy email został wpisany poprawnie

### Rozwiązanie 3: Sprawdź konfigurację SMTP

Jeśli używasz własnego SMTP:

1. Przejdź do **Settings** → **Auth** → **SMTP Settings** w panelu Supabase
2. Upewnij się, że SMTP jest poprawnie skonfigurowane
3. Dla developmentu możesz użyć domyślnego SMTP Supabase (ale ma ograniczenia)

### Rozwiązanie 4: Sprawdź URL redirect

1. Przejdź do **Authentication** → **URL Configuration**
2. Upewnij się, że w **Redirect URLs** jest:
   - `http://localhost:3000/auth/callback` (dla developmentu)
   - `https://twoja-domena.pl/auth/callback` (dla produkcji)

## Problem: Nie mogę się zalogować po rejestracji

### Sprawdź:

1. **Czy email został potwierdzony?** - Sprawdź skrzynkę pocztową
2. **Czy hasło jest poprawne?** - Upewnij się, że nie ma literówek
3. **Czy konto istnieje?** - Sprawdź w panelu Supabase: **Authentication** → **Users**

### Rozwiązanie:

- Jeśli email nie został potwierdzony, użyj opcji "Wyślij ponownie email potwierdzający"
- Jeśli zapomniałeś hasła, możesz użyć "Reset password" (wymaga dodatkowej implementacji)

## Problem: Błąd "Invalid API key"

### Sprawdź:

1. Czy plik `.env.local` istnieje w głównym katalogu projektu?
2. Czy zmienne są poprawnie wpisane (bez cudzysłowów, bez spacji)?
3. Czy zrestartowałeś serwer deweloperski po dodaniu zmiennych?

### Rozwiązanie:

```bash
# Zatrzymaj serwer (Ctrl+C)
# Uruchom ponownie
npm run dev
```

## Problem: "relation 'transactions' does not exist"

### Rozwiązanie:

1. Przejdź do **SQL Editor** w panelu Supabase
2. Wykonaj migrację z pliku `supabase/migrations/001_initial_schema.sql`
3. Sprawdź w **Table Editor**, czy tabela `transactions` istnieje

## Problem: "new row violates row-level security policy"

### Sprawdź:

1. Czy użytkownik jest zalogowany? (`supabase.auth.getUser()`)
2. Czy polityki RLS są poprawnie skonfigurowane?

### Rozwiązanie:

1. Sprawdź w **SQL Editor**, czy wszystkie polityki z migracji zostały utworzone
2. Sprawdź w **Authentication** → **Policies**, czy polityki są aktywne

## Problem: Aplikacja nie ładuje się / błędy kompilacji

### Sprawdź:

1. Czy wszystkie zależności są zainstalowane? (`npm install`)
2. Czy są błędy w konsoli przeglądarki? (F12)
3. Czy są błędy w terminalu?

### Rozwiązanie:

```bash
# Usuń node_modules i zainstaluj ponownie
rm -rf node_modules package-lock.json
npm install

# Sprawdź błędy TypeScript
npm run build
```

## Problem: Tabela transactions jest pusta po dodaniu transakcji

### Sprawdź:

1. Czy użytkownik jest zalogowany?
2. Czy transakcja została dodana? (sprawdź w konsoli przeglądarki)
3. Czy są błędy w konsoli?

### Rozwiązanie:

1. Sprawdź w panelu Supabase: **Table Editor** → **transactions**
2. Sprawdź, czy `user_id` w transakcji odpowiada ID zalogowanego użytkownika
3. Sprawdź polityki RLS - może blokują dostęp

## Problem: Paski postępu nie aktualizują się

### Sprawdź:

1. Czy transakcje są poprawnie zapisywane?
2. Czy `player` (A lub B) jest poprawnie ustawiony?
3. Czy kwoty są dodatnie?

### Rozwiązanie:

1. Odśwież stronę (F5)
2. Sprawdź w konsoli przeglądarki, czy są błędy
3. Sprawdź w bazie danych, czy transakcje mają poprawne wartości

## Problem: Aplikacja nie działa na mobile

### Sprawdź:

1. Czy używasz HTTPS? (wymagane dla niektórych funkcji przeglądarki)
2. Czy viewport jest poprawnie skonfigurowany?

### Rozwiązanie:

Aplikacja jest w pełni responsywna. Jeśli masz problemy:
1. Sprawdź w DevTools (F12) → Device Toolbar
2. Sprawdź, czy wszystkie style Tailwind są poprawnie załadowane

## Dodatkowa pomoc

Jeśli problem nadal występuje:

1. Sprawdź logi w konsoli przeglądarki (F12 → Console)
2. Sprawdź logi w terminalu, gdzie działa `npm run dev`
3. Sprawdź logi w panelu Supabase: **Logs** → **Postgres Logs** lub **API Logs`
