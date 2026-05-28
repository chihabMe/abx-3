# AboFranc4K Live - Premium IPTV Platform

_Modern streaming and entertainment platform built with Next.js_

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/chihabmes-projects/v0-abonix-website-redesign)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/tud79q0FnDW)

## Overview

AboFranc4K Live is a premium IPTV and streaming platform offering 4K content, live sports, movies, and series. Built with modern web technologies for the best user experience.

## Features

- Premium 4K streaming content
- 99.9% uptime guarantee
- 24/7 customer support
- Multi-device compatibility
- Fast and reliable service

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: Prisma with PostgreSQL
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## Telegram Order Notifications

When a customer creates an order, the server sends a Telegram message after the order is saved.

Required environment variables:

```env
TELEGRAM_BOT_TOKEN=123456:your-bot-token
TELEGRAM_CHAT_ID=123456789
```

Optional for Telegram forum topics:

```env
TELEGRAM_MESSAGE_THREAD_ID=123
```

The notification is non-blocking for the customer flow: if Telegram is not configured or the API fails, the order is still created.
