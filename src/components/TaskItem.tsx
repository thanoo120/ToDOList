import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Share,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Task } from '../types/Task';
import { useTaskStore } from '../store/useTaskStore';

interface Props {
  task: Task;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const { deleteTask, updateTask } = useTaskStore();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTask(task.id) },
    ]);
  };

  const handleSave = () => {
    updateTask(task.id, editTitle, editDescription);
    setEditing(false);
  };

  const handleShare = async (platform: string) => {
    const message = `${task.title}: ${task.description}`;
    await Share.share({
      message: `[${platform}] ${message}`,
    });
    setShowShareOptions(false);
  };

  const formattedDate = new Date(task.createdAt).toLocaleString();

  return (
    <View>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.8}
        style={styles.card}
      >
        {editing ? (
          <>
            <TextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Edit title"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={[styles.input, { marginTop: 8 }]}
              value={editDescription}
              onChangeText={setEditDescription}
              placeholder="Edit description"
              placeholderTextColor="#aaa"
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Icon name="check" size={18} color="#1B1A17" />
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
          </>
        )}

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Icon name="close" size={18} color="#FF8303" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* OUTSIDE ACTION BUTTONS */}
      {expanded && !editing && (
        <View style={styles.actionBox}>
          <TouchableOpacity onPress={() => setShowShareOptions(!showShareOptions)} style={styles.iconButton}>
            <Icon name="share-variant" size={20} color="#F0E3CA" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowInfo(!showInfo)} style={styles.iconButton}>
            <Icon name="information-outline" size={20} color="#F0E3CA" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditing(true)} style={styles.iconButton}>
            <Icon name="pencil" size={20} color="#F0E3CA" />
          </TouchableOpacity>
        </View>
      )}

      {/* SHARE OPTIONS */}
      {showShareOptions && (
        <View style={styles.shareRow}>
          <TouchableOpacity onPress={() => handleShare('Facebook')}>
            <Icon name="facebook" size={22} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare('WhatsApp')}>
            <Icon name="whatsapp" size={22} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleShare('Telegram')}>
            <Icon name="telegram" size={22} color="#0088cc" />
          </TouchableOpacity>
        </View>
      )}

      {showInfo && <Text style={styles.infoText}>Created: {formattedDate}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1F1E1B',
    borderRadius: 8,
    padding: 12,
    paddingRight: 38,
    borderWidth: 1.2,
    borderColor: '#FF8303',
    position: 'relative',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F0E3CA',
  },
  description: {
    fontSize: 13,
    color: '#F0E3CA',
    marginTop: 4,
  },
  deleteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF8303',
    borderRadius: 6,
    padding: 8,
    color: '#F0E3CA',
    backgroundColor: '#1F1E1B',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF8303',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 8,
    gap: 6,
  },
  saveText: {
    color: '#1B1A17',
    fontWeight: 'bold',
  },
  actionBox: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 6,
    gap: 8,
  },
  iconButton: {
    backgroundColor: '#2C2B29',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF8303',
  },
  shareRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 16,
    justifyContent: 'center',
  },
  infoText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
});

export default TaskItem;
