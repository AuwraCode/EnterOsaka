# Jak działa autoryzacja w Supabase

## Automatyczne przechowywanie danych użytkowników

**Supabase Auth automatycznie zarządza danymi użytkowników** - nie musisz tworzyć osobnej tabeli!

### Tabela `auth.users`

Supabase automatycznie tworzy i zarządza tabelą `auth.users`, która zawiera:

- `id` (UUID) - unikalny identyfikator użytkownika
- `email` - adres email użytkownika
- `encrypted_password` - **zahashowane hasło** (używa bcrypt)
- `email_confirmed_at` - data potwierdzenia email
- `created_at` - data utworzenia konta
- `updated_at` - data ostatniej aktualizacji
- i wiele innych pól...

### Bezpieczeństwo

✅ **Hasła są zawsze hashowane** - Supabase używa bcrypt, więc hasła nigdy nie są przechowywane w plain text  
✅ **Nie masz bezpośredniego dostępu** do tabeli `auth.users` - jest chroniona przez Supabase  
✅ **Automatyczne zarządzanie sesjami** - Supabase obsługuje tokeny JWT i refresh tokens

## Jak to działa w naszej aplikacji

### 1. Rejestracja użytkownika

Gdy użytkownik rejestruje się przez `supabase.auth.signUp()`:

```typescript
const { error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword123'
})
```

Supabase automatycznie:
- Tworzy nowy rekord w `auth.users`
- Hashuje hasło (bcrypt)
- Zapisuje email
- Generuje UUID dla użytkownika
- (Opcjonalnie) Wysyła email z potwierdzeniem

### 2. Logowanie

Gdy użytkownik loguje się przez `supabase.auth.signInWithPassword()`:

```typescript
const { error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword123'
})
```

Supabase:
- Sprawdza email w `auth.users`
- Porównuje zahashowane hasło
- Tworzy sesję (JWT token)
- Zwraca dane użytkownika

### 3. Powiązanie z transakcjami

W naszej tabeli `transactions` używamy `user_id` jako foreign key:

```sql
user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
```

To oznacza:
- Każda transakcja jest powiązana z użytkownikiem z `auth.users`
- Gdy użytkownik zostanie usunięty, jego transakcje też zostaną usunięte (CASCADE)
- Możemy używać `auth.uid()` w RLS policies do sprawdzania, który użytkownik jest zalogowany

## Sprawdzanie użytkownika w kodzie

### W komponencie klienckim:

```typescript
const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()

if (user) {
  console.log('Zalogowany:', user.email)
  console.log('ID:', user.id)
}
```

### W Server Component:

```typescript
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### W RLS Policy:

```sql
USING (auth.uid() = user_id)
```

`auth.uid()` zwraca ID zalogowanego użytkownika z `auth.users`.

## Co NIE musisz robić

❌ **Nie tworzysz tabeli `users`** - Supabase robi to za Ciebie  
❌ **Nie hashujesz haseł ręcznie** - Supabase robi to automatycznie  
❌ **Nie zarządzasz sesjami** - Supabase obsługuje JWT tokens  
❌ **Nie przechowujesz haseł w plain text** - Supabase zawsze je hashuje

## Dodatkowe informacje o użytkowniku

Jeśli chcesz przechowywać dodatkowe informacje o użytkowniku (np. imię, nazwisko, avatar), możesz:

1. **Użyć `user_metadata`** w Supabase Auth (ograniczone, tylko JSON)
2. **Utworzyć tabelę `profiles`** powiązaną z `auth.users`:

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Ale dla podstawowej funkcjonalności (email + hasło) **nie jest to potrzebne** - Supabase robi wszystko za Ciebie!

## Podsumowanie

✅ Email i hasło są automatycznie przechowywane w `auth.users`  
✅ Hasła są bezpiecznie hashowane (bcrypt)  
✅ Nie musisz tworzyć osobnej tabeli dla użytkowników  
✅ Tabela `transactions` używa `user_id` do powiązania z `auth.users`  
✅ Wszystko działa "out of the box" - wystarczy skonfigurować Supabase!
