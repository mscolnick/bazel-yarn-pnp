/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-selective-install",
factory: function (require) {
var plugin = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __require = (x) => {
    if (typeof require !== "undefined")
      return require(x);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
  };

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    default: () => src_default
  });

  // src/SelectiveInstall.ts
  var import_clipanion = __toModule(__require("clipanion"));
  var import_core = __toModule(__require("@yarnpkg/core"));
  var import_cli = __toModule(__require("@yarnpkg/cli"));
  var import_clipanion2 = __toModule(__require("clipanion"));
  var import_fslib = __toModule(__require("@yarnpkg/fslib"));
  var SelectiveInstall = class extends import_cli.BaseCommand {
    constructor() {
      super(...arguments);
      this.includes = import_clipanion2.Option.Array("--includes", {
        description: "Only install the specified dependencies"
      });
    }
    async execute() {
      const workspaceDirectory = import_fslib.npath.toPortablePath(this.context.cwd);
      const configuration = await import_core.Configuration.find(workspaceDirectory, this.context.plugins);
      const {project, workspace} = await import_core.Project.find(configuration, workspaceDirectory);
      await project.restoreInstallState();
      if (!workspace) {
        throw new import_cli.WorkspaceRequiredError(project.cwd, workspaceDirectory);
      }
      const rootDirectoryPath = project.topLevelWorkspace.cwd;
      const report = await import_core.StreamReport.start({
        configuration,
        stdout: this.context.stdout
      }, async (report2) => {
        await report2.startTimerPromise("Installing specific dependencies only", async () => {
          const configuration2 = await import_core.Configuration.find(rootDirectoryPath, this.context.plugins);
          const {project: project2, workspace: workspace2} = await import_core.Project.find(configuration2, rootDirectoryPath);
          if (!workspace2) {
            throw new import_cli.WorkspaceRequiredError(project2.cwd, workspaceDirectory);
          }
          report2.reportInfo(import_core.MessageName.UNNAMED, `Previous dependencies: ${workspace2.manifest.dependencies.size}`);
          report2.reportInfo(import_core.MessageName.UNNAMED, `Previous devDependencies: ${workspace2.manifest.devDependencies.size}`);
          const includesSet = new Set(this.includes);
          const filterIdent = (ident) => {
            return includesSet.has(identToName(ident));
          };
          filterMapInPlace(workspace2.manifest.dependencies, filterIdent);
          filterMapInPlace(workspace2.manifest.devDependencies, filterIdent);
          report2.reportInfo(import_core.MessageName.UNNAMED, "New dependencies");
          report2.reportInfo(import_core.MessageName.UNNAMED, JSON.stringify({
            dependencies: [
              ...workspace2.manifest.dependencies.values()
            ].map(identToName),
            devDependencies: [
              ...workspace2.manifest.devDependencies.values()
            ].map(identToName)
          }, null, 2));
          const outCache = await import_core.Cache.find(configuration2, {
            immutable: false,
            check: false
          });
          await project2.install({
            cache: outCache,
            report: report2,
            immutable: false,
            persistProject: false
          });
        });
      });
      return report.exitCode();
    }
  };
  SelectiveInstall.paths = [["selective-install"]];
  SelectiveInstall.usage = import_clipanion.Command.Usage({
    description: "Install selected packages as needed.",
    details: "Install selected packages on-demand. Unused dependencies are not removed and missing dependencies are installed from remote.",
    examples: [
      [
        `Install only a subset of packages`,
        `$0 selective-install --includes=foo --includes=@bar/baz`
      ]
    ]
  });
  function identToName(ident) {
    if (!ident.scope) {
      return ident.name;
    }
    return `@${ident.scope}/${ident.name}`;
  }
  function filterMapInPlace(map, predicate) {
    for (const [key, value] of map.entries()) {
      if (!predicate(value)) {
        map.delete(key);
      }
    }
  }

  // src/index.ts
  var plugin = {commands: [SelectiveInstall]};
  var src_default = plugin;
  return src_exports;
})();
return plugin;
}
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2luZGV4LnRzIiwgIi4uLy4uL3NyYy9TZWxlY3RpdmVJbnN0YWxsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gXCJAeWFybnBrZy9jb3JlXCI7XG5pbXBvcnQgeyBTZWxlY3RpdmVJbnN0YWxsIH0gZnJvbSBcIi4vU2VsZWN0aXZlSW5zdGFsbFwiO1xuXG5jb25zdCBwbHVnaW46IFBsdWdpbiA9IHsgY29tbWFuZHM6IFtTZWxlY3RpdmVJbnN0YWxsXSB9O1xuXG5leHBvcnQgZGVmYXVsdCBwbHVnaW47XG4iLCAiaW1wb3J0IHR5cGUgeyBJZGVudCB9IGZyb20gXCJAeWFybnBrZy9jb3JlXCI7XG5pbXBvcnQgeyBDb21tYW5kLCBVc2FnZSB9IGZyb20gXCJjbGlwYW5pb25cIjtcblxuaW1wb3J0IHtcbiAgQ2FjaGUsXG4gIENvbmZpZ3VyYXRpb24sXG4gIFByb2plY3QsXG4gIFN0cmVhbVJlcG9ydCxcbiAgTWVzc2FnZU5hbWUsXG59IGZyb20gXCJAeWFybnBrZy9jb3JlXCI7XG5pbXBvcnQgeyBCYXNlQ29tbWFuZCwgV29ya3NwYWNlUmVxdWlyZWRFcnJvciB9IGZyb20gXCJAeWFybnBrZy9jbGlcIjtcbmltcG9ydCB7IE9wdGlvbiB9IGZyb20gXCJjbGlwYW5pb25cIjtcbmltcG9ydCB7IFBvcnRhYmxlUGF0aCwgbnBhdGggfSBmcm9tIFwiQHlhcm5wa2cvZnNsaWJcIjtcblxuZXhwb3J0IGNsYXNzIFNlbGVjdGl2ZUluc3RhbGwgZXh0ZW5kcyBCYXNlQ29tbWFuZCB7XG4gIHN0YXRpYyBwYXRocyA9IFtbXCJzZWxlY3RpdmUtaW5zdGFsbFwiXV07XG5cbiAgaW5jbHVkZXM6IHN0cmluZ1tdID0gT3B0aW9uLkFycmF5KFwiLS1pbmNsdWRlc1wiLCB7XG4gICAgZGVzY3JpcHRpb246IFwiT25seSBpbnN0YWxsIHRoZSBzcGVjaWZpZWQgZGVwZW5kZW5jaWVzXCIsXG4gIH0pO1xuXG4gIHN0YXRpYyB1c2FnZTogVXNhZ2UgPSBDb21tYW5kLlVzYWdlKHtcbiAgICBkZXNjcmlwdGlvbjogXCJJbnN0YWxsIHNlbGVjdGVkIHBhY2thZ2VzIGFzIG5lZWRlZC5cIixcbiAgICBkZXRhaWxzOlxuICAgICAgXCJJbnN0YWxsIHNlbGVjdGVkIHBhY2thZ2VzIG9uLWRlbWFuZC4gVW51c2VkIGRlcGVuZGVuY2llcyBhcmUgbm90IHJlbW92ZWQgYW5kIG1pc3NpbmcgZGVwZW5kZW5jaWVzIGFyZSBpbnN0YWxsZWQgZnJvbSByZW1vdGUuXCIsXG4gICAgZXhhbXBsZXM6IFtcbiAgICAgIFtcbiAgICAgICAgYEluc3RhbGwgb25seSBhIHN1YnNldCBvZiBwYWNrYWdlc2AsXG4gICAgICAgIGAkMCBzZWxlY3RpdmUtaW5zdGFsbCAtLWluY2x1ZGVzPWZvbyAtLWluY2x1ZGVzPUBiYXIvYmF6YCxcbiAgICAgIF0sXG4gICAgXSxcbiAgfSk7XG5cbiAgYXN5bmMgZXhlY3V0ZSgpOiBQcm9taXNlPDAgfCAxPiB7XG4gICAgY29uc3Qgd29ya3NwYWNlRGlyZWN0b3J5OiBQb3J0YWJsZVBhdGggPSBucGF0aC50b1BvcnRhYmxlUGF0aChcbiAgICAgIHRoaXMuY29udGV4dC5jd2RcbiAgICApO1xuXG4gICAgY29uc3QgY29uZmlndXJhdGlvbiA9IGF3YWl0IENvbmZpZ3VyYXRpb24uZmluZChcbiAgICAgIHdvcmtzcGFjZURpcmVjdG9yeSxcbiAgICAgIHRoaXMuY29udGV4dC5wbHVnaW5zXG4gICAgKTtcbiAgICBjb25zdCB7IHByb2plY3QsIHdvcmtzcGFjZSB9ID0gYXdhaXQgUHJvamVjdC5maW5kKFxuICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgIHdvcmtzcGFjZURpcmVjdG9yeVxuICAgICk7XG5cbiAgICBhd2FpdCBwcm9qZWN0LnJlc3RvcmVJbnN0YWxsU3RhdGUoKTtcblxuICAgIGlmICghd29ya3NwYWNlKSB7XG4gICAgICB0aHJvdyBuZXcgV29ya3NwYWNlUmVxdWlyZWRFcnJvcihwcm9qZWN0LmN3ZCwgd29ya3NwYWNlRGlyZWN0b3J5KTtcbiAgICB9XG5cbiAgICBjb25zdCByb290RGlyZWN0b3J5UGF0aCA9IHByb2plY3QudG9wTGV2ZWxXb3Jrc3BhY2UuY3dkO1xuXG4gICAgY29uc3QgcmVwb3J0ID0gYXdhaXQgU3RyZWFtUmVwb3J0LnN0YXJ0KFxuICAgICAge1xuICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICBzdGRvdXQ6IHRoaXMuY29udGV4dC5zdGRvdXQsXG4gICAgICB9LFxuICAgICAgYXN5bmMgKHJlcG9ydDogU3RyZWFtUmVwb3J0KSA9PiB7XG4gICAgICAgIGF3YWl0IHJlcG9ydC5zdGFydFRpbWVyUHJvbWlzZShcbiAgICAgICAgICBcIkluc3RhbGxpbmcgc3BlY2lmaWMgZGVwZW5kZW5jaWVzIG9ubHlcIixcbiAgICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25maWd1cmF0aW9uID0gYXdhaXQgQ29uZmlndXJhdGlvbi5maW5kKFxuICAgICAgICAgICAgICByb290RGlyZWN0b3J5UGF0aCxcbiAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnBsdWdpbnNcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCB7IHByb2plY3QsIHdvcmtzcGFjZSB9ID0gYXdhaXQgUHJvamVjdC5maW5kKFxuICAgICAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgICByb290RGlyZWN0b3J5UGF0aFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKCF3b3Jrc3BhY2UpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IFdvcmtzcGFjZVJlcXVpcmVkRXJyb3IocHJvamVjdC5jd2QsIHdvcmtzcGFjZURpcmVjdG9yeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgdGhlIHBhY2thZ2VzIHRoYXQgYXJlIG5vdCBpbiB0aGUgd29ya3NwYWNlXG4gICAgICAgICAgICByZXBvcnQucmVwb3J0SW5mbyhcbiAgICAgICAgICAgICAgTWVzc2FnZU5hbWUuVU5OQU1FRCxcbiAgICAgICAgICAgICAgYFByZXZpb3VzIGRlcGVuZGVuY2llczogJHt3b3Jrc3BhY2UubWFuaWZlc3QuZGVwZW5kZW5jaWVzLnNpemV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlcG9ydC5yZXBvcnRJbmZvKFxuICAgICAgICAgICAgICBNZXNzYWdlTmFtZS5VTk5BTUVELFxuICAgICAgICAgICAgICBgUHJldmlvdXMgZGV2RGVwZW5kZW5jaWVzOiAke3dvcmtzcGFjZS5tYW5pZmVzdC5kZXZEZXBlbmRlbmNpZXMuc2l6ZX1gXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBpbmNsdWRlc1NldCA9IG5ldyBTZXQodGhpcy5pbmNsdWRlcyk7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJJZGVudCA9IChpZGVudDogSWRlbnQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGluY2x1ZGVzU2V0LmhhcyhpZGVudFRvTmFtZShpZGVudCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZpbHRlck1hcEluUGxhY2Uod29ya3NwYWNlLm1hbmlmZXN0LmRlcGVuZGVuY2llcywgZmlsdGVySWRlbnQpO1xuICAgICAgICAgICAgZmlsdGVyTWFwSW5QbGFjZSh3b3Jrc3BhY2UubWFuaWZlc3QuZGV2RGVwZW5kZW5jaWVzLCBmaWx0ZXJJZGVudCk7XG5cbiAgICAgICAgICAgIHJlcG9ydC5yZXBvcnRJbmZvKE1lc3NhZ2VOYW1lLlVOTkFNRUQsIFwiTmV3IGRlcGVuZGVuY2llc1wiKTtcbiAgICAgICAgICAgIHJlcG9ydC5yZXBvcnRJbmZvKFxuICAgICAgICAgICAgICBNZXNzYWdlTmFtZS5VTk5BTUVELFxuICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBkZXBlbmRlbmNpZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgLi4ud29ya3NwYWNlLm1hbmlmZXN0LmRlcGVuZGVuY2llcy52YWx1ZXMoKSxcbiAgICAgICAgICAgICAgICAgIF0ubWFwKGlkZW50VG9OYW1lKSxcbiAgICAgICAgICAgICAgICAgIGRldkRlcGVuZGVuY2llczogW1xuICAgICAgICAgICAgICAgICAgICAuLi53b3Jrc3BhY2UubWFuaWZlc3QuZGV2RGVwZW5kZW5jaWVzLnZhbHVlcygpLFxuICAgICAgICAgICAgICAgICAgXS5tYXAoaWRlbnRUb05hbWUpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IG91dENhY2hlID0gYXdhaXQgQ2FjaGUuZmluZChjb25maWd1cmF0aW9uLCB7XG4gICAgICAgICAgICAgIGltbXV0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIGNoZWNrOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBhd2FpdCBwcm9qZWN0Lmluc3RhbGwoe1xuICAgICAgICAgICAgICBjYWNoZTogb3V0Q2FjaGUsXG4gICAgICAgICAgICAgIHJlcG9ydCxcbiAgICAgICAgICAgICAgLy8gTmVlZGVkIHRvIG5vdCBjaGFuZ2UgdGhlIGxvY2tmaWxlIHdoZW4gcmVtb3ZpbmcgZGVwZW5kZW5jaWVzLlxuICAgICAgICAgICAgICBpbW11dGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAvLyBOZWVkZWQgdG8gdGhlIHBhY2thZ2UuanNvbiBkb2VzIG5vdCBnZXQgdXBkYXRlZC5cbiAgICAgICAgICAgICAgcGVyc2lzdFByb2plY3Q6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVwb3J0LmV4aXRDb2RlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaWRlbnRUb05hbWUoaWRlbnQ6IElkZW50KTogc3RyaW5nIHtcbiAgaWYgKCFpZGVudC5zY29wZSkge1xuICAgIHJldHVybiBpZGVudC5uYW1lO1xuICB9XG4gIHJldHVybiBgQCR7aWRlbnQuc2NvcGV9LyR7aWRlbnQubmFtZX1gO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJNYXBJblBsYWNlPEssIFY+KFxuICBtYXA6IE1hcDxLLCBWPixcbiAgcHJlZGljYXRlOiAoaWRlbnQ6IFYpID0+IGJvb2xlYW5cbikge1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBtYXAuZW50cmllcygpKSB7XG4gICAgaWYgKCFwcmVkaWNhdGUodmFsdWUpKSB7XG4gICAgICBtYXAuZGVsZXRlKGtleSk7XG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNDQSx5QkFBK0I7QUFFL0Isb0JBTU87QUFDUCxtQkFBb0Q7QUFDcEQsMEJBQXVCO0FBQ3ZCLHFCQUFvQztBQUU3Qix1Q0FBK0IsdUJBQVk7QUFBQSxJQUEzQyxjQWRQO0FBY087QUFHTCxzQkFBcUIseUJBQU8sTUFBTSxjQUFjO0FBQUEsUUFDOUMsYUFBYTtBQUFBO0FBQUE7QUFBQSxVQWVULFVBQTBCO0FBQzlCLFlBQU0scUJBQW1DLG1CQUFNLGVBQzdDLEtBQUssUUFBUTtBQUdmLFlBQU0sZ0JBQWdCLE1BQU0sMEJBQWMsS0FDeEMsb0JBQ0EsS0FBSyxRQUFRO0FBRWYsWUFBTSxDQUFFLFNBQVMsYUFBYyxNQUFNLG9CQUFRLEtBQzNDLGVBQ0E7QUFHRixZQUFNLFFBQVE7QUFFZCxVQUFJLENBQUMsV0FBVztBQUNkLGNBQU0sSUFBSSxrQ0FBdUIsUUFBUSxLQUFLO0FBQUE7QUFHaEQsWUFBTSxvQkFBb0IsUUFBUSxrQkFBa0I7QUFFcEQsWUFBTSxTQUFTLE1BQU0seUJBQWEsTUFDaEM7QUFBQSxRQUNFO0FBQUEsUUFDQSxRQUFRLEtBQUssUUFBUTtBQUFBLFNBRXZCLE9BQU8sWUFBeUI7QUFDOUIsY0FBTSxRQUFPLGtCQUNYLHlDQUNBLFlBQVk7QUFDVixnQkFBTSxpQkFBZ0IsTUFBTSwwQkFBYyxLQUN4QyxtQkFDQSxLQUFLLFFBQVE7QUFFZixnQkFBTSxDQUFFLG1CQUFTLHlCQUFjLE1BQU0sb0JBQVEsS0FDM0MsZ0JBQ0E7QUFHRixjQUFJLENBQUMsWUFBVztBQUNkLGtCQUFNLElBQUksa0NBQXVCLFNBQVEsS0FBSztBQUFBO0FBSWhELGtCQUFPLFdBQ0wsd0JBQVksU0FDWiwwQkFBMEIsV0FBVSxTQUFTLGFBQWE7QUFFNUQsa0JBQU8sV0FDTCx3QkFBWSxTQUNaLDZCQUE2QixXQUFVLFNBQVMsZ0JBQWdCO0FBR2xFLGdCQUFNLGNBQWMsSUFBSSxJQUFJLEtBQUs7QUFDakMsZ0JBQU0sY0FBYyxDQUFDLFVBQWlCO0FBQ3BDLG1CQUFPLFlBQVksSUFBSSxZQUFZO0FBQUE7QUFFckMsMkJBQWlCLFdBQVUsU0FBUyxjQUFjO0FBQ2xELDJCQUFpQixXQUFVLFNBQVMsaUJBQWlCO0FBRXJELGtCQUFPLFdBQVcsd0JBQVksU0FBUztBQUN2QyxrQkFBTyxXQUNMLHdCQUFZLFNBQ1osS0FBSyxVQUNIO0FBQUEsWUFDRSxjQUFjO0FBQUEsY0FDWixHQUFHLFdBQVUsU0FBUyxhQUFhO0FBQUEsY0FDbkMsSUFBSTtBQUFBLFlBQ04saUJBQWlCO0FBQUEsY0FDZixHQUFHLFdBQVUsU0FBUyxnQkFBZ0I7QUFBQSxjQUN0QyxJQUFJO0FBQUEsYUFFUixNQUNBO0FBSUosZ0JBQU0sV0FBVyxNQUFNLGtCQUFNLEtBQUssZ0JBQWU7QUFBQSxZQUMvQyxXQUFXO0FBQUEsWUFDWCxPQUFPO0FBQUE7QUFHVCxnQkFBTSxTQUFRLFFBQVE7QUFBQSxZQUNwQixPQUFPO0FBQUEsWUFDUDtBQUFBLFlBRUEsV0FBVztBQUFBLFlBRVgsZ0JBQWdCO0FBQUE7QUFBQTtBQUFBO0FBTzFCLGFBQU8sT0FBTztBQUFBO0FBQUE7QUFsSFQsRUFERixpQkFDRSxRQUFRLENBQUMsQ0FBQztBQU1WLEVBUEYsaUJBT0UsUUFBZSx5QkFBUSxNQUFNO0FBQUEsSUFDbEMsYUFBYTtBQUFBLElBQ2IsU0FDRTtBQUFBLElBQ0YsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBO0FBQUE7QUFBQTtBQXlHUix1QkFBcUIsT0FBc0I7QUFDekMsUUFBSSxDQUFDLE1BQU0sT0FBTztBQUNoQixhQUFPLE1BQU07QUFBQTtBQUVmLFdBQU8sSUFBSSxNQUFNLFNBQVMsTUFBTTtBQUFBO0FBR2xDLDRCQUNFLEtBQ0EsV0FDQTtBQUNBLGVBQVcsQ0FBQyxLQUFLLFVBQVUsSUFBSSxXQUFXO0FBQ3hDLFVBQUksQ0FBQyxVQUFVLFFBQVE7QUFDckIsWUFBSSxPQUFPO0FBQUE7QUFBQTtBQUFBOzs7QUQvSWpCLE1BQU0sU0FBaUIsQ0FBRSxVQUFVLENBQUM7QUFFcEMsTUFBTyxjQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
