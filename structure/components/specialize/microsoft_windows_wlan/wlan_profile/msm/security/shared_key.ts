import type {KeyType} from './shared_key/key_type.ts'

export interface SharedKey {
  /** Specifies the key type. */
  keyType : KeyType,
  /** Specifies whether the key is encrypted. */
  protected : boolean,
  /** Specifies the passphrase or network key. */
  keyMaterial : string
}
