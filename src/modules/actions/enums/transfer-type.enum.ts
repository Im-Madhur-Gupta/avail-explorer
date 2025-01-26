/**
 * Types of token transfers supported by the Avail
 */
export enum TransferType {
  /** Transfer keeping minimum balance for account existence */
  KeepAlive = "transferKeepAlive",
  /** Transfer allowing account to be deleted if emptied */
  AllowDeath = "transferAllowDeath",
  /** Transfer all tokens from account */
  All = "transferAll",
}
