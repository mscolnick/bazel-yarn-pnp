# bazel_pnp

This is a minimal exmaple of getting Yarn PnP to work with Bazel. The goal is to reduce the amount of copying and symlinking bazel does when sandboxing that greatly hits perf with `node_modules`.

## Zero-installs

1. We commit `.pnp.cjs` and `.yarn` cache in order to support [Zero installs](https://yarnpkg.com/features/zero-installs).
2. We can download yarn2 and yarn cache via Bazel and the node-tarballs, although this example doesn't show that.

## Caveats

1. Dependencies are not delcared in the rules and therefore, do not get rebuilt when they change. This can be easiliy achived by create a sub `yarn.lock` (or custom lock) which is derived from declared dependecies and the global `yarn.lock`.
2. This is likely _anti-bazely_ to reach into node*modules outside the sandbox. BUT Bazel does things that are \_anti-node*, so this sounds like a fair trade.
3. The flag `--nobazel_node_patches` is required. It seems to work fine, but I'm not sure what else will break.
