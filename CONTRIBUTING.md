# Contributing

## Requirements

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Fork the project

[Fork a repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

## Choose an issue

[Issues](https://github.com/aminnairi/router/issues).

## Clone the project

[Cloning a repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).

## Checkout to a new branch

[Creating and deleting branches within your repository](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository).

## Install the dependencies

```console
$ docker-compose run --rm yarn
```

## Append changes to the project

Until the issue you choose is resolved.

## Code style fix

```console
$ docker-compose run --rm yarn lint:fix
```

## Code style check

```console
$ docker-compose run --rm yarn lint
```

## Test

```console
$ docker-compose run --rm yarn test
```

## Coverage

```console
$ touch .coveralls.yml
$ echo "repo_token: $COVERALLS_REPO_TOKEN" > .coveralls.yml
$ docker-compose run --rm yarn coverage
```

## Release

```console
$ docker-compose run --rm yarn release
```

## Commit changes

[Committing changes to your project](https://help.github.com/en/github/committing-changes-to-your-project).

## Push changes

[Pushing commits to a remote repository](https://help.github.com/en/github/using-git/pushing-commits-to-a-remote-repository).

## Open a pull request

[Creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
