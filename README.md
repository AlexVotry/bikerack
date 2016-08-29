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

### Install the JRE
The [Selenium Standalone Server][selenium] used in our feature tests requires the [Java
Runtime Environment (JRE)][jre]. Verify that the JRE is available on your system with:
```shell
~$ java -version
```

To install the JRE on a Debian-based system, you may use:
```shell
~$ sudo apt-get update
~$ sudo apt-get install --no-install-recommends default-jre
```

### Install PhantomJS
[PhantomJS][phantomjs] is a headless WebKit browser, which does not require, for example, Qt or a running X server. You can download the latest static build, but the version available through your system package manager may be sufficient. On Debian-based systems, including Ubuntu:
```shell
~$ sudo apt-get update
~$ apt-cache showpkg phantomjs          # we recommend version 2.1.1
~$ sudo apt-get install -y phantomjs
```

Otherwise, select a version from the [upstream source][phantomjs-source]. For example, on a Debian-based, 64-bit system:
```shell
~$ PHANTOMJS_VER='2.1.1'
~$ PHANTOMJS="phantomjs-$PHANTOMJS_VER-linux-x86_64"
~$ wget https://bitbucket.org/ariya/phantomjs/downloads/$PHANTOMJS.tar.bz2
~$ tar -xvjpf $PHANTOMJS.tar.bz2
~$ sudo chown -R root:staff $PHANTOMJS
~$ sudo mv $PHANTOMJS /usr/local/lib

# Link to the binary from a convenient location in your $PATH
~$ sudo ln -s /usr/local/lib/$PHANTOMJS/bin/phantomjs /usr/local/bin/phantomjs

# Verify the installation was successful
~$ which phantomjs        # <- /usr/local/bin/phantomjs
~$ phantomjs --version    # <- 2.1.1

# Note that the static binary depends on Fontconfig. You may need to do:
~$ sudo apt-get update && sudo apt-get install -y libfontconfig
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
~/bikerack$ npm install                            # install vendor modules
~/bikerack$ $(npm bin)/webdriver-manager update    # install Selenium Server
~/bikerack$ $(npm bin)/bower install               # install client-side libs
```

### Run the test suite
The feature specs need to find a running application server. Open two terminal
sessions and do:
```shell
# Start the application server in the first terminal
~/bikerack$ gulp start

# Run the tests in the second terminal
~/bikerack$ gulp protractor        # feature specs
~/bikerack$ gulp test              # unit and integration tests
```

---

*Note: This file uses [GitLab Flavored Markdown][gfm]*

[gfm]: https://gitlab.com/help/markdown/markdown
[gitconfig]: https://git-scm.com/docs/git-config
[gulp]: https://github.com/gulpjs/gulp
[gulpcli]: https://github.com/gulpjs/gulp-cli
[jre]: http://openjdk.java.net
[nvm]: https://github.com/creationix/nvm
[petejh]: mailto://petejh-200.59@q.com
[phantomjs]: http://phantomjs.org
[phantomjs-source]: http://phantomjs.org/download.html
[repo]: https://gitlab.com/petejh/bikerack
[selenium]: http://docs.seleniumhq.org/docs/03_webdriver.jsp

