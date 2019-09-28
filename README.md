# Create Deployment

Creates a [GitHub Deployment](https://developer.github.com/v3/repos/deployments/#create-a-deployment). To create and update deployment statuses use: https://github.com/bas/create-deployment-status

## Inputs

### `repo_token`

**Required** The GITHUB_TOKEN.

### `ref`

**Required** The ref to deploy. This can be a branch, tag, or SHA.

### `task`

Specifies a task to execute (e.g., deploy or deploy:migrations). Default: deploy.

### `auto_merge`

Attempts to automatically merge the default branch into the requested ref, if it's behind the default branch. Default: true.

### `required_contexts`

The status contexts to verify against commit status checks. If you omit this parameter, GitHub verifies all unique contexts before creating a deployment. To bypass checking entirely, pass an empty array. Defaults to all unique contexts.

### `payload`

JSON payload with extra information about the deployment. Default: "".

### `environment`

Name for the target deployment environment (e.g., production, staging, qa). Default: production.

### `description`

Short description of the deployment. Default: "".

### `transient_environment`

Specifies if the given environment is specific to the deployment and will no longer exist at some point in the future. Default: false.

## Outputs

### `deployment_id`

The deployment identifier.

## Example usage

```yaml
- uses: bas/create-deployment@v1
    id: deployment
    with:
      repo_token: ${{ secrets.GITHUB_TOKEN }}
      ref: ${{ github.ref }}
      required_contexts: "[]"
- name: "Check output"
  run: echo "Deployment created with ${{ steps.deployment.outputs.deployment_id }}"
```
