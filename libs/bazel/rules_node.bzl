load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")
load(":rules_yarn2.bzl", "install_packages", "filter_external_deps")


def custom_nodejs_binary(
    name,
    data,
    templated_args = [],
    env = {},
    **kwargs
):
  """
  Wrapper for the nodejs_binary rule. That will install packages first.
  """
  install_name = "%s_install" % name
  install_packages(install_name, data)
  nodejs_binary(
    name = name,
    data = filter_external_deps(data) + [install_name, "//:.pnp.cjs"],
    templated_args = templated_args + [
        "--nobazel_node_patches",
    ],
    env = {
        "NODE_OPTIONS": "--require=$(rootpath //:.pnp.cjs)",
    },
    **kwargs)


