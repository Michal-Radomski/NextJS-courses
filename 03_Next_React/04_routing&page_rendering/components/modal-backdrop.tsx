"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

export default function ModalBackdrop(): JSX.Element {
  const router: AppRouterInstance = useRouter();

  return <div className="modal-backdrop" onClick={router.back} />;
}
