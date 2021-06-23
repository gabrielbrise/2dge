# 2DGE

A simple game engine that is being developed as an object oriented programming exercise.

## Singletons

Some classes are only instanced a single time during the game initialization. There can be no more than one of the following, thus they are singletons:

- Canvas
- Keyboard

Their instances are initializable through the `start()` methods and their instances can be accessed in any file with `get()`.

## Path aliases

There is a path alias to the `src` folder with the name of the package (currently 2dge). This is the intended usage of importing the game engine and thus is being used when importing engine elements inside the `demo` folder.

Other aliases were declared for the folders inside `src`. For example: singletons, constants, utils. But these are meant for imports inside the `src` folder only.

All these rules mentioned above are just for organization purposes.
