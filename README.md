# 2DGE

A simple game engine that is being developed as an object oriented programming exercise.

## Features

- [x] Canvas
- [x] Status
  - Singleton storage for variables that should be available globally (examples: life count, score, etc)
- [x] Keyboard
  - Accessible list of current keys being pressed
- [x] Collision
  - [x] Rectangles (with no rotation)
- [x] GameObject
  - Base for all entities
    - [x] id
      - unique: generated with `uuid`
    - [x] `destroy()`
      - method to self remove it from canvas
    - [x] tags `string[]`
      - array with string identifiers for tagging entities
    - [x] layer `number`
      - integer that represents the order for it to be draw onto canvas
- [x] Rectangle
  - Renderable rectangle
  - [x] stroke
    - [x] color `string`
    - [x] width `number`
  - [x] fill `string`
- [ ] Sprite
  - [x] Animated images
  - TODO: tile and tileset logics
- [ ] Vector
  - TODO: should be able to give linear or acceralated motion to elements
- [ ] Scene
  - TODO: should be a container for the list of instances to be updated at each frame, thus enabling switching screens

## Singletons

Some classes are only instanced a single time during the game initialization. There can be no more than one of the following, thus they are singletons:

- Canvas
- Keyboard (TODO: not actually a true singleton yet)
- Status

Their instances are initializable through the `start()` methods and their instances can be accessed in any file with `get()`.

## Path aliases

There is a path alias to the `src` folder with the name of the package (currently 2dge). This is the intended usage of importing the game engine and thus is being used when importing engine elements inside the `demo` folder.

Other aliases were declared for the folders inside `src`. For example: singletons, constants, utils. But these are meant for imports inside the `src` folder only.

All these rules mentioned above are just for organization purposes.
