# 2DGE

A simple game engine that is being developed as an object oriented programming exercise.

## Singletons

Some classes are only instanced a single time during the game initialization. There can be no more than one of the following, thus they are singletons:

- Canvas
- Keyboard

Their instances are initializable through the `start()` methods and their instances can be accessed in any file with `get()`.
