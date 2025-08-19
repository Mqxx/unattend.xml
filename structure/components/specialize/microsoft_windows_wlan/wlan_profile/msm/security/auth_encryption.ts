import type { Authentication } from "./auth_encryption/authentication.ts";
import type { Encryption } from "./auth_encryption/encryption.ts";

export interface AuthEncryption {
  /** Specifies the authentication method. */
  authentication : Authentication,
  /** Specifies the encryption method. */
  encryption : Encryption,
  /** Specifies whether 802.1X authentication is used. */
  useOneX : boolean
}
