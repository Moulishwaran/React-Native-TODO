import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(-1);

  const handleAddTask = () => {
    if (task) {
      if (editing !== -1) {
        const updatedTask = [...tasks];
        updatedTask[editing] = task;
        setTasks(updatedTask);
        setEditing(-1);
      } else {
        setTasks([...tasks, task]);
      }
      setTask("");
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.task}>
        <Text style={styles.taskText}>{item}</Text>
        <View style={styles.taskActions}>
          <TouchableOpacity>
            <Text
              style={styles.editButton}
              onPress={() => handleEdittask(index)}
            >
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={styles.deleteButton}
              onPress={() => handleDeletetask(index)}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleEdittask = (index) => {
    const taskEdit = tasks[index];
    setTask(taskEdit);
    setEditing(index);
  };
  const handleDeletetask = (index) => {
    const updatedTask = [...tasks];
    updatedTask.splice(index, 1);
    setEditing(index);
    setTasks(updatedTask);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Moulish Code</Text>
      <Text style={styles.title}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter you Task"
        value={task}
        onChangeText={(text) => {
          setTask(text);
        }}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          {editing !== -1 ? "Update task" : "Add Task"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 7,
    color: "dodgerblue",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  task: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskActions: {
    flexDirection: "row",
  },
  editButton: {
    color: "dodgerblue",
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
  taskText: {
    fontSize: 19,
    fontWeight: "500",
  },
});
