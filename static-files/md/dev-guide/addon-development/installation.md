# Installation #

## Prerequisites ##

To develop with the new Add-on SDK, you'll need:

<div class="aside">
Verify that Python is in your path.
</div>

* [Python](http://www.python.org/) 2.5 or 2.6. Note that versions 3.0 and 3.1
  of Python are not supported in this release.

* A working version of Firefox that uses Gecko 2.0.0.7 or later
  (e.g., Firefox 4.0b7).

## Installation ##

At the time of this writing, the latest stable version of the Add-on
SDK is 1.0b4. You can obtain it as a
[tarball](https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.tar.gz)
or a [zip file](https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.zip).

Alternatively, you can get the latest development version of the
Add-on SDK from its
[GitHub repository](https://github.com/mozilla/addon-sdk).

Regardless of which option you choose, navigate to the root directory
of your checkout with a shell/command prompt. This directory should
be called `addon-sdk`.

<span class="aside">
Unlike many development tools, there isn't a system-wide location for
the Add-on SDK. Instead, developers can have as many installations of
the SDK as they want, each configured separately from one
another. Each installation is called a *virtual environment*.
</span>

Then, if you're on Linux, OS X, or another Unix-based system, run:

<pre>
  source bin/activate
</pre>

Otherwise, if you're on Windows, run:

<pre>
  bin\activate
</pre>

Now the beginning of your command prompt should contain the text
`(addon-sdk)`, which means that your shell has entered a special
virtual environment that gives you access to the Add-on SDK's
command-line tools.

At any time, you can leave a virtual environment by running
`deactivate`.

## Sanity Check ##

<span class="aside">
Unit and behavioral testing is something that
we're trying to make as easy and fast as possible in the Add-on SDK,
because it's imperative that we know when breakages occur between the
Mozilla platform and the SDK. We also need to make sure that creating
new functionality or modifying existing code doesn't break other
things.
</span>

Run this at your shell prompt:

<pre>
  cfx
</pre>

It should produce output whose first line looks something like this, followed by
many lines of usage information:

<pre>
  Usage: cfx [options] [command]
</pre>

This is the `cfx` command-line program.  It's your primary interface to the
Add-on SDK.  You use it to launch Firefox and test your add-on, package your
add-on for distribution, view documentation, and run unit tests.

## cfx docs ##

Before we begin, if the page you're reading right now isn't hosted at
`127.0.0.1` or `localhost`, you should run `cfx docs`
immediately. This will run a self-hosted documentation server and open
it in your web browser.

## Implementing an add-on ##

Next we'll go through the process of [implementing a
simple add-on](dev-guide/addon-development/implementing-simple-addon.html).
