import type { AuthEncryption } from "./security/auth_encryption.ts";
import type { SharedKey } from "./security/shared_key.ts";

export interface Security {
  /** Specifies authentication and encryption methods. */
  authEncryption : AuthEncryption,
  /** Specifies the shared key for the network. */
  sharedKey : SharedKey
}
