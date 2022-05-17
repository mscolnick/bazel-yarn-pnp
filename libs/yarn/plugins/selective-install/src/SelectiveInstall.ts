import type { Ident } from "@yarnpkg/core";
import { Command, Usage } from "clipanion";

import {
  Cache,
  Configuration,
  Project,
  StreamReport,
  MessageName,
} from "@yarnpkg/core";
import { BaseCommand, WorkspaceRequiredError } from "@yarnpkg/cli";
import { Option } from "clipanion";
import { PortablePath, npath } from "@yarnpkg/fslib";

export class SelectiveInstall extends BaseCommand {
  static paths = [["selective-install"]];

  includes: string[] = Option.Array("--includes", {
    description: "Only install the specified dependencies",
  });

  static usage: Usage = Command.Usage({
    description: "Install selected packages as needed.",
    details:
      "Install selected packages on-demand. Unused dependencies are not removed and missing dependencies are installed from remote.",
    examples: [
      [
        `Install only a subset of packages`,
        `$0 selective-install --includes=foo --includes=@bar/baz`,
      ],
    ],
  });

  async execute(): Promise<0 | 1> {
    const workspaceDirectory: PortablePath = npath.toPortablePath(
      this.context.cwd
    );

    const configuration = await Configuration.find(
      workspaceDirectory,
      this.context.plugins
    );
    const { project, workspace } = await Project.find(
      configuration,
      workspaceDirectory
    );

    await project.restoreInstallState();

    if (!workspace) {
      throw new WorkspaceRequiredError(project.cwd, workspaceDirectory);
    }

    const rootDirectoryPath = project.topLevelWorkspace.cwd;

    const report = await StreamReport.start(
      {
        configuration,
        stdout: this.context.stdout,
      },
      async (report: StreamReport) => {
        await report.startTimerPromise(
          "Installing specific dependencies only",
          async () => {
            const configuration = await Configuration.find(
              rootDirectoryPath,
              this.context.plugins
            );
            const { project, workspace } = await Project.find(
              configuration,
              rootDirectoryPath
            );

            if (!workspace) {
              throw new WorkspaceRequiredError(project.cwd, workspaceDirectory);
            }

            // Remove all the packages that are not in the workspace
            report.reportInfo(
              MessageName.UNNAMED,
              `Previous dependencies: ${workspace.manifest.dependencies.size}`
            );
            report.reportInfo(
              MessageName.UNNAMED,
              `Previous devDependencies: ${workspace.manifest.devDependencies.size}`
            );

            const includesSet = new Set(this.includes);
            const filterIdent = (ident: Ident) => {
              return includesSet.has(identToName(ident));
            };
            filterMapInPlace(workspace.manifest.dependencies, filterIdent);
            filterMapInPlace(workspace.manifest.devDependencies, filterIdent);

            report.reportInfo(MessageName.UNNAMED, "New dependencies");
            report.reportInfo(
              MessageName.UNNAMED,
              JSON.stringify(
                {
                  dependencies: [
                    ...workspace.manifest.dependencies.values(),
                  ].map(identToName),
                  devDependencies: [
                    ...workspace.manifest.devDependencies.values(),
                  ].map(identToName),
                },
                null,
                2
              )
            );

            const outCache = await Cache.find(configuration, {
              immutable: false,
              check: false,
            });

            await project.install({
              cache: outCache,
              report,
              // Needed to not change the lockfile when removing dependencies.
              immutable: false,
              // Needed to the package.json does not get updated.
              persistProject: false,
            });
          }
        );
      }
    );

    return report.exitCode();
  }
}

function identToName(ident: Ident): string {
  if (!ident.scope) {
    return ident.name;
  }
  return `@${ident.scope}/${ident.name}`;
}

function filterMapInPlace<K, V>(
  map: Map<K, V>,
  predicate: (ident: V) => boolean
) {
  for (const [key, value] of map.entries()) {
    if (!predicate(value)) {
      map.delete(key);
    }
  }
}
