export function friendlyError(err: unknown): string {
  if (!err) return "Unknown error";

  const error = err as { reason?: string; message?: string; code?: string };

  if (error.reason) return error.reason;
  
  if (error.code === "ACTION_REJECTED") {
    return "Transaction rejected";
  }
  
  if (error.message) {
    if (error.message.includes("user rejected")) {
      return "Transaction rejected";
    }
    if (error.message.includes("insufficient funds")) {
      return "Insufficient funds for gas";
    }
    return error.message;
  }

  return "Something went wrong";
}
