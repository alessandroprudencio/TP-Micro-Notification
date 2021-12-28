declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RABBIT_MQ_CONNECTION: string;
    }
  }
}

export {};
