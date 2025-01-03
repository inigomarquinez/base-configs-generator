import type { NodePlopAPI } from 'plop';
import { execSync } from 'node:child_process';

export default function (plop: NodePlopAPI) {
  plop.setActionType('installDependencies', function (answers, config, plop) {
    console.log('Instalando dependencias...');
    execSync('npm install', { cwd: `${answers.repoName}`, stdio: 'inherit' });
    // installDependencies(config.configProp);
    // // if something went wrong
    // throw 'error message';
    // // otherwise
    return 'success status message';
  });

  // Generador para inicializar el monorepo
  plop.setGenerator('init', {
    description: 'Generar un scaffolding para un monorepo',

    prompts: [
      {
        type: 'input',
        name: 'orgName',
        message: 'Nombre de la organización',
        default: 'my-org'
      },
      {
        type: 'input',
        name: 'repoName',
        message: 'Nombre del monorepo:',
        default: 'my-monorepo'
      }
    ],

    actions: [
      {
        type: 'add',
        path: '{{repoName}}/package.json',
        templateFile: 'templates/package.json.hbs'
      },
      {
        type: 'add',
        path: '{{repoName}}/README.md',
        templateFile: 'templates/README.md.hbs'
      },
      {
        type: 'add',
        path: '{{repoName}}/packages/.gitkeep',
        templateFile: 'templates/gitkeep.hbs'
      },
      // {
      //   type: 'installDependencies',
      // }
    ]
  });

  // Generador para añadir un nuevo subproyecto en packages/
  // plop.setGenerator('add', {
  //   description: 'Añadir un nuevo subproyecto en packages',

  //   prompts: [
  //     {
  //       type: 'input',
  //       name: 'packageName',
  //       message: 'Nombre del nuevo subproyecto:',
  //       validate: value => (value ? true : 'El nombre del subproyecto es requerido')
  //     }
  //   ],

  //   actions: [
  //     {
  //       type: 'add',
  //       path: 'packages/{{kebabCase packageName}}/package.json',
  //       templateFile: 'templates/package-subproject.json.hbs'
  //     },
  //     {
  //       type: 'add',
  //       path: 'packages/{{kebabCase packageName}}/src/index.ts',
  //       templateFile: 'templates/index.ts.hbs'
  //     },
  //     {
  //       type: 'add',
  //       path: 'packages/{{kebabCase packageName}}/README.md',
  //       templateFile: 'templates/README-subproject.md.hbs'
  //     }
  //   ]
  // });
}
