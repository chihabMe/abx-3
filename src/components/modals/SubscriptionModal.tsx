"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PricingPlan } from "../sections/pricing/PricingSection";
import { whatsupNumber } from "@/constants";
import { subscribeActions } from "@/app/actoins/subscribe.actions";

// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: Record<string, any>
    ) => void;
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

export const subscribeSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Veuillez entrer un numéro de téléphone valide." }),
});

type FormValues = z.infer<typeof subscribeSchema>;

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingPlan;
}

const SubscriptionModal = ({
  isOpen,
  onClose,
  plan,
}: SubscriptionModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [whatsAppMessage, setWhatsAppMessage] = useState("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { fullName: "", email: "", phoneNumber: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setUserEmail(data.email);

    const message = `Bonjour, je m'appelle ${data.fullName}. \nJe souhaite souscrire au forfait *${plan.name}* (${plan.period}) pour *${plan.price} €*. \nMon email : ${data.email} \nMon téléphone : ${data.phoneNumber}`;
    setWhatsAppMessage(message);

    try {
      const response = await subscribeActions({
        ...data,
        planName: plan.name,
        duration: plan.period,
        price: plan.price.toString(),
      });

      if (response?.data?.status !== "success")
        throw new Error("Subscription failed");

      // 🎯 FIRE GOOGLE ADS CONVERSION TRACKING - ONLY ON ACTUAL SUBSCRIPTION
      if (typeof window !== "undefined" && window.gtag) {
        const transactionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Primary conversion tracking - only fires when user subscribes
        window.gtag("event", "conversion", {
          send_to: "AW-17718847114/TuRtCKvZtr0bEIrNgIFC",
          transaction_id: transactionId,
          value: plan.price,
          currency: "USD",
          email: data.email,
          phone_number: data.phoneNumber,
        });

        console.log("✅ Google Ads conversion tracked on subscription:", {
          transactionId,
          value: plan.price,
          plan: plan.name,
          email: data.email,
          conversionId: "AW-17718847114/TuRtCKvZtr0bEIrNgIFC",
        });
      } else {
        console.warn("⚠️ Google Ads gtag not available");
      }

      toast({
        title: "Abonnement réussi!",
        description: `Merci de vous être abonné au forfait ${plan.name}.`,
        variant: "default",
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      handleWhatsApp(message);
    }
  };

  const handleWhatsApp = (message?: string) => {
    const encoded = encodeURIComponent(message ?? whatsAppMessage);
    window.open(`https://wa.me/${whatsupNumber}?text=${encoded}`, "_blank");
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsSubmitting(false);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} modal>
      <DialogContent className="max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] overflow-hidden rounded-xl border border-white/20 bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 p-0 text-white shadow-2xl backdrop-blur-xl sm:max-h-[calc(100dvh-3rem)] sm:w-full sm:max-w-[500px]">
        {!isSuccess ? (
          <div className="flex max-h-[calc(100dvh-1rem)] flex-col sm:max-h-[calc(100dvh-3rem)]">
            <div className="overflow-y-auto px-4 pb-4 pt-6 sm:px-6 sm:pb-5 sm:pt-7">
            <DialogHeader className="space-y-3 pr-8 sm:space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent sm:mb-4"></div>
                <DialogTitle className="max-w-full bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold leading-tight text-transparent sm:text-2xl md:text-3xl">
                  Abonnez-vous au forfait {plan.name}
                </DialogTitle>
                <DialogDescription className="mt-3 text-center sm:mt-4">
                  <div className="mb-3 flex flex-wrap items-baseline justify-center rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:mb-4 sm:rounded-2xl sm:p-4">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                      ${plan.price}
                    </span>
                    <span className="ml-2 text-base text-gray-300 sm:text-lg">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                    Entrez vos informations ci-dessous pour recevoir les
                    instructions de paiement par email.
                  </p>
                </DialogDescription>
              </div>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-5 space-y-4 sm:mt-6 sm:space-y-5"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Nom complet
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="name"
                          placeholder="Jean Dupont"
                          {...field}
                          className="h-12 rounded-xl border border-white/20 bg-white/10 text-base text-white backdrop-blur-sm placeholder:text-gray-400 focus:border-accent focus:ring-accent"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="jean.dupont@example.com"
                          {...field}
                          className="h-12 rounded-xl border border-white/20 bg-white/10 text-base text-white backdrop-blur-sm placeholder:text-gray-400 focus:border-accent focus:ring-accent"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">
                        Numéro de téléphone
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="+33 6 12 34 56 78"
                          {...field}
                          className="h-12 rounded-xl border border-white/20 bg-white/10 text-base text-white backdrop-blur-sm placeholder:text-gray-400 focus:border-accent focus:ring-accent"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <div className="sticky bottom-0 -mx-4 border-t border-white/10 bg-black/70 px-4 pb-3 pt-3 backdrop-blur-xl sm:-mx-6 sm:px-6 sm:pb-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-xl bg-accent text-base font-semibold text-accent-foreground shadow-xl transition-all duration-300 hover:bg-accent/90 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:rounded-2xl sm:text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Traitement...
                      </>
                    ) : (
                      <>
                        <span className="flex items-center gap-2">
                          S&apos;abonner maintenant
                          <span>🚀</span>
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
            </div>
          </div>
        ) : (
          <div className="flex max-h-[calc(100dvh-1rem)] flex-col overflow-y-auto px-4 py-6 text-center sm:max-h-[calc(100dvh-3rem)] sm:px-6 sm:py-8">
            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
              <div className="relative mx-auto w-fit rounded-full bg-gradient-to-r from-green-100 to-emerald-100 p-3 sm:p-4">
                <CheckCircle className="h-10 w-10 text-green-600 sm:h-12 sm:w-12" />
              </div>
            </div>

            <DialogTitle className="mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-xl font-bold leading-tight text-transparent sm:mb-4 sm:text-2xl md:text-3xl">
              Abonnement Réussi! 🎉
            </DialogTitle>

            <DialogDescription className="space-y-4 text-center sm:space-y-6">
              <p className="text-base text-gray-300 sm:text-lg">
                Merci de vous être abonné au forfait{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-bold text-transparent">
                  {plan.name}
                </span>
                .
              </p>

              <div className="rounded-xl border border-accent/20 bg-gradient-to-r from-primary/10 to-accent/10 p-4 backdrop-blur-sm sm:rounded-2xl sm:p-6">
                <div className="flex flex-col items-center">
                  <div className="mb-3 rounded-full bg-accent/20 p-3 backdrop-blur-sm">
                    <Mail className="h-6 w-6 text-accent sm:h-8 sm:w-8" />
                  </div>
                  <p className="text-white font-medium mb-2">
                    Instructions envoyées !
                  </p>
                  <p className="break-words text-sm text-gray-300">
                    Nous avons envoyé les instructions de paiement à{" "}
                    <span className="font-medium text-white">{userEmail}</span>
                  </p>
                  <p className="mt-3 rounded-lg bg-blue-400/10 px-3 py-2 text-sm font-medium text-blue-400">
                    ⚠️ Veuillez vérifier votre boîte de réception et vos
                    dossiers spam/indésirables.
                  </p>
                </div>
              </div>
            </DialogDescription>

            <div className="sticky bottom-0 -mx-4 mt-6 flex w-[calc(100%+2rem)] flex-col gap-3 border-t border-white/10 bg-black/70 px-4 pb-1 pt-3 backdrop-blur-xl sm:-mx-6 sm:mt-8 sm:w-[calc(100%+3rem)] sm:flex-row sm:gap-4 sm:px-6 sm:pb-0">
              <Button
                onClick={() => handleWhatsApp()}
                className="h-12 flex-1 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-[#25D366]/90 hover:to-[#128C7E]/90 hover:shadow-xl sm:rounded-2xl sm:px-6"
              >
                <span className="flex items-center gap-2">
                  📱 Envoyer via WhatsApp
                </span>
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="h-12 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 sm:rounded-2xl sm:px-6"
              >
                Fermer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
