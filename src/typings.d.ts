declare module "bootstrap";

declare module "*.svg" {
  const value: unknown;
  export = value;
}

declare module "*.png" {
  const value: unknown;
  export = value;
}

interface NFTMetadata {
  link?: string;
  name: string;
  label?: string;
  attributes: { trait_type: string; value: string }[];
  traits: { trait_type: string; value: string }[];
}

// @todo Remove extended ref.
// @ts-ignore
interface Ref<T = any> {
  value: T;
  /**
   * Type differentiator only.
   * We need this to be in public d.ts but don't want it to show up in IDE
   * autocomplete, so we use a private Symbol instead.
   */
  [RefSymbol]: true;
}
