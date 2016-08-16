# bikerack

_A bicycle configuration manager_

---

## How to contribute

### Request access
The canonical source for the project is a private repository hosted on [GitLab][repo]. Contact [petejh][] to request permissions to view or patch the source code.

### Download the source code
Obtain a local copy of the complete source code from GitLab.
```shell
~$ git clone git@gitlab.com:petejh/bikerack.git
```

### Configure git
Be sure to [configure git][gitconfig] with your `user.name` and `user.email`.

### Install nvm
Your system `nodejs` may not match the version used to develop this project. We recommend [nvm][] to manage Node.js versions in your local development environment.

### Install Node.js
The required version of Node.js is specified in [.nvmrc](./.nvmrc) in the project root directory. `nvm` commands will detect this version when one is not otherwise supplied on the command line.
```shell
~/bikerack$ nvm install
```

### Install Gulp CLI
We automate development and build tasks with [gulp][gulp]. The command line
interface, which needs to be installed as a system utility, is provided
separately as [gulp-cli][gulpcli].

If you have previously installed a version of gulp globally, remove it to ensure
the old version doesn't collide with the new gulp-cli package.
```shell
~$ npm uninstall --global gulp
~$ npm install --global gulp-cli
```

### Bootstrap the project
```shell
~/bikerack$ npm install        # install required modules
```

---

*Note: This file uses [GitLab Flavored Markdown][gfm]*

[gfm]: https://gitlab.com/help/markdown/markdown
[gitconfig]: https://git-scm.com/docs/git-config
[gulp]: https://github.com/gulpjs/gulp
[gulpcli]: https://github.com/gulpjs/gulp-cli
[nvm]: https://github.com/creationix/nvm
[petejh]: mailto://petejh-200.59@q.com
[repo]: https://gitlab.com/petejh/bikerack

