blameP4
=======

Perforce is old and crufty, and I blame it for slowing me down when trying to
get my work done. Wait,... that's not the point of this...

The main frontend for Perforce, P4V, doesn't have an interface for annotating
code, a.k.a. "blaming" others (or your past self). `blameP4` is a simple
frontend for viewing annotated code and the associated commit messages.

This is mainly a pet project for scratching an itch and learning a bit more
about [AngularJS](https://angularjs.org/)
and [Electron](http://electron.atom.io/).
Don't expect stability or maintenance.


Using blameP4
-------------

### Prerequisites

Before installing `blameP4`, you'll need to have a copy of
[this repo](https://github.com/tonysyu/blameP4),
[node.js](https://nodejs.org/en/download/), and a working install of perforce.


### Installation and use

After that, just navigate to the directory containing this file and install:

    cd path/to/this/directory
    npm install

Then start the frontend by running:

    npm start

Alternatively, you can install a global symlink by running:

    npm link

You may need to use an administrator shell or run as a superuser
(e.g. `sudo npm link`) depending on your system. After linking, you should
be able to run:

    blameP4

to open the app or

    blameP4 path/to/file

which starts the app with a preloaded file.


Why Perforce?
-------------

I have to use it for my day job :(
