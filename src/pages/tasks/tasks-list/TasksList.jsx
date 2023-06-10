import TaskListItem from './TaskListItem';

function TasksList({ tasks = [], onDelete, onViewTask }) {
  return (
    <div>
      {...tasks.map((task) => (
        <TaskListItem task={task} onDelete={onDelete} onViewTask={onViewTask} />
      ))}
    </div>
  );
}

export default TasksList;
