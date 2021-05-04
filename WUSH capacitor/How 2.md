# How to set up capacitor

## 1. Install [Perequisits](https://capacitorjs.com/docs/getting-started/dependencies) for what you want to do

## 2. Create a new project

1. Create the folder you want your project to be in (if it does not already exist).
2. Open directory in your terminal and run commands
    - npx @capacitor/cli create

Alternativly you can add capacitor to an existing project with

1. ``npm install @capacitor/core @capacitor/cli``
2. ``npx cap init``
3. ``npx cap add android``

## Using capacitor to develop

- ``npx cap copy`` - copy web files to build directroy
- ``npx cap open`` - open project in native ide to be built
- ``npx cap update`` - update the project after changeing its name or included files or anything of the sort
