"use client";

import Link from "next/link";
import { CrownIcon, Fingerprint } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Crown03Icon } from "@hugeicons/core-free-icons";

function PriceTag({ price, discountedPrice }: { price: number; discountedPrice: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold bg-linear-to-br from-zinc-900 to-zinc-700 bg-clip-text text-transparent dark:from-white dark:to-zinc-300">
          ${discountedPrice}
        </span>
        <span className="text-lg line-through text-zinc-400">${price}</span>
      </div>

      <div className="flex flex-col text-right">
        <span className="text-sm font-medium">Lifetime access</span>
        <span className="text-xs text-zinc-500">One-time payment</span>
      </div>
    </div>
  );
}

export default function PlansDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <HugeiconsIcon icon={Crown03Icon} />
        Upgrade to Pro
      </DialogTrigger>

      <DialogPopup className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CrownIcon className="size-10" />
            Upgrade to Pro
          </DialogTitle>

          <DialogDescription>
            Unlock premium features and export high-quality code images without limits.
          </DialogDescription>
        </DialogHeader>

        <DialogPanel className="space-y-6">
          <PriceTag price={169} discountedPrice={99} />

          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>✓ Unlimited code exports</li>
            <li>✓ Higher image resolutions</li>
            <li>✓ Premium themes</li>
            <li>✓ No watermark</li>
          </ul>
        </DialogPanel>

        <DialogFooter className="flex-1">
          <div className="flex-1 flex flex-col gap-3">
            <Link
              className="group relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-rose-500 to-pink-500 font-semibold text-sm text-white tracking-wide shadow-lg shadow-rose-500/20 transition-all duration-500 hover:from-rose-600 hover:to-pink-600 hover:shadow-rose-500/30 hover:shadow-xl dark:from-rose-600 dark:to-pink-600 dark:hover:from-rose-500 dark:hover:to-pink-500"
              href="https://kokonutui.pro/#pricing"
              target="_blank"
            >
              <motion.span
                className="absolute inset-0 translate-x-[-200%] bg-linear-to-r from-transparent via-white/20 to-transparent"
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: 0,
                }}
                whileHover={{
                  x: ["-200%", "200%"],
                }}
              />
              <motion.div
                animate={{ opacity: 1 }}
                className="relative flex items-center gap-2 tracking-tighter"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Subscribe now
                <motion.div
                  animate={{
                    rotate: [0, 15, -15, 0],
                    y: [0, -2, 2, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                >
                  <Fingerprint className="h-4 w-4" />
                </motion.div>
              </motion.div>
            </Link>
            <Button variant="link">Maybe later</Button>
          </div>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
