export const CREATE_ERROR = 'CREATE_ERROR'
export const REMOVE_ERROR = 'REMOVE_ERROR'

export const errorReducer = (state, action) => {
  switch (action.type) {
    case CREATE_ERROR:
      return { error: action.error }
    case REMOVE_ERROR:
      return {}
    default:
      return {}
  }
}
