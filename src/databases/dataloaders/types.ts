export interface Loader {
  load: any;
  loadMany: any;
  clear: any;
}

export interface DataLoaderOptions {
  cache?: boolean;
}
