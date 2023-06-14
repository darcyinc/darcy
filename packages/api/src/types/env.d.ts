declare namespace NodeJS {
  interface ProcessEnvironment {
    NODE_ENV: 'development' | 'production';
    PORT: string;
  }
}
