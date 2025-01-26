"use client";

import ActionDetailsPage from "@/modules/actions/pages/ActionDetailsPage";
import { useParams } from "next/navigation";

const Action = () => {
  const { id } = useParams<{ id: string }>();

  return <ActionDetailsPage id={id} />;
};

export default Action;
