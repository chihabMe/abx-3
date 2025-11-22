# Webhook System for Order Notifications

This system automatically sends webhook notifications to your external server whenever a new order is created in the database.

## 📋 Features

- ✅ Automatic webhook sending when orders are created
- ✅ Includes complete order and client information
- ✅ Configurable webhook URL and secret
- ✅ Error handling and logging
- ✅ Test endpoint for webhook validation
- ✅ 10-second timeout protection
- ✅ Non-blocking: Order creation succeeds even if webhook fails

## 🔧 Setup

### 1. Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Required: Your webhook endpoint URL
WEBHOOK_URL=https://your-other-server.com/api/webhooks/order-created

# Optional: Secret key for webhook authentication
WEBHOOK_SECRET=your-webhook-secret-key
```

### 2. Webhook Payload Structure

Your webhook endpoint will receive a POST request with this payload:

```json
{
  "event": "order.created",
  "timestamp": "2025-11-02T10:30:00.000Z",
  "data": {
    "order": {
      "id": "clxxxxxxxxxxxxx",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "+1234567890",
      "planName": "Premium",
      "duration": "12 months",
      "price": "99.99",
      "country": "FR",
      "createdAt": "2025-11-02T10:30:00.000Z"
    },
    "client": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phoneNumber": "+1234567890",
      "country": "FR"
    }
  }
}
```

### 3. Webhook Headers

Your endpoint will receive these headers:

```
Content-Type: application/json
User-Agent: Abonix-Webhook/1.0
X-Webhook-Secret: your-webhook-secret-key (if configured)
```

## 🧪 Testing

### Option 1: Use the Test API Endpoint

Send a POST request to: `/api/admin/test-webhook`

```bash
curl -X POST http://localhost:3000/api/admin/test-webhook
```

### Option 2: Test from Code

```typescript
import { testWebhook } from "@/lib/webhook-test";

// Test the webhook
const result = await testWebhook();
console.log(result);
```

### Option 3: Create a Real Order

Simply create an order through your application's subscription form. The webhook will be automatically triggered.

## 🔍 Monitoring

Check your application logs for webhook status:

- ✅ `Webhook sent successfully for order {orderId}`
- ❌ `Failed to send webhook for order {orderId}: {error}`
- ⚠️ `WEBHOOK_URL not configured, skipping webhook`

## 🛠️ Your Webhook Endpoint

Your server needs to implement an endpoint that:

1. **Accepts POST requests** with JSON payload
2. **Validates the webhook secret** (if you're using one)
3. **Processes the order data** as needed
4. **Returns HTTP 200** for successful processing

### Example Webhook Endpoint (Node.js/Express)

```javascript
app.post("/api/webhooks/order-created", express.json(), (req, res) => {
  try {
    // Validate webhook secret
    const receivedSecret = req.headers["x-webhook-secret"];
    if (receivedSecret !== process.env.WEBHOOK_SECRET) {
      return res.status(401).json({ error: "Invalid webhook secret" });
    }

    // Process the webhook data
    const { event, timestamp, data } = req.body;

    if (event === "order.created") {
      const { order, client } = data;

      // Process the order data
      console.log("New order received:", order);

      // Your business logic here...
      // - Send notifications
      // - Update other systems
      // - Generate reports
      // etc.
    }

    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

## 🔒 Security Best Practices

1. **Use HTTPS** for your webhook URL
2. **Validate the webhook secret** to ensure requests are from your app
3. **Implement rate limiting** on your webhook endpoint
4. **Log webhook requests** for debugging and monitoring
5. **Return appropriate HTTP status codes**

## 🚨 Error Handling

The webhook system is designed to be resilient:

- **Non-blocking**: Order creation succeeds even if webhook fails
- **Timeout protection**: 10-second timeout prevents hanging
- **Error logging**: All webhook errors are logged for debugging
- **Graceful degradation**: System continues working without webhooks

## 📊 Webhook Status Codes

Your webhook endpoint should return:

- **200**: Success - webhook processed successfully
- **400**: Bad request - invalid payload
- **401**: Unauthorized - invalid webhook secret
- **500**: Server error - processing failed

## 🔄 Retries

Currently, the system doesn't implement automatic retries. If you need retry functionality, you can:

1. Implement it in your webhook endpoint
2. Use a queue system (Redis, AWS SQS, etc.)
3. Store failed webhooks in database for manual retry

## 📈 Next Steps

Consider implementing:

- Webhook retry mechanism
- Webhook delivery status tracking
- Multiple webhook endpoints
- Different event types (order.updated, order.cancelled, etc.)
- Webhook signature verification for enhanced security
