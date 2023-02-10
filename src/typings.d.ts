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
