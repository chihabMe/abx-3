import * as motion from "motion/react-m";
import { fadeIn, staggerContainer } from "@/lib/motions";
import Image from "next/image";
import { Smartphone } from "lucide-react";

const devices = [
  {
    id: 1,
    name: "Android TV",
    icon: () => (
      <Image width={150} height={150} alt="image windows" src="/android.png" />
    ),
    color: "",
  },
  {
    id: 2,
    name: "iPhone & iPad",
    icon: () => (
      <Image width={150} height={150} alt="image apple" src="/apple.png" />
    ),
    color: "",
  },
  {
    id: 3,
    name: "Amazon Fire TV",
    icon: () => (
      <Image width={150} height={150} alt="image amazon" src="/amazon.png" />
    ),
    color: "",
  },
  {
    id: 4,
    name: "Samsung Smart TV",
    icon: () => (
      <Image width={150} height={150} alt="image samsung" src="/samsung.png" />
    ),
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 5,
    name: "LG WebOS",
    icon: () => <Image width={150} height={150} alt="image lg" src="/lg.png" />,
    color: "from-red-400 to-red-600",
  },
  {
    id: 6,
    name: "Téléphones et tablettes Android",
    icon: (props: any) => <Smartphone strokeWidth={1.5} {...props} />,
    color: "from-green-400 to-green-600",
  },
  {
    id: 7,
    name: "PC Windows",
    icon: () => (
      <Image width={150} height={150} alt="image android" src="/windows.png" />
    ),
    color: "",
  },
  {
    id: 8,
    name: "Mac",
    icon: () => (
      <Image width={150} height={150} alt="image mac" src="/apple.png" />
    ),
    color: "",
  },
];

const Compatibility = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="container  mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Compatible With All Your Devices
        </h2>
        <p className="text-center text-gray-400 mb-16">
          Enjoy 4kverse on any device, anywhere, anytime
        </p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView={"visible"}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8"
        >
          {devices.map((device, index) => (
            <motion.div
              key={device.id}
              variants={fadeIn}
              custom={index}
              whileHover={{
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className="relative flex flex-col items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0055A4]/10 to-[#0066CC]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative w-20 h-20 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 mb-4 p-3 group-hover:bg-white/20 transition-all duration-300">
                {device.icon({
                  className:
                    "w-full h-full object-contain filter brightness-110",
                })}
              </div>

              <h3 className="relative text-white font-medium text-sm md:text-base text-center leading-tight">
                {device.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Compatibility;
