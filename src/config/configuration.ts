import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.dev.yaml';

export default () => {
  return yaml.load(
    readFileSync(join(process.cwd()+'/src/config', YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};