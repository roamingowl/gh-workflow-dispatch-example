# GitHub workflow dispatch example

>[!NOTE]
> This is an example repo to my article [Maximum of twenty unique reusable workflows limit](https://jurajsim.hashnode.dev/maximum-of-twenty-unique-reusable-workflows-limit) on Hashnode

When using reusable workflows in GitHub Actions, there is currenlty a limit of [max. 20 unique workflows](https://docs.github.com/en/actions/sharing-automations/reusing-workflows#limitations) you can use.
If you add more than 20 workflows, you will get an error message like this:

<img width="655" alt="image" src="https://github.com/user-attachments/assets/68620cb3-d07d-49a3-b2d8-9ec318e16310">

To overcome this issue you can use `workflow_dispatch` event. It is used when you/re running the WF manually from GitHub UI:

<img width="344" alt="image" src="https://github.com/user-attachments/assets/f7192c45-637a-4219-8823-d192e1988475">

But it can be also called programmatically from another workflow in an action. But it looks much more complicated:

```yaml
# Using reusable workflow example
name: Main workflow

jobs:
  library-1:
    name: Library 1
    uses: ./.github/workflows/reusable-workflow.yaml
    secrets: inherit
```

Compared to the usage of `workflow_dispatch` event:

```yaml
name: Main workflow

jobs:
  dispatch-job:
    name: Library 1
    runs-on: ubuntu-latest
    steps:
      - name: Invoke workflow and handle the result
        uses: benc-uk/workflow-dispatch@v1
        with:
          workflow: other-workflow.yaml
          token: ${{ secrets.GITHUB_TOKEN }}
          ref: ${{ github.ref }}
          inputs: |
            {
              "checks": "true",
              "tests": "true"
            }

# other-workflow.yaml
name: Other workflow

on:
  workflow_dispatch:
    inputs:
      checks:
        description: 'Run checks?'
        required: true
        default: 'false'
      tests:
        description: 'Run tests?'
        required: true
        default: 'false'
        
jobs:
  #..etc
```

Much more verbose! Additionally, there is a limit to how many parameters you can send to [10](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#providing-inputs).




An example of how to approach the GitHub workflow dispatch event.
This might be useful in cases where we need to track triggering a workflow from another workflow.
