# Deployment Guide for Vercel

## Overview

This guide walks you through deploying the Agent Chain application to Vercel.

## Prerequisites

- Vercel account
- Supabase project setup
- OpenAI API key
- Moralis API key (optional, for token price data)

## Environment Variables

Before deploying, ensure you have the following environment variables configured in your Vercel project:

### Required

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

### Optional

```bash
# Moralis Configuration (for token price data)
NEXT_PUBLIC_MORALIS_API_KEY=your_moralis_api_key

# Solana Configuration (uses defaults if not provided)
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

## Deployment Steps

### 1. Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add OPENAI_API_KEY
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_KEY
```

### 2. Via Vercel Dashboard

1. Connect your repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

## Build Configuration

The project includes a `vercel.json` configuration file with optimized settings:

- API route timeout: 10 seconds
- Node.js memory optimization
- Dynamic route handling

## Troubleshooting

### Build Issues

- Ensure all environment variables are set
- Check that API routes have `export const dynamic = 'force-dynamic'` for routes using search parameters

### Runtime Issues

- Verify Supabase connection and credentials
- Check OpenAI API key validity
- Ensure proper CORS settings in Supabase

### Performance

- API routes are optimized for edge runtime
- Static pages are pre-rendered where possible
- Dynamic content is server-rendered on demand

## Post-Deployment Checklist

- [ ] Test agent store functionality
- [ ] Verify chat features work
- [ ] Check wallet connection
- [ ] Test NFT minting (if applicable)
- [ ] Validate API endpoints respond correctly

## Monitoring

- Monitor function execution time in Vercel dashboard
- Check error logs for any runtime issues
- Set up uptime monitoring for critical endpoints
