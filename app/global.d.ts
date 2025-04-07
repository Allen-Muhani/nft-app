// global.d.ts
import { Web3Provider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum: Web3Provider; // or you can be more specific by using a more detailed type like `import { Web3Provider } from '@ethersproject/providers'`
  }
}
