# Components distributed as source code, not compiled packages

ParticleUI distributes components as copyable source files inside a JSON registry envelope, not as an npm package that users import. When a user runs `particleui add button`, the CLI writes the component's `.tsx` source directly into their project — they own and can modify the file.

This follows the model popularized by shadcn/ui. The trade-off: users can't receive upstream bug fixes automatically (no `npm update`), but they have full control over the code and no runtime dependency on a third-party package. For a UI component library where visual customization is the primary use case, ownership beats convenience.

The shadcn registry format (`registry:ui`, `registry:block`, the `files[].content` envelope) was chosen as the wire format to stay compatible with the shadcn CLI's `shadcn add` command, allowing ParticleUI components to be installed via either CLI.
