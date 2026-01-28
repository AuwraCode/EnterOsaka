# Access Code Configuration

## Default Access Code

The default access code is: **`bet5000`**

## How to Change the Access Code

### Option 1: Environment Variable (Recommended)

1. Open `.env.local` file in the project root
2. Add or update:
   ```env
   NEXT_PUBLIC_ACCESS_CODE=your_custom_code_here
   ```
3. Restart the development server:
   ```bash
   npm run dev
   ```

### Option 2: Direct Code Change

1. Open `app/access/page.tsx`
2. Find this line:
   ```typescript
   const ACCESS_CODE = process.env.NEXT_PUBLIC_ACCESS_CODE || 'bet5000'
   ```
3. Change `'bet5000'` to your desired code:
   ```typescript
   const ACCESS_CODE = process.env.NEXT_PUBLIC_ACCESS_CODE || 'your_custom_code'
   ```

## Security Notes

⚠️ **Important**: This is a simple client-side protection. For production use, consider:
- Server-side authentication
- More secure access control
- Rate limiting
- Session management

The current implementation stores authentication in `localStorage`, which can be cleared by users. This is suitable for basic protection but not for sensitive data.

## How It Works

1. User visits the app
2. If not authenticated, redirected to `/access`
3. User enters access code
4. Code is checked against `NEXT_PUBLIC_ACCESS_CODE` or default `bet5000`
5. If correct, `localStorage` is set and user is redirected to dashboard
6. Dashboard layout checks authentication on each load

## Locking the Dashboard

Users can click the "Lock" button in the dashboard header to log out and return to the access page.
