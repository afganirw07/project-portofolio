    "use client"

    import { motion } from "framer-motion"
    import { cn } from "../../lib/utils"

    export const BorderBeam = ({
    className,
    duration = 6,
    borderWidth = 2,
    }) => {
    const transition = {
        duration,
        repeat: Infinity,
        ease: "linear",
    }

    return (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden">
        {/* TOP */}
        <motion.div
            className={cn(
            "absolute top-0 left-0 w-full",
            "bg-gradient-to-r from-[#6366f1] to-[#a855f7]",
            "transform-gpu",
            className
            )}
            style={{ height: borderWidth }}
            animate={{ x: ["-100%", "100%"] }}
            transition={transition}
        />

        {/* RIGHT */}
        <motion.div
            className={cn(
            "absolute top-0 right-0 h-full",
            "bg-gradient-to-b from-[#6366f1] to-[#a855f7]",
            "transform-gpu",
            className
            )}
            style={{ width: borderWidth }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ ...transition, delay: duration * 0.25 }}
        />

        {/* BOTTOM */}
        <motion.div
            className={cn(
            "absolute bottom-0 right-0 w-full",
            "bg-gradient-to-r from-[#6366f1] to-[#a855f7]",
            "transform-gpu",
            className
            )}
            style={{ height: borderWidth }}
            animate={{ x: ["100%", "-100%"] }}
            transition={{ ...transition, delay: duration * 0.5 }}
        />

        {/* LEFT */}
        <motion.div
            className={cn(
            "absolute bottom-0 left-0 h-full",
            "bg-gradient-to-b from-[#6366f1] to-[#a855f7]",
            "transform-gpu",
            className
            )}
            style={{ width: borderWidth }}
            animate={{ y: ["100%", "-100%"] }}
            transition={{ ...transition, delay: duration * 0.75 }}
        />
        </div>
    )
    }
