import { instance } from "@/common/instance"
import { GetTasksResponse } from "@/features/todolists/api/taskApi.types.ts"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
}
