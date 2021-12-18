declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RABBIT_MQ_CONNECTION: string;
      RABBIT_MQ_QUEUE: string;
      PORT: string;
    }
  }
}

export { };

