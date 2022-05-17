load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")
load("//libs/bazel:rules_node.bzl", "custom_nodejs_binary")
load("@bazel_skylib//rules:write_file.bzl", "write_file")

# This works because Bazel is copying npm deps
# in 'data' to the sandbox.
nodejs_binary(
    name = "run1",
    data = [
        "@npm//@faker-js/faker",
        "@npm//lodash",
    ],
    entry_point = "generate-names.js",
)

# This fails, since similar to above its copying to the sandbox, but we are missing
# lodash
nodejs_binary(
    name = "run2",
    data = [
        "@npm//@faker-js/faker",
    ],
    entry_point = "generate-names.js",
)

# This works without passing in the deps
# We want rebuilds though so we should create an lock file
# from the deps + global yarn.lock.
# This will prevent yarn from duplicate downloads and fs hits by
# copying to the sandbox.
# Packages are required to be downloaded first.
nodejs_binary(
    name = "run3",
    data = ["//:.pnp.cjs"],
    templated_args = [
        "--nobazel_node_patches",
    ],
    env = {
        "NODE_OPTIONS": "--require=$(rootpath //:.pnp.cjs)",
    },
    entry_point = "generate-names.js",
)

# This fails b/c we dont get rid of the patches that break pnp.js
nodejs_binary(
    name = "run4",
    data = ["//:.pnp.cjs"],
    templated_args = [
        # "--nobazel_node_patches",
    ],
    env = {
        "NODE_OPTIONS": "--require=$(rootpath //:.pnp.cjs)",
    },
    entry_point = "generate-names.js",
)

# This installs packages just-in-time.
custom_nodejs_binary(
    name = "run5",
    # data is required but wont be downloaded by bazel, and instead with will downloaded by yarn2.
    data = [
        "@npm//@faker-js/faker",
        "@npm//lodash",
    ],
    entry_point = "generate-names.js",
)
