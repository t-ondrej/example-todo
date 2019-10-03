import { useMutation } from '@hammerframework/hammer-web'
import AddTodo from 'src/components/AddTodo'

import { TODO_CREATE, TODOS } from 'src/api/todo'

const AddTodoCell = () => {
  const [todoCreate] = useMutation(TODO_CREATE, {
    update: (cache, { data: { todoCreate } }) => {
      const { todos } = cache.readQuery({ query: TODOS })
      cache.writeQuery({
        query: TODOS,
        data: { todos: todos.concat([todoCreate]) },
      })
    },
  })

  const submitTodo = (body) => {
    todoCreate({
      variables: { body },
      optimisticResponse: {
        __typename: 'Mutation',
        todoCreate: { __typename: 'Todo', id: 0, body, status: 'loading' },
      },
    })
  }

  return <AddTodo submitTodo={submitTodo} />
}

export default AddTodoCell
