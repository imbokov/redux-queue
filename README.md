# redux-queue

## Motivation

In front end applications race conditions stemming from firing multiple requests simultaneously can often result in an inconsistent or outdated application state. For the sake of example, let's take a page that contains a list of todos. All the todos can be toggled and deleted. The page has selectable ordering options and a form to create a new todo. If we toggle or create a todo, we'll need to refetch the list from the api to maintain ordering. But if we change the ordering while waiting for the response, the result may be not what we expected. Manually disabling components that are responsible for requests is an option but it can become tiresome and a lack of centralised solution is error prone.

## Solution

redux-queue implements a primitive semaphore system to signal when it's okay for a request to actually fire. When describing a redux action that makes a request, you'll specify its blockers. As long as those blockers are correct, each action will know when it's okay or not for it to fire.

## Usage

## `createRequestAction(id, callback, getBlockerPaths, options)`

Return a thunk action, which when called returns a promise. This promise will resolve or reject only after the action's turn has come and it has completed the request. If you need to compose the action with others in you component feel free to use `await` and `Promise.all` as much as you want. As long as the blockers are specified correctly, your action won't have unexpected results.

Params:

- `id`: **required** Action id. Not the same as type, since they'll all have the same type.
- `getBlockerPaths`: **required** A callback which will receive the same arguments, with which the action will be dispatched from a component. It must return an array, where each element is a lodash-path to a semaphore with a length of 2. In 95% cases the first element of the path will be an entity, and the second will be either an id or a special key `all` (it waits for all other actions to unblock in the relevant slice before firing, and blocks all other actions in the slice while it's in progress), but you may wish to use custom paths for a login process, for example `() => ['auth.all', 'user.all']`
- `options`:
  - `schema`: A `normalizr` schema. If provided the result will be normalized and merged into `entities` slice.

The action has following attributes:

- `toString()`: Returns the action's id. Useful for integration with the `createReducer` helper.
- `getIsBlocked(state, ...args)`: If you provide the same arguments to this selector, that you'll later call the action with (or at least the same that matter to `getBlockerPaths`), it will return a boolean whether the action is blocked or no.
- `getStatus(state, ...args)`: Same as `getIsBlocked` but returns an object with `isFetching: bool` and `error: any` properties.

## Examples

Actions created using the helper can be found in the [source code](/app/src/modules/request/actions.js).
[Component](/app/src/components/PostListPage/CreatePost/CreatePost.js) using those actions.
