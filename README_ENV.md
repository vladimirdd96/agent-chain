# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# OpenAI Configuration (Required for chat functionality)
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration (if applicable)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Moralis Configuration (Optional - for wallet analytics)
NEXT_PUBLIC_MORALIS_API_KEY=your_moralis_api_key_here
```

## OpenAI API Key Setup

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key and add it to your `.env.local` file
4. Make sure to add `.env.local` to your `.gitignore` file

## Testing the Chat Feature

Once you've set up the environment variables:

1. Start the development server: `npm run dev`
2. Go to the Agent Store page
3. Click "Try Free Version" on any agent card
4. The chat modal should open and connect to OpenAI

## Notes

- The chat uses GPT-3.5-turbo model by default
- Each agent has its own context and personality based on its description
- The free version has a 500 token limit per response

## Optional Environment Variables

### Moralis API Key (For Wallet Analytics)

The wallet analytics feature requires a Moralis API key. If not configured, wallet analytics will be unavailable but all other features will work normally.

1. Go to [Moralis](https://moralis.io/)
2. Create an account and get your API key
3. Add it to your `.env.local` file as `NEXT_PUBLIC_MORALIS_API_KEY`

Note: Without this key, users will still be able to mint agents and use the workspace, but wallet analytics features will be disabled.
