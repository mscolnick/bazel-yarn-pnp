load("@build_bazel_rules_nodejs//:index.bzl", "npm_package_bin", "nodejs_binary")
load("@bazel_skylib//rules:write_file.bzl", "write_file")


def install_packages(name, deps):
    external_deps = get_external_deps(deps)
    nodejs_binary(
      name = "yarnbin",
      data = [
        '//:.pnp.cjs',
      ],
      entry_point = "//:.yarn/releases/yarn-3.2.0.cjs",
      visibility = ['//visibility:public'],
    )

    write_file(
        name = "chdir",
        out = "chdir.js",
        content = [
            # cd /path/to/workspace
            # "process.chdir(process.env['BUILD_WORKSPACE_DIRECTORY'])",
            "process.chdir('/Users/mylesscolnick/code/bazel_pnp')",
        ],
    )

    npm_package_bin(
        name = name,
        data = deps + [":chdir.js"],
        outs = ["%s_log.txt" % name],
        args = ["selective-install", "--includes=react", "--node_options=--require=./$(location :chdir.js)"],
        tool = ":yarnbin",
    )

def get_external_deps(deps):
    external_deps = []
    for dep in deps:
        # local
        if dep.startswith('//'):
          continue
        if dep.startswith('@npm//'):
          # strip off the @npm// bit
          parts = dep.split('//')
          external_deps.append(parts[1])

    return external_deps

def filter_external_deps(deps):
    internal_deps = []
    for dep in deps:
        if dep.startswith('@npm//'):
          continue
        if dep.startswith('//'):
          internal_deps.append(dep)

    return internal_deps
