/// <reference types="react" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gmp-place-autocomplete": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        placeholder?: string;
      };
    }
  }
}

export {};
