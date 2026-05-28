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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} modal>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-900/95 backdrop-blur-xl border border-white/20 text-white shadow-2xl">
        {!isSuccess ? (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Abonnez-vous au forfait {plan.name}
                </DialogTitle>
                <DialogDescription className="text-center mt-4">
                  <div className="flex items-baseline justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-4">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-bold text-transparent">
                      ${plan.price}
                    </span>
                    <span className="ml-2 text-gray-300 text-lg">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Entrez vos informations ci-dessous pour recevoir les
                    instructions de paiement par email.
                  </p>
                </DialogDescription>
              </div>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-6"
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
                          placeholder="Jean Dupont"
                          {...field}
                          className="rounded-xl border border-white/20 bg-white/10 py-3 text-white backdrop-blur-sm placeholder:text-gray-400 focus:border-accent focus:ring-accent"
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
                          placeholder="jean.dupont@example.com"
                          {...field}
                          className="rounded-xl border border-white/20 bg-white/10 py-3 text-white backdrop-blur-sm placeholder:text-gray-400 focus:border-accent focus:ring-accent"
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
                          placeholder="+33 6 12 34 56 78"
                          {...field}
                          className="rounded-xl border border-white/20 bg-white/10 py-3 text-white backdrop-blur-sm placeholder:text-gray-400 focus:border-accent focus:ring-accent"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-accent py-4 text-lg font-semibold text-accent-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
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
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
              <div className="relative rounded-full bg-gradient-to-r from-green-100 to-emerald-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <DialogTitle className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Abonnement Réussi! 🎉
            </DialogTitle>

            <DialogDescription className="space-y-6 text-center">
              <p className="text-gray-300 text-lg">
                Merci de vous être abonné au forfait{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-bold text-transparent">
                  {plan.name}
                </span>
                .
              </p>

              <div className="rounded-2xl border border-accent/20 bg-gradient-to-r from-primary/10 to-accent/10 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-center">
                  <div className="mb-3 rounded-full bg-accent/20 p-3 backdrop-blur-sm">
                    <Mail className="h-8 w-8 text-accent" />
                  </div>
                  <p className="text-white font-medium mb-2">
                    Instructions envoyées !
                  </p>
                  <p className="text-gray-300 text-sm">
                    Nous avons envoyé les instructions de paiement à{" "}
                    <span className="font-medium text-white">{userEmail}</span>
                  </p>
                  <p className="text-amber-400 font-medium text-sm mt-3 bg-amber-400/10 px-3 py-2 rounded-lg">
                    ⚠️ Veuillez vérifier votre boîte de réception et vos
                    dossiers spam/indésirables.
                  </p>
                </div>
              </div>
            </DialogDescription>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
              <Button
                onClick={() => handleWhatsApp()}
                className="bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#25D366]/90 hover:to-[#128C7E]/90 text-white py-3 px-6 rounded-2xl font-semibold flex-1 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  📱 Envoyer via WhatsApp
                </span>
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                className="py-3 px-6 rounded-2xl flex-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
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
