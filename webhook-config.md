# Webhook Configuration

# Add these environment variables to your .env.local file

# Required: URL of your webhook endpoint

WEBHOOK_URL=https://your-other-server.com/api/webhooks/order-created

# Optional: Secret key for webhook authentication

WEBHOOK_SECRET=your-webhook-secret-key

# Example webhook payload that will be sent:

# {

# "event": "order.created",

# "timestamp": "2025-11-02T10:30:00.000Z",

# "data": {

# "order": {

# "id": "clxxxxxxxxxxxxx",

# "fullName": "John Doe",

# "email": "john@example.com",

# "phoneNumber": "+1234567890",

# "planName": "Premium",

# "duration": "12 months",

# "price": "99.99",

# "country": "FR",

# "createdAt": "2025-11-02T10:30:00.000Z"

# },

# "client": {

# "fullName": "John Doe",

# "email": "john@example.com",

# "phoneNumber": "+1234567890",

# "country": "FR"

# }

# }

# }
