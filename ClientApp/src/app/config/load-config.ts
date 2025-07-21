export function loadConfig(): () => Promise<void> {
  return () =>
    fetch('/assets/environment.json')
      .then(res => res.json())
      .then(config => {
        (window as any)['env'] = config;
      });
}