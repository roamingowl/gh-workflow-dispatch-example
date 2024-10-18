import YAML from 'yaml';
import fs from 'node:fs';

const workflowJSON = {
    name: 'Big Workflow',
    on: {
        workflow_dispatch: {
            inputs: {}
        }
    },
    jobs: {}
}

const jobJSON = {
    'runs-on': 'ubuntu-latest',
    steps: [
        {
            uses: 'actions/checkout@v4'
        },
        {
            name: 'Fake test',
            shell: 'bash',
            run: 'echo "Testing..."'
        },
        {
            name: 'Fake lint',
            shell: 'bash',
            run: 'echo "Linting..."'
        },
        {
            name: 'Fake bundle',
            shell: 'bash',
            run: 'echo "Bundling..."'
        }
    ]
}

for (let i = 1; i <= 1518; i++) {
    workflowJSON.jobs[`library-${i}`] = {name: `Library ${i}`, ...jobJSON};
}

const workflowYAML = YAML.stringify(workflowJSON, {aliasDuplicateObjects: false});
fs.writeFileSync('.github/workflows/big-workflow.yml', workflowYAML);

workflowJSON.name = 'Big Workflow with Aliases';

const workflowYAMLWithAliases = YAML.stringify(workflowJSON);
fs.writeFileSync('.github/workflows/big-workflow-with-aliases.yml', workflowYAMLWithAliases);