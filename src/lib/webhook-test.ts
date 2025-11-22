import { WebhookService } from "@/lib/webhook";

/**
 * Test webhook functionality with sample data
 * This is useful for testing your webhook endpoint
 */
export async function testWebhook() {
  const sampleOrderData = {
    order: {
      id: "test_order_" + Date.now(),
      fullName: "Test User",
      email: "test@example.com",
      phoneNumber: "+1234567890",
      planName: "Premium Test Plan",
      duration: "12 months",
      price: "99.99",
      country: "FR",
      createdAt: new Date(),
    },
    client: {
      fullName: "Test User",
      email: "test@example.com",
      phoneNumber: "+1234567890",
      country: "FR",
    },
  };

  console.log("🔔 Testing webhook with sample data...");
  console.log(
    "Webhook URL:",
    WebhookService.getWebhookUrl() || "Not configured"
  );

  if (!WebhookService.isConfigured()) {
    console.warn(
      "⚠️  Webhook not configured. Please set WEBHOOK_URL in your environment variables."
    );
    return;
  }

  const result = await WebhookService.sendOrderWebhook(sampleOrderData);

  if (result.success) {
    console.log("✅ Webhook test successful!");
  } else {
    console.error("❌ Webhook test failed:", result.error);
  }

  return result;
}

/**
 * Console command to run webhook test
 * Usage: node -e "require('./src/lib/webhook-test.ts').testWebhook()"
 */
if (require.main === module) {
  testWebhook()
    .then(() => {
      console.log("Test completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Test failed:", error);
      process.exit(1);
    });
}
