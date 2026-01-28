# BetScale Tracker

Minimalistyczna aplikacja webowa do śledzenia postępów w zakładzie biznesowym między dwoma użytkownikami. Celem jest monitorowanie czystego zysku (Profit) do poziomu 5,000 PLN.

## 🚀 Funkcjonalności

- **Dashboard z paskami postępu**: Dwa horyzontalne paski postępu dla Player A i Player B pokazujące procentową realizację celu (5,000 PLN)
- **System wprowadzania danych**: Prosty formularz do dodawania transakcji z kwotą, opisem i datą
- **Historia transakcji**: Tabela pokazująca ostatnie ruchy obu graczy
- **Prostota**: Aplikacja działa bez logowania - od razu gotowa do użycia
- **Responsywność**: Aplikacja działa idealnie na smartfonie

## 🛠️ Technologie

- **Frontend**: Next.js 14 (App Router) + React + TypeScript
- **Styling**: Tailwind CSS z ciemnym motywem w stylu "Old Money"
- **Backend**: Supabase (baza danych)

## 📦 Instalacja

1. **Sklonuj repozytorium i zainstaluj zależności:**

```bash
npm install
```

2. **Skonfiguruj Supabase:**

   - Utwórz projekt na [supabase.com](https://supabase.com)
   - Skopiuj URL projektu i klucz anonimowy
   - Utwórz plik `.env.local` w głównym katalogu:

```env
NEXT_PUBLIC_SUPABASE_URL=twoj_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj_supabase_anon_key
```

3. **Utwórz tabelę w Supabase:**

   - Przejdź do SQL Editor w panelu Supabase
   - Wykonaj migrację z pliku `supabase/migrations/001_initial_schema.sql`

4. **Uruchom aplikację:**

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000)

## 📱 Użycie

1. **Otwórz aplikację**: Dashboard jest dostępny od razu
2. **Dodawanie transakcji**: Wybierz gracza (A lub B), wprowadź kwotę zysku, opis i datę
3. **Śledzenie postępu**: Obserwuj paski postępu i historię transakcji na dashboardzie

## 🎨 Styl

Aplikacja wykorzystuje minimalistyczny, ciemny design w stylu "Old Money":
- Głęboka czerń i szarości jako kolory bazowe
- Eleganckie fonty bezszeryfowe (Inter)
- Subtelne akcenty kolorystyczne (zielony dla Player A, pomarańczowy dla Player B)
- Czyste, profesjonalne UI z dużą ilością białej przestrzeni

## 📝 Struktura projektu

```
├── app/
│   ├── dashboard/        # Dashboard (główna strona)
│   ├── layout.tsx       # Główny layout
│   └── page.tsx         # Strona główna (redirect do dashboard)
├── components/
│   ├── DashboardContent.tsx    # Główny komponent dashboardu
│   ├── ProgressBars.tsx        # Paski postępu
│   ├── TransactionForm.tsx     # Formularz transakcji
│   └── TransactionHistory.tsx  # Historia transakcji
├── lib/
│   └── supabase/        # Konfiguracja Supabase
└── supabase/
    └── migrations/      # Migracje bazy danych
```

## 🔒 Bezpieczeństwo

- Aplikacja jest publiczna - wszystkie transakcje są widoczne dla wszystkich
- Jeśli potrzebujesz prywatności, rozważ dodanie autoryzacji w przyszłości
- Dane są przechowywane w Supabase z możliwością łatwego dodania RLS w przyszłości

## 📄 Licencja

Projekt prywatny - wszystkie prawa zastrzeżone.
