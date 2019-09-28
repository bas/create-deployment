import * as core from '@actions/core';
import * as github from '@actions/github';
import * as yaml from 'js-yaml';

async function run() {
  try {
    const token = core.getInput('repo_token', { required: true });
    const ref = core.getInput('ref', { required: true });
    const task = core.getInput('task');
    const autoMerge: boolean = yaml.load(core.getInput('auto_merge'));
    const requiredContexts: string[] = yaml.load(core.getInput('required_contexts'));
    const payload = core.getInput('payload');
    const environment = core.getInput('environment');
    const description = core.getInput('description');
    const transientEnvironment: boolean = yaml.load(core.getInput('transient_environment'));
    const productionEnvironment: boolean = yaml.load(core.getInput('production_environment'));

    const client = new github.GitHub(token);

    const deploymentId = await createDeployment(client, ref, task, autoMerge, requiredContexts,
      payload, environment, description, transientEnvironment, productionEnvironment);

    if (deploymentId) {
      core.setOutput('deployment_id', deploymentId.toString())
    }

    core.debug('Created deployment: ${deploymentId}');

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function createDeployment(
  client: github.GitHub,
  ref: string,
  task: string,
  autoMerge: boolean,
  requiredContexts: string[],
  payload: string,
  environment: string,
  description: string,
  transientEnvironment: boolean,
  productionEnvironment: boolean
): Promise<number> {
  const response = await client.repos.createDeployment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    ref: ref,
    task: task,
    auto_merge: autoMerge,
    required_contexts: requiredContexts,
    payload: payload,
    environment: environment,
    description: description,
    transient_environment: transientEnvironment,
    production_environment: productionEnvironment
  });

  return response.data.id;
}

run();
