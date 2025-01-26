import { ActionStatus } from "../enums/action-status.enum";

export const actionStatusStyles = {
  [ActionStatus.PENDING]: "bg-yellow-500/20 text-yellow-600",
  [ActionStatus.SUCCESS]: "bg-green-500/20 text-green-600",
  [ActionStatus.FAILED]: "bg-red-500/20 text-red-600",
};
