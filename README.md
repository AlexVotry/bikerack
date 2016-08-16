# bikerack

_A bicycle configuration manager_

---

## How to contribute

### Request access
The canonical source for the project is a private repository hosted on [GitLab][repo]. Contact [petejh][] to request permissions to view or patch the source code.

### Install nvm
Your system `nodejs` may not match the version used to develop this project. We recommend [nvm][] to manage Node.js versions in your local development environment.

The required version of Node.js is specified in [.nvmrc](./.nvmrc) in the project root directory. `nvm` commands will detect this version when one is not otherwise supplied on the command line.

### Configure git
Be sure to [configure git][gitconfig] with your `user.name` and `user.email`.

### Download the source code
Obtain a local copy of the complete source code from GitLab.
```shell
~$ git clone git@gitlab.com:petejh/bikerack.git
```

### Bootstrap the project
```shell
~/bikerack$ nvm install        # install nodejs
~/bikerack$ npm install        # install required modules
```

---

*Note: This file uses [GitLab Flavored Markdown][gfm]*

[repo]: https://gitlab.com/petejh/bikerack
[petejh]: mailto://petejh-200.59@q.com
[nvm]: https://github.com/creationix/nvm
[gitconfig]: https://git-scm.com/docs/git-config
[gfm]: https://gitlab.com/help/markdown/markdown

