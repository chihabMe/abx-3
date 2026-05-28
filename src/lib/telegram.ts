interface TelegramOrderData {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  planName: string;
  duration: string;
  price: string;
  country?: string | null;
  createdAt: Date;
}

interface TelegramResponse {
  success: boolean;
  error?: string;
}

const formatValue = (value: string | null | undefined) =>
  value?.trim() || "Non specifie";

const formatOrderDate = (date: Date) => {
  const parts = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Algiers",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value || "";

  return `${getPart("day")}/${getPart("month")}/${getPart("year")} ${getPart(
    "hour"
  )}:${getPart("minute")}:${getPart("second")}`;
};

export class TelegramService {
  private static readonly BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  private static readonly CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  private static readonly MESSAGE_THREAD_ID =
    process.env.TELEGRAM_MESSAGE_THREAD_ID;
  private static readonly TIMEOUT_MS = 10000;

  static async sendOrderNotification(
    order: TelegramOrderData
  ): Promise<TelegramResponse> {
    if (!this.BOT_TOKEN || !this.CHAT_ID) {
      console.warn(
        "Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured"
      );
      return {
        success: false,
        error: "Telegram bot token or chat id is not configured",
      };
    }

    const message = [
      "✅ New Order Received!",
      `🆔 Order ID: ${formatValue(order.id)}`,
      `👤 Customer: ${formatValue(order.fullName)}`,
      `📧 Email: ${formatValue(order.email)}`,
      `📞 Phone: ${formatValue(order.phoneNumber)}`,
      `📦 Plan: ${formatValue(order.planName)} ${formatValue(order.price)}`,
      `💰 Price: ${formatValue(order.price)}€`,
      `🕒 Created At: ${formatOrderDate(order.createdAt)}`,
    ].join("\n");

    const payload: Record<string, string | number | boolean> = {
      chat_id: this.CHAT_ID,
      text: message,
      disable_web_page_preview: true,
    };

    if (
      this.MESSAGE_THREAD_ID &&
      !Number.isNaN(Number(this.MESSAGE_THREAD_ID))
    ) {
      payload.message_thread_id = Number(this.MESSAGE_THREAD_ID);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(
          `Telegram API returned ${response.status}: ${body || response.statusText}`
        );
      }

      console.log(`Telegram notification sent for order ${order.id}`);
      return { success: true };
    } catch (error) {
      clearTimeout(timeoutId);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Telegram error";
      console.error(
        `Failed to send Telegram notification for order ${order.id}:`,
        errorMessage
      );
      return { success: false, error: errorMessage };
    }
  }
}
