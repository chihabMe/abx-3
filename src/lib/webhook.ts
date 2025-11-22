interface WebhookOrderData {
  order: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    planName: string;
    duration: string;
    price: string;
    country?: string;
    createdAt: Date;
  };
  client: {
    fullName: string;
    email: string;
    phoneNumber: string;
    country?: string;
  };
}

interface WebhookContactData {
  contact: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    message?: string;
    subject?: string;
    country?: string;
    createdAt: Date;
  };
}

interface WebhookResponse {
  success: boolean;
  error?: string;
}

export class WebhookService {
  private static readonly WEBHOOK_URL = process.env.WEBHOOK_URL;
  private static readonly CONTACT_WEBHOOK_URL = process.env.CONTACT_WEBHOOK_URL;
  private static readonly WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  private static readonly TIMEOUT_MS = 10000; // 10 seconds timeout

  /**
   * Sends order data to the configured webhook endpoint
   */
  static async sendOrderWebhook(
    orderData: WebhookOrderData
  ): Promise<WebhookResponse> {
    if (!this.WEBHOOK_URL) {
      console.warn("WEBHOOK_URL not configured, skipping webhook");
      return { success: false, error: "WEBHOOK_URL not configured" };
    }

    try {
      const payload = {
        event: "order.created",
        timestamp: new Date().toISOString(),
        data: orderData,
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "Abonix-Webhook/1.0",
      };

      // Add webhook secret if configured
      if (this.WEBHOOK_SECRET) {
        headers["X-Webhook-Secret"] = this.WEBHOOK_SECRET;
      }
      console.log("sending to", this.WEBHOOK_URL);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

      const response = await fetch(this.WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Webhook request failed with status ${response.status}: ${response.statusText}`
        );
      }

      console.log(
        `✅ Webhook sent successfully for order ${orderData.order.id}`
      );
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `❌ Failed to send webhook for order ${orderData.order.id}:`,
        errorMessage
      );

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Sends contact data to the configured contact webhook endpoint
   */
  static async sendContactWebhook(
    contactData: WebhookContactData
  ): Promise<WebhookResponse> {
    if (!this.CONTACT_WEBHOOK_URL) {
      console.warn(
        "CONTACT_WEBHOOK_URL not configured, skipping contact webhook"
      );
      return { success: false, error: "CONTACT_WEBHOOK_URL not configured" };
    }

    try {
      const payload = {
        event: "contact.created",
        timestamp: new Date().toISOString(),
        data: contactData,
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "User-Agent": "Abonix-Webhook/1.0",
      };

      // Add webhook secret if configured
      if (this.WEBHOOK_SECRET) {
        headers["X-Webhook-Secret"] = this.WEBHOOK_SECRET;
      }
      console.log("sending contact to", this.CONTACT_WEBHOOK_URL);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

      const response = await fetch(this.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(
          `Contact webhook request failed with status ${response.status}: ${response.status}`
        );
      }

      console.log(
        `✅ Contact webhook sent successfully for contact ${contactData.contact.id}`
      );
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(
        `❌ Failed to send contact webhook for contact ${contactData.contact.id}:`,
        errorMessage
      );

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Validates webhook configuration
   */
  static isConfigured(): boolean {
    return !!this.WEBHOOK_URL;
  }

  /**
   * Validates contact webhook configuration
   */
  static isContactWebhookConfigured(): boolean {
    return !!this.CONTACT_WEBHOOK_URL;
  }

  /**
   * Gets the configured contact webhook URL (for debugging)
   */
  static getContactWebhookUrl(): string | undefined {
    return this.CONTACT_WEBHOOK_URL;
  }
}
