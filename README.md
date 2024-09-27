# GitHub workflow dispatch example

When using reusable workflows in GitHub Actions, there is currenlty a limit of [max. 20 unique workflows](https://docs.github.com/en/actions/sharing-automations/reusing-workflows#limitations) you can use.

An example of how to approach the GitHub workflow dispatch event.
This might be useful in cases where we need to track triggering a workflow from another workflow.