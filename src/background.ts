const SEARX_API = 'https://searx.space';
const SEARX_API_PATH = '/data/instances.json';


import { Instance, InstancesResponse } from './types';

let instances: InstancesResponse | null = null;

interface Filter {
  name: string;
  description?: string;
  call: (instance: [string, Instance]) => boolean;
}

const FILTERS: Map<string, Filter> = new Map();
function addFilter(filter: Filter) {
  FILTERS.set(filter.name, filter);
}
addFilter({
  name: 'Network normal',
  call: (instance) => instance[1].network_type === 'normal',
});
addFilter({
  name: 'No HTTP error',
  call: (instance) => instance[1].http.status_code === 200,
});


async function fetchInstances(): Promise<InstancesResponse> {
  const res = await fetch(`${SEARX_API}${SEARX_API_PATH}`);
  if (res.status !== 200) throw new Error(res.toString());
  return res.json();
}

async function findRandomInstance() {
  if (!instances) instances = await fetchInstances();

  const filters = Array.from(FILTERS.values());
  const selectedInstances = Object.entries(instances.instances).filter((instance) => {
    return filters.every(filter => filter.call(instance));
  });

  return selectedInstances[Math.floor(Math.random()*selectedInstances.length)];
}

findRandomInstance().then(console.log).catch(console.error);

browser.runtime.onMessage.addListener(async (message: object) => {
  console.log(message);
  const instance = await findRandomInstance();
  return instance[0];
});

async function handleTab(tab: { id: number, url: string}) {
  if (tab.url.startsWith('https://localhost/search')) {
    const search = tab.url.split('?')[1] || '';
    const instance = await findRandomInstance();
    await browser.tabs.update(tab.id, { url: instance[0] + '?' + search });
  }
}

browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url)
    handleTab({ id: tabId, url: changeInfo.url }).catch(console.error);
});

browser.tabs.onCreated.addListener((arg) => {
  if (arg.id && arg.url)
    handleTab({ id: arg.id, url: arg.url });
});
