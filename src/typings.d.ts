declare module "bootstrap";

declare module "*.svg" {
  const value: unknown;
  export = value;
}

interface NFTMetadata {
  sample_data?: {
    updated: string[] | [];
    adventure_text: string;
  };
  link?: string;
  name: string;
  label?: string;
  attributes?: { trait_type: string; value: string }[];
  traits?: { trait_type: string; value: string }[];
}

type SampleWordData = {
  circledProperties: object;
  adventureText: string | false;
};
